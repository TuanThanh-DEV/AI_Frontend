import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { RenderSelect, RenderInputWithDiv } from '../../components/formInputs';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { LOAD_UPDATING_OUTPUT_STOCK } from '../OutputStock/action-types';
import ModalChooseDrugCabinet from '../InputCabinetForm/ModalChooseDrugCabinet';
import { PermanentCacheService } from '../../services/middleware';
import SecuredComponent from '../../components/SecuredComponent';
const validate = values => {
    const errors = {};
    return errors;
};


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
   
});

class DrugCabinetList extends React.Component {
    constructor() {
        super();
        this.state = {
            stockCabinets : null,
            drugCabinet : null,
            isShowModalInputCabinetForm : false
        }   
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.updateListStockCabinet = this.updateListStockCabinet.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isShowModalInputCabinetForm : false });
        };

    };
    handleShowmodal(id) {
        this.setState({
        });
    }
    
    handleShowModalInputCabinetForm(){
        this.setState({
            isShowModalInputCabinetForm : true
        })
    }

    handleShowModalOutputCabinet(){


    }

    getDrugCabinetByUser(){
        var userId = PermanentCacheService.getItem("currentUser").id;
        let setStateInRequest = (list) => { this.setState({ drugCabinet: list }) }
        return agent.asyncRequests.get('/drugCabinet/user/' + userId
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " +{ autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    updateListStockCabinet(values){
        let search = ""
        var page = qs.parse(this.props.location.search).page;
        if(typeof(values)== "number"){
            let setStateInRequest = (list) => { this.setState({ stockCabinets: list }) }
            return agent.StockCabinetApi.listStockCabinet(search,values, page
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }else{
            let setStateInRequest = (list) => { this.setState({ stockCabinets: list }) }
            return agent.StockCabinetApi.listStockCabinet(values.search,values.drugCabinetId, page
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
        
    }
    componentWillMount() {
        setTimeout(()=>{
            this.getDrugCabinetByUser();
        },50)
    };

    render() {
        const {handleSubmit} = this.props;
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        var data = this.state.stockCabinets;
        const dataDrugCabinet = this.state.drugCabinet;
        if (!page) {
            page = 1;
        }
        var optionDrugCabinet = [];
        if(dataDrugCabinet){
            dataDrugCabinet.map(item =>{
                optionDrugCabinet.push({label: item.name + ' / ' +item.department.name , value: item.id})
            })
        }
        var rows = [];
        if(data){
            rows = data.content.map( item =>{

                return (
                    <tr key={item.id}>
                        <td>{item.drug.name + " " + item.drug.hamLuongBHYT}</td>
                        <td>{item.drug.barCode}</td>
                        <td>{item.drug.ingredient}</td>
                        <td>{item.drug.supplier ? item.drug.supplier.name : ""}</td>
                        <td>{item.drug.drugCategory ? item.drug.drugCategory.name : null}</td>
                        <td>{item.drug.uom ? item.drug.uom : null}</td>
                        <td>{FormatterUtils.formatCurrency(item.drug.salePrice)}</td>
                        <td>{item.available}</td>
                        <td className="text-center footable-visible footable-last-column">
                            {/* <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-menu9"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                        <li><a onClick={() => this.deleteDrug(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </ul>
                                </li>
                            </ul> */}
                        </td>
                    </tr>);
            });
        }
       
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Thuốc</li>
                        </ul>
                        <SecuredComponent allowedPermission="admin.listInputCabinetForm.create">
                            <div className="heading-elements">
                                <div className="heading-btn-group">
                                    <div className="pull-right" >
                                        <button className="btn bg-teal" onClick={() => this.handleShowModalInputCabinetForm()}>Lĩnh Dược</button>
                                        {/* <button className="btn bg-teal" onClick={() => this.handleShowModalOutputCabinet()}>bán Thuốc</button> */}
                                    </div>
                                </div>
                            </div>
                        </SecuredComponent>
                    </div>
                </div>
                <div className="content">
                    <div className="col-md-12">
                        <div className="panel panel-flat">
                            <div className="panel-body">
                                <form className="main-search" role="form" onSubmit={handleSubmit(this.updateListStockCabinet)}>
                                    <div className="row">
                                        <div className="col col-md-12">
                                            <div className="col col-md-4">
                                                <div className="pull-left" style={{ height: '30px', width: '250px' }} >
                                                    <Field label="Chuyên Khoa" name="drugCabinetId" placeholder="Chọn Chuyên Khoa"
                                                            options={optionDrugCabinet} component={RenderSelect}
                                                            onChangeAction={(value) => this.updateListStockCabinet(value)}>
                                                    </Field>    
                                                </div>
                                            </div>
                                            <div className="col col-md-4"></div>
                                            <div className="col col-md-4">
                                                <div className="col col-md-10" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Tên Thuốc" name="search" placeholder="Tìm theo tên Thuốc..." autoFocus={true} component={RenderInputWithDiv}></Field>
                                                </div>
                                                <div className="col col-md-2" style={{ paddingLeft: "10px", paddingTop: "28px" }}>
                                                    <button type="submit" className="btn bg-success btn-xlg">Tìm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                            <table className="table table-xxs table-bordered">
                                <thead>
                                    <tr className="bg-teal">
                                        <th data-toggle="true">Tên Thuốc</th>
                                        <th data-toggle="true">Barcode</th>
                                        <th data-toggle="true">Hoạt Chất</th>
                                        <th data-toggle="true">Nhà cung cấp</th>
                                        <th data-toggle="true">Loại Thuốc</th>
                                        <th data-toggle="true">Đơn Vị Tính</th>
                                        <th data-toggle="true">Giá Bán</th>
                                        <th data-toggle="true">Số Lượng</th>
                                        <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>

                    </div>
                        {data? <TablePagination data={data} baseUrl="/listDrugCabinet" /> : null}
                    </div>
                    {this.state.isShowModalInputCabinetForm ? <ModalChooseDrugCabinet title="Tạo Phiếu Lĩnh Dược"
                                optionDrugCabinet = {optionDrugCabinet}
                                show={this.state.isShowModalInputCabinetForm}
                                onHide={this.handleHidemodal}/> : null} 
                </div>
        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'DrugCabinetList',
            destroyOnUnmount: false,
            enableReinitialize: true,
            validate
        })(DrugCabinetList)));