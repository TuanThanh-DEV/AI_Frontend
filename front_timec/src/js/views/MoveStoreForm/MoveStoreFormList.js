import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment'
import { FormatterUtils } from '../../utils/javascriptUtils';
import { RenderDatePicker, RenderInputWithDiv } from '../../components/formInputs';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ModalExcelMoveStoreForm from './ModalExcelMoveStoreForm';

const validate = values => {
    const errors = {};
    return errors;
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "MoveStoreForm", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class MoveStoreForm extends React.Component {
    constructor() {
        super();
        this.state = {
            listMoveStoreForm: null,
            isMoveStoreFormModalShown: false,
        }
        this.updateListMoveStoreForm = this.updateListMoveStoreForm.bind(this);
        this.handleHidemodal = () => {
            this.setState({ 
                isMoveStoreFormModalShown: false,
             });
            this.updateListMoveStoreForm();
        };
        this.handleShowmodal = (id) => {
            this.setState({
                isMoveStoreFormModalShown: true,
                listMoveStoreForm: id
            });
        }
    };

    updateListMoveStoreForm(values) {
        var page = qs.parse(this.props.location.search).page;
        if (values == null) {
            page = qs.parse(this.props.location.search).page;
        }
        var fromDrugStoreId = "";
        var toDrugStoreId = "";
        var fromDate = "";
        var toDate = "";
        if (values) {
            values.fromDrugStoreId ? fromDrugStoreId = values.fromDrugStoreId : "";
            values.toDrugStoreId ? toDrugStoreId = values.toDrugStoreId : "";
            values.fromDate ? fromDate = moment(values.fromDate).format("YYYY-MM-DD") : fromDate;
            values.toDate ? toDate = moment(values.toDate).format("YYYY-MM-DD") : toDate;
        }
        let _this = this;
        let setStateInRequest = (list) => { this.setState({ listMoveStoreForm: list }) }
        return agent.asyncRequests.getPage("/moveStoreForm/list?fromDate=" + fromDate + "&toDate=" + toDate 
        + "&fromDrugStoreId=" + fromDrugStoreId + "&toDrugStoreId=" + toDrugStoreId, page, 20
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


    componentWillMount() {
        this.updateListMoveStoreForm();
    };

    render() {
        const data = this.state.listMoveStoreForm;
        const { handleSubmit } = this.props;
        if (!data) {
            return null;
        }
        if (data.content) {
            var rows = data.content.map(item => {
                return (
                    <tr key={item.id}>
                        <td> {item.id} </td>
                        <td>{item.fromDrugStore ? item.fromDrugStore.name : ""}</td>
                        <td>{item.outputFormId}</td>
                        
                        <td>{item.toDrugStore ? item.toDrugStore.name : ""}</td>
                        <td>{item.inputFormId}</td>

                        <td>{moment(item.transferDate).format("DD/MM/YYYY")}</td>
                        <td>{item.createdUser ? item.createdUser.fullName : ""}</td>
                        
                        <td>{item.status}</td>
                        <td className="text-center footable-visible footable-last-column">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-menu9"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>
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
                            <li className="active">Danh Sách Phiếu Chuyển Kho</li>
                        </ul>

                    </div>
                </div>
                <div class="content">
                    <div class="row">
                        <div className="col-md-12">
                            <div>
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.updateListMoveStoreForm)}>
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
                                        <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "28px" }}>
                                            <button type="submit" className="btn bg-success btn-xlg">Tìm</button>
                                        </div>
                                        <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "28px" }}>
                                            <button type="button" className="btn bg-teal btn-xlg" onClick={this.handleShowmodal}>Tạo Phiếu Chuyển Kho</button>
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
                                            <th data-toggle="true">Xuất Từ Kho</th>
                                            <th data-toggle="true">Mã Phiếu Xuất</th>

                                            <th data-toggle="true">Nhập Đến Kho</th>
                                            <th data-toggle="true">Mã Phiếu Nhập</th>

                                            <th data-toggle="true">Ngày Nhập Thuốc</th>
                                            <th  data-toggle="true">Người Nhập</th>
                                            <th data-toggle="true">Trạng Thái</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isMoveStoreFormModalShown ? <ModalExcelMoveStoreForm title={"Upload Excel"}  show={this.state.isMoveStoreFormModalShown} 
                                onHide={this.handleHidemodal}></ModalExcelMoveStoreForm>: null}
                        </div>
                        <TablePagination data={data} baseUrl="/listAllMoveStoreForm" />
                    </div>
                </div>
            </div>

        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'MoveStoreForm',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(MoveStoreForm)));
