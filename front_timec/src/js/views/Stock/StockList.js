import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalInputFormChooseDrugStore from '../InputStock/ModalInputFormChooseDrugStore';
import ModalOutputFormChooseDrugStore from '../OutputStock/ModalOutputFormChooseDrugStore';
import ModalInputStock from './ModalInputStock';
import ModalOutputStock from './ModalOutputStock';
import ModalImportExcelFileForInputStock from './ModalImportExcelFileForInputStock';
import { FormatterUtils, UrlUtils } from '../../utils/javascriptUtils';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { RenderSelect } from '../../components/formInputs';
import ModalOutputFormChooseDrugCabinet from './ModalOutputFormChooseDrugCabinet';
import ModalCheckStock from './ModalCheckStock';
import StockRows from './StockRows';
import { PermanentCacheService } from '../../services/middleware';
import ModalOutputRefundCompany from '../OutputStock/ModalOutputRefundCompany';
import ModalOutputDamage from '../OutputStock/ModalOutputDamage';
import SecuredComponent from '../../components/SecuredComponent';

const validate = values => {
    const errors = {};
    return errors;
};

const selector = formValueSelector('StockList');

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    drugStoreId: selector(state, "drugStoreId"),
    supplierId: selector(state, "supplierId"),
});

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "StockList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class StockList extends React.Component {
    constructor() {
        super();
        this.state = {
            listStock: null,
            // isStockModalShownInputStock: false,
            isStockModalShownInputStock: false,
            isStockModalShownOutputStock: false,
            objectstock: null, 
            idInputStock: "",
            idOutputStock: "",
            isShowModalInputForm: false,
            isShowModalOutputForm : false,
            isImportExcelShown : false,
            urlToImportExcel : null,
            optionSupplier: [],
            optionDrugStore: [],
            stockTotalDto: {totalItems: 0, totalStockAmount:0},
            isShowModalOutputFormForDepartment : false,
            isShowModalOutputRefundCompany : false,
            isShowModalOutputDamage : false,
            
        }
        this.handleShowModalInputForm = this.handleShowModalInputForm.bind(this);
        this.handleShowModalOutputForm = this.handleShowModalOutputForm.bind(this);
        this.handleShowModalRefunCompany = this.handleShowModalRefunCompany.bind(this);
        this.handleShowModalOutputDamage = this.handleShowModalOutputDamage.bind(this);
        this.handleShowModalOutputFormForDepartment = this.handleShowModalOutputFormForDepartment.bind(this);
        this.handleHidemodal = () => {
            this.setState({ 
                isStockModalShownInputStock: false, 
                isShowModalInputForm : false,
                isStockModalShownOutputStock: false,
                isShowModalOutputForm : false,
                isImportExcelShown : false,
                isShowModalOutputFormForDepartment :false,
                isShowModalOutputRefundCompany : false,
                isShowModalOutputDamage : false,
            });
            this.updateListStock();
        };
        
        this.handleImportExcelFile=()=> {
            this.setState({
                isImportExcelShown: true
            })
        };
        this.setPermanentCache = (values) => {
            if (values.drugStoreId) {
                PermanentCacheService.setItem("selected_stockList_drugStoreId", values.drugStoreId);
            }
            if (values.supplierId) {
                PermanentCacheService.setItem("selected_stockList_supplierId", values.supplierId);
            }
        }

    };
    handleShowModalInputForm() {
        this.setState({
            isShowModalInputForm : true,
        });
    }
    handleShowModalOutputForm() {
        this.setState({
            isShowModalOutputForm: true
        });
    }
    handleShowModalRefunCompany() {
        this.setState({
            isShowModalOutputRefundCompany: true
        });
    }
    handleShowModalOutputFormForDepartment(){
        this.setState({
            isShowModalOutputFormForDepartment: true
        });
    }
    handleShowModalOutputDamage(){
        this.setState({
            isShowModalOutputDamage: true
        });
    }
    updateListStock(drugStoreId, supplierId){
        drugStoreId = drugStoreId ? drugStoreId : "ALL";
        supplierId = supplierId ? supplierId : "ALL";
        this.setPermanentCache({drugStoreId, supplierId});

        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;

        var _this = this;
        let setStateInRequest = (list) => { this.setState({ listStock: list }) }
        return [agent.StockApi.listStock(search, drugStoreId, supplierId, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
            +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }), 
        agent.asyncRequests.get("/stock/getTotalStockAmount?drugStoreId=" + drugStoreId 
        + "&supplierId=" + supplierId).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                _this.setState({stockTotalDto: result});
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
            +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        })
    ]
        

    }
    componentWillMount() {        
        agent.SupplierApi.loadOptionsComboBox(this);
        agent.DrugStoreApi.loadOptionsComboBox(this, true);
        var drugStoreId = PermanentCacheService.getItem("selected_stockList_drugStoreId") ? PermanentCacheService.getItem("selected_stockList_drugStoreId") : "ALL";
        var supplierId = PermanentCacheService.getItem("selected_stockList_supplierId") ? PermanentCacheService.getItem("selected_stockList_supplierId") : "ALL";
        const { updateField } = this.props;
        updateField("drugStoreId", drugStoreId);
        updateField("supplierId", supplierId);
        this.updateListStock(drugStoreId, supplierId);
    };

    handleConvertAll(){
        if (confirm("Xác nhận convert!")) {
            return agent.asyncRequests.get("/stockMovement/convertAllInvoiceItemToStockMovement").then(function (res) {
                var result = res.body.resultData;
                if (result) {
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            })

        }
    }

    deleteStock(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/stock/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công !");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }
    
    render() {
        var search = qs.parse(this.props.location.search).search;
        const { drugStoreId, supplierId,currentUser } = this.props;
        var stockTotalDto = this.state.stockTotalDto;
        var data = this.state.listStock;
        if (!data) {
            return null; }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1; }
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo++
            return (<StockRows key={item.id} stockItem={item} onReloadSearch={()=> this.updateListStock()}></StockRows>
                );
        });
        return (
            <div className="content-wrapper">
            <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Quản Lý Nhà Thuốc</li>
                        <li className="active">Tổng Kho</li>
                    </ul>
                    <div className="heading-elements">
							<div className="heading-btn-group">
                                {/* TODO */}
                            {/* <button className="btn bg-teal" onClick={() => this.handleImportExcelFile()}>Nhập Thuốc Từ File</button> */}
                            <button className="btn bg-teal" onClick={() => this.handleShowModalInputForm()}>Nhập Kho</button>
                            {currentUser.id == 1 ? <button className="btn bg-teal" onClick={() => this.handleConvertAll()}>Convert</button> : null
                            }
                            <button className="btn bg-teal" onClick={() => this.handleShowModalOutputForm()}>Xuất Kho</button>
                            <SecuredComponent allowedPermission="admin.dsXuatTraCty.create">
                                <button className="btn bg-teal" onClick={() => this.handleShowModalRefunCompany()}>Xuất Trả Công Ty</button>
                            </SecuredComponent>
                            <SecuredComponent allowedPermission="admin.uotputDangeDrug.create">
                                <button className="btn bg-teal" onClick={() => this.handleShowModalOutputDamage()}>Xuất Thuốc Hủy</button>
                            </SecuredComponent>
                            {/* <button className="btn bg-teal" onClick={() => this.handleShowModalOutputFormForDepartment()}>Xuất Đến Tủ Thuốc</button> */}
							</div>
						</div>
                </div>
            </div>
            <div className="content">
                <div className="row">                    
                        <div className="col-md-12">   
                        
                        <div className="panel panel-flat">

                            <div className="panel-body">
                                <form className="main-search" role="form">

                                    <div className="input-group content-group">
                                        <div className="has-feedback has-feedback-left">
                                            <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo tên thuốc, mã thuốc..." name="search" defaultValue={search} autoFocus={true} />
                                            <div className="form-control-feedback">
                                                <i className="icon-search4 text-muted text-size-base"></i>
                                            </div>
                                        </div>
                                        <div className="input-group-btn">
                                            <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                        </div>
                                    </div>
                                </form>  
                                <div className="col-md-6">
                                    <Field name="drugStoreId" placeholder="Chọn Nhà Thuốc..."
                                    options={this.state.optionDrugStore} component={RenderSelect}
                                    onChangeAction={(drugStoreId) => this.updateListStock(drugStoreId, supplierId)}></Field>
                                </div>
                                <div className="col-md-6">
                                    <Field name="supplierId" placeholder="Tìm Nhà Cung Cấp"
                                    options={this.state.optionSupplier} component={RenderSelect}
                                    onChangeAction={(supplierId) => this.updateListStock(drugStoreId, supplierId)}></Field>
                            
                                </div>

                                
                                <div className="pull-right">
                                    <br/>
                                    <br/>
                                        <h5>Tổng Số Lượng Tồn: {FormatterUtils.formatCurrency(stockTotalDto.totalItems)} <br/> Tổng Tiền Tồn: {FormatterUtils.formatCurrency(stockTotalDto.totalStockAmount)}</h5>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true"></th>
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên Thuốc</th>
                                            <th data-toggle="true">Mã code</th>
                                            <th data-toggle="true">Nhà Cung Cấp</th>
                                            <th data-toggle="true">ĐVT</th>
                                            <th data-toggle="true">ĐVT Sỉ</th>
                                            <th data-toggle="true">Giá Nhập Gần Đây</th>
                                            <th data-toggle="true">Giá Bán</th>
                                            <th data-toggle="true">Kho Thuốc</th>
                                            <th data-toggle="true">Tồn Kho</th>                                            
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isStockModalShownInputStock ? <ModalInputStock 
                                title="Bảng Nhập Thuốc" 
                                idInputStock={this.state.idInputStock} 
                                show={this.state.isStockModalShownInputStock} 
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isStockModalShownOutputStock ? <ModalOutputStock 
                                title="Bảng Bán Thuốc - Xuất Kho" 
                                idOutputStock={this.state.idOutputStock} 
                                show={this.state.isStockModalShownOutputStock} 
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isShowModalInputForm ? <ModalInputFormChooseDrugStore
                                title="Tạo Phiếu Nhập Kho" 
                                show={this.state.isShowModalInputForm} 
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isShowModalOutputForm ? <ModalOutputFormChooseDrugStore
                                title="Tạo Phiếu Xuất Kho" 
                                show={this.state.isShowModalOutputForm} 
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isShowModalOutputFormForDepartment ? <ModalOutputFormChooseDrugCabinet
                                title="Tạo Phiếu Chuyển Thuốc" 
                                show={this.state.isShowModalOutputFormForDepartment} 
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isShowModalOutputRefundCompany ? <ModalOutputRefundCompany
                                title="Tạo Phiếu Xuất Trả Thuốc Công Ty" 
                                show={this.state.isShowModalOutputRefundCompany} 
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isShowModalOutputDamage ? <ModalOutputDamage
                                title="Tạo Phiếu Hủy Thuốc" 
                                show={this.state.isShowModalOutputDamage} 
                                onHide={this.handleHidemodal} /> : null
                            }
                            
                            
                            {this.state.isImportExcelShown ? <ModalImportExcelFileForInputStock title={"Upload Excel"}  show={this.state.isImportExcelShown} 
                                onHide={this.handleHidemodal}></ModalImportExcelFileForInputStock>: null}
                        </div>
                        <TablePagination data={data} baseUrl={UrlUtils.getPathWithParamsNotPaging()} />
                    </div>
                    
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
      reduxForm({
        form: 'StockList',
        destroyOnUnmount: false,
        enableReinitialize: true,
        validate
      })(StockList)));