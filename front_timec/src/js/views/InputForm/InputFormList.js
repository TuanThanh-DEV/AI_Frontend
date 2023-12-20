import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, DateUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment'
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { FormatterUtils } from '../../utils/javascriptUtils';
import InputFormInputStockRow from './InputFormInputStockRow';
import { RenderDatePicker, RenderInputWithDiv } from '../../components/formInputs';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

const validate = values => {
    const errors = {};
    return errors;
}

const selector = formValueSelector("InputForm");

const mapStateToProps = state => {
    return {
        fromDate: selector(state, "fromDate"),
        toDate: selector(state, "toDate"),
        barcode: selector(state, "barcode"),
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "InputForm", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class InputForm extends React.Component {
    constructor() {
        super();
        this.state = {
            listInputForm: null,
            isInputFormModalShown: false,
            objecticd: null,
            listInputForm: "",
            isPage : false
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleFindAll = this.handleFindAll.bind(this);
        this.UpdateListInputForm = this.UpdateListInputForm.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isInputFormModalShown: false });
            this.UpdateListInputForm();
        };
        this.getUrlFilterFromState = () => {
            const {fromDate, toDate, barcode} = this.props;
            var url = '?';
            if (barcode) {
                url += 'barcode=' + barcode + '&';
            }
            if (fromDate) {
                url += 'fromDate=' + DateUtils.formatDateForApiParam(fromDate) + '&';
            }
            if (toDate) {
                url += 'toDate=' + DateUtils.formatDateForApiParam(toDate) + '&';
            }
            return url;
        }

        this.getStateFilterFromUrl = () => {
            const {updateField} = this.props;
            var fromDate = qs.parse(this.props.location.search).fromDate;
            var toDate = qs.parse(this.props.location.search).toDate;
            var barcode = qs.parse(this.props.location.search).barcode;
            var values = {};
            if (fromDate) {
                updateField("fromDate", DateUtils.convertApiStringToDate(fromDate));
                values.fromDate = DateUtils.convertApiStringToDate(fromDate);
            }
            if (toDate) {
                updateField("toDate", DateUtils.convertApiStringToDate(toDate));
                values.toDate = DateUtils.convertApiStringToDate(toDate);
            }
            if (barcode) {
                updateField("barcode", barcode);
                values.barcode = barcode;
            }
            return values;
        }
    };

    handleShowmodal(id) {
        this.setState({
            isInputFormModalShown: true,
            listInputForm: id
        });
    } 

    handleFindAll() {
        const { updateField } = this.props;
        updateField("fromDate", "");
        updateField("barcode", "");
        updateField("toDate", "");
        this.UpdateListInputForm();
    }

    

    UpdateListInputForm(values) {
        var page =  qs.parse(this.props.location.search).page;
        var barcode = "";
        var fromDate = "";
        var toDate = "";
        if(values){
            values.barcode ? barcode = values.barcode : "";
            values.fromDate ? fromDate = moment(values.fromDate).format("YYYY-MM-DD")  : fromDate;
            values.toDate ? toDate = moment(values.toDate).format("YYYY-MM-DD")  : toDate;
        }
        let _this = this;
        let setStateInRequest = (list) => { this.setState({ listInputForm: list }) }
        return agent.asyncRequests.getPage( "/inputForm/list?barcode=" +barcode + "&fromDate="+fromDate +"&toDate="+toDate , page, 20
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
               
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    getListInputStockByInputFormId(id) {
        var _this = this;
        return agent.asyncRequests.get("/inputStock/findByInputFormId?inputFormId=" + id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                _this.handleSavePDF(_this.renderPDF(result));
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    renderPDF(dataExportInputStock) {
        var imageLogo = this.state.imageLogo;
        var today = new Date();
        var producedDate = [];
        var drugName = [];
        var expiredDate = [];
        var inputAmount = [];
        var salePrice = [];
        var importPrice=[];
        var totalPrice=[];
        dataExportInputStock.map(item => {
            drugName.push(item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT : null);
            inputAmount.push(FormatterUtils.formatCurrency(item.inputAmount));
            producedDate.push(item.producedDate);
            expiredDate.push(item.expiredDate);
            salePrice.push(item.salePrice);
            importPrice.push(FormatterUtils.formatCurrency(item.importPrice));
            totalPrice.push(FormatterUtils.formatCurrency(item.importPrice * item.inputAmount));
            return (
                drugName, inputAmount, salePrice, producedDate, expiredDate, importPrice, totalPrice
            )
        });

        var tableItems = {
            style: 'tableExample',
            table: {
                widths: ['*', '*', 'auto', '*', '*'],
                body: [
                    [{ text: 'Tên thuốc', style: 'tableHeader', alignment: 'center' }, { text: 'Ngày sản xuất', style: 'tableHeader', alignment: 'center' }, { text: 'Số Lượng', style: 'tableHeader', alignment: 'center' }, { text: 'Đơn Giá', style: 'tableHeader', alignment: 'center' }, { text: 'Thành Tiền', style: 'tableHeader', alignment: 'center' }],
                    [drugName, producedDate, inputAmount, importPrice, totalPrice],
                ]
            },
        },
            dataExport = {
                content: [  { columns: [
                                { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: ...../20...../GCT', fontSize: 11, alignment: 'center' },
                                imageLogo ? {
                                    image: imageLogo,
                                    fit: [100, 100],
                                    alignment: 'left',
                                    margin: [20, 0, 0, 0],
                                } : "",
                                { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' + '\n Độc Lập - Tự Do - Hạnh Phúc' + '\n ---------------', fontSize: 11, alignment: 'center' },
                            ] },
                    { columns: [ { text: '\n THÔNG TIN PHIẾU NHẬP KHO \n\n', fontSize: 15, alignment: 'center' }]},

                    tableItems,

                    {columns: [ {text: '\n Ngày ' + moment(today).format("LL") + '\n\n NGƯỜI LẬP PHIẾU \n\n\n' + '', alignment: 'center', fontSize: 11} ] },

                ],
                styles: {
                    header: {
                        fontSize: 10,
                        bold: true
                    },
                    bigger: {
                        fontSize: 10,
                        italics: true
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black'
                    }
                },
                defaultStyle: {
                    columnGap: 10
                }

            }
        return dataExport;
    }
    handleSavePDF(dataExportRetail) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dataExportRetail).download('PHIEU-NHAP-KHO.pdf');
    }
    handlegetListToPrint(id) {
        this.getListInputStockByInputFormId(id);
    }
    componentWillMount() {
        this.UpdateListInputForm(this.getStateFilterFromUrl());
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    };

    render() {
        const data = this.state.listInputForm;
        const {handleSubmit} = this.props;
        if (!data) {
            return null;
        }
        if(data.content){
            var rows = data.content.map(item => {
                return (
                    <InputFormInputStockRow key={"inputStock_" + item.id} InputFormObj={item}></InputFormInputStockRow>
                );
            });
        }
      
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Danh Sách Phiếu Nhập Kho</li>
                        </ul>

                    </div>
                </div>
                <div class="content">
                    <div class="row">
                        <div className="col-md-12">
                            <div>
                                {/* TODO: filter not work */}
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.UpdateListInputForm)}>
                                    <div className="row">
                                    <   div className="col col-md-4">
                                        </div>
                                        <div className="col col-md-4">
                                            <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                            </div>
                                            <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                <Field label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                            </div>
                                        </div>
                                        <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                            <Field label="Thuốc" name="barcode" placeholder="Mã Thuốc..." autoFocus={true} component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "28px" }}>
                                            <button type="submit" className="btn bg-success btn-xlg">Tìm</button>
                                        </div>
                                        <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "28px" }}>
                                            <button type="button" className="btn bg-success btn-xlg" onClick={this.handleFindAll}>Làm mới</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true"></th>
                                            {/* <th data-toggle="true">STT</th> */}
                                            <th colSpan="1" data-toggle="true">Mã Phiếu</th>
                                            <th colSpan="2" data-toggle="true">Kho Thuốc</th>
                                            <th colSpan="2" data-toggle="true">Ngày Nhập Thuốc</th>
                                            <th colSpan="1" data-toggle="true">Người Nhập</th>
                                            <th >Người Duyệt</th>  
                                            <th colSpan="1" data-toggle="true">Trạng Thái</th>
                                            <th colSpan="1" data-toggle="true">Tổng Nhập</th>
                                            <th colSpan="2" data-toggle="true">Mã Đơn Hàng NCC</th>
                                            <th colSpan="3" data-toggle="true">Ghi Chú</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <TablePagination data={data} baseUrl={"/listAllInputForm" + this.getUrlFilterFromState()} /> 
                    </div>
                </div>
            </div>

        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'InputForm',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(InputForm)));
