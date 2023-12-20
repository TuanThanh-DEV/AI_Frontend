import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import { FormatterUtils } from '../../utils/javascriptUtils';
import ModalDrugCabinet from './ModalDrugCabinet';
import SecuredComponent from '../../components/SecuredComponent';


class DrugCabinetRow extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowStockCabinetRows : false,
            stockCabinets : [], 
            isShowModalDrugCabinet : false,
            idDrugCabinet : null
        }
        this.handleHidemodal = () => {
            this.setState({isShowModalDrugCabinet : false  });
            this.props.getStockCabinet();
        };

        
    };

    handleShowModalDrugCabinet (idDrugCabinet){
        this.setState({ isShowModalDrugCabinet: true , idDrugCabinet : idDrugCabinet})
    }

    deleteDrugCabinet(id){
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/drugCabinet/${id}`;
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

    getStockCabinets(drugCabinetId){
            let setStateInRequest = (list) => {this.setState({ stockCabinets : list})};
            return agent.asyncRequests.get("/stockCabinet/getByDrugCabinet?drugCabinetId=" + drugCabinetId
                ).then(function (res) {
                    var result = res.body.resultData;
                    if(result){
                        setStateInRequest(result);
                    }
    
                }, function (err) {
                    toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
                });
     }

     handleShowStockCabinet(drugCabinetId) {
        let isShowStockCabinetRowss = this.state.isShowStockCabinetRows;
        if(!isShowStockCabinetRowss){

            this.getStockCabinets(drugCabinetId);
        }
        this.setState({ isShowStockCabinetRows: !isShowStockCabinetRowss })
    }

    componentWillMount() {

    };

    render() {
        const { drugCabinets} = this.props;
        const {isShowStockCabinetRows} = this.state;
        var dataStockCabinet = this.state.stockCabinets;
        var drugCabientRows = [];
        var drugCabinetHeader = [];
        var CurrentNo = 0;
        if (dataStockCabinet) {
            drugCabientRows = dataStockCabinet.map(item => {
                return (
                    <tr key={"dataStockCabinet"+item.id}>
                        <td></td>
                        <td>{item.drug.name + " " + item.drug.hamLuongBHYT}</td>
                        <td>{item.drug.barCode}</td>
                        <td>{item.drug.ingredient}</td>
                        <td>{item.drug.supplier ? item.drug.supplier.name : ""}</td>
                        <td>{item.drug.drugCategory ? item.drug.drugCategory.name : null}</td>
                        <td>{item.drug.uom ? item.drug.uom : null}</td>
                        <td>{FormatterUtils.formatCurrency(item.drug.salePrice)}</td>
                        <td>{item.available}</td>
                        <td className="text-center footable-visible footable-last-column">
                            
                        </td>
                    </tr>);
            })
            drugCabinetHeader = [<tr className="success">
                                <th></th>
                                <th>Tên Thuốc</th>
                                <th>Barcode</th>
                                <th>Hoạt Chất</th>
                                <th>Nhà cung cấp</th>
                                <th >Loại Thuốc</th>
                                <th>Đơn Vị Tính</th>
                                <th>Giá Bán</th>
                                <th >Số Lượng</th>
                                <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                            </tr>].concat(isShowStockCabinetRows ? drugCabientRows : null);
        };

        return (
            [ <tr key={ "drugCabinets"+drugCabinets.id}>
                <td> {isShowStockCabinetRows ? <button className="bg-info-600 icon-dash  " onClick={() => this.handleShowStockCabinet(drugCabinets.id)}></button> :
                    <button className="bg-info-600 icon-plus22 " onClick={() => this.handleShowStockCabinet(drugCabinets.id)}></button>}
                </td>
                <td colSpan="1">{drugCabinets.name}</td>
                <td colSpan="1" >{drugCabinets.department.name}</td>
                <td colSpan="6" >{drugCabinets.description }</td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <SecuredComponent allowedPermission="admin.drugCabinet.update">
                                    <li><a onClick={() => this.handleShowModalDrugCabinet(drugCabinets.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                </SecuredComponent>
                                <SecuredComponent allowedPermission="admin.drugCabinet.delete">
                                    <li><a onClick={() => this.deleteDrugCabinet(drugCabinets.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                </SecuredComponent>
                            </ul>
                        </li>
                    </ul>
                </td>
                {this.state.isShowModalDrugCabinet ? <ModalDrugCabinet
                                title="Tủ Thuốc"
                                id={this.state.idDrugCabinet}
                                show={this.state.isShowModalDrugCabinet}
                                onHide={this.handleHidemodal} /> : null
                            }

            </tr>].concat((isShowStockCabinetRows && dataStockCabinet.length != 0) ? drugCabinetHeader : null)
        
        );
    }
    
}

export default translate('translations')(DrugCabinetRow);