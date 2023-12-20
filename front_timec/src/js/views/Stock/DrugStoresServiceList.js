import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalPaymentForBarCode from '../Payment/ModalPaymentForBarCode';
import ModalDrugStoreService from './ModalDrugStoreService';

class DrugStoresServiceList extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowModalOutputDrugStoreService : false ,
            isPaymentModalPaymentForBarCode : false,
            firstCode : null,
            tileModalPaymentForBarCode : null
        }
        this.handleHidemodal = () => {
            this.setState({
                isShowModalOutputDrugStoreService : false ,
                isPaymentModalPaymentForBarCode : false,
            })
            this.UpdateListStock();
        };
        this.UpdateListStock = this.UpdateListStock.bind(this);
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleShowModalPaymentForBarCode = this.handleShowModalPaymentForBarCode.bind(this);

    };

    UpdateListStock(){
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listStock: list }) }
        return agent.StockApi.listStock(search, page
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
        });

    }
    handleShowmodal() {
        this.setState({
            isShowModalOutputDrugStoreService: true,
        });
    }
    handleShowModalPaymentForBarCode(value){
        var titleModal = "";
        if(value === "idPrescription"){
            titleModal = "Tìm Phiếu Thu Theo Mã Bệnh Án"
        }else if(value === "idInvoice"){
            titleModal = "Tìm Phiếu Thu Theo Mã Hoá Đơn"
        }else{
            titleModal = "Tìm Phiếu Thu Theo Mã Bệnh Nhân"
        }

        this.setState({
            isPaymentModalPaymentForBarCode : true,
            firstCode : value,
            tileModalPaymentForBarCode : titleModal
        })
    }
    componentWillMount() {
        this.UpdateListStock();
        
    };

    render() {
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listStock;
        if (!data) {
            return null; }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1; }
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.drug.name + " " + item.drug.hamLuongBHYT}</td>
                    <td>{item.drugStore.name}</td>
                    <td>{item.available}</td>
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
                </tr>);
        });
        return (
            <div className="content-wrapper">
            <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Quản Lý Nhà Thuốc</li>
                        <li className="active">Quầy Bán Thuốc</li>
                    </ul>
                    <div className="heading-elements">
                        <div className="heading-btn-group">
                            {/* <button className="btn bg-teal" onClick={() => this.handleShowModalPaymentForBarCode("idInvoice")}>Tìm Theo Hoá Đơn</button> */}
                            <button className="btn bg-teal" onClick={() => this.handleShowModalPaymentForBarCode("idPrescription")}>Tìm Theo Mã Bệnh Án</button>
                            {/* <button className="btn bg-teal" onClick={() => this.handleShowModalPaymentForBarCode("patientCode")}>Tìm Theo Mã Bệnh Nhân</button> */}
                            <button className="btn bg-success" onClick={() => this.handleShowmodal()}>Tạo Phiếu Bán Lẻ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="row">                    
                        <div className="col-md-12">   
                        <form className="main-search" role="form">
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo tên kho thuốc..." name="search" defaultValue={search} autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </form>  
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên Thuốc</th>
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
                            {this.state.isPaymentModalPaymentForBarCode ? <ModalPaymentForBarCode
                                show={this.state.isPaymentModalPaymentForBarCode}
                                firstCode = {this.state.firstCode}
                                listPaymentObj = {(list) => this.setState({ listPayment: list })}
                                title = {this.state.tileModalPaymentForBarCode}
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isShowModalOutputDrugStoreService ? <ModalDrugStoreService
                                show={this.state.isShowModalOutputDrugStoreService}
                                firstCode = {this.state.firstCode}
                                listPaymentObj = {(list) => this.setState({ listPayment: list })}
                                title = {this.state.tileModalPaymentForBarCode}
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={data} baseUrl="/listIcd" />
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(DrugStoresServiceList);