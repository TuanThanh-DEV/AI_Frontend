import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, FormatterUtils } from '../../utils/javascriptUtils';
import { connect } from 'react-redux';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import SecuredComponent from '../../components/SecuredComponent';
import ModalPackageItem from './ModalPackageItem';
import moment from 'moment'
import ModalPackage from '../Package/ModalPackage';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({
  

});
class PackageItemRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPackageItem: "",
            isPackageItemModalShown: false,
            idPackageItem: null,
            idPackage: null,
            isShowPackageItemRows: false,
            isPackageModalShown: false,
            listPackageItem: []
        }
        this.handleShowPackageItem = this.handleShowPackageItem.bind(this);
        this.handleShowmodalPackageItem = this.handleShowmodalPackageItem.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPackageModalShown: false });
            this.props.handleHidemodal();
        };
        this.handleHidemodalPackageItem = (idPackageForPackageItem) => {
            this.setState({ isPackageItemModalShown: false });
            this.props.handleHidemodal();
            if (idPackageForPackageItem) {
                this.getListPackageItem(idPackageForPackageItem);
            }
        };

        this.deletePackageItem = (packageItem) => {
            if (confirm("Bạn có chắc sẽ gỡ khỏi gói khám: " + "'" + packageItem.diagnosisService.name + "'")) {
                var url = `/packageItem/${packageItem.id}`;
                var _this = this;
                return agent.asyncRequests.del(url
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result && !result.error) {
                        toast.info("Gỡ Thành Công Chỉ Định: " + packageItem.diagnosisService.name, {autoClose: 2000});
                        _this.getListPackageItem(packageItem.packageId);
                    } else {
                        toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
                });
            } else {
            }
        }

    };

    getListPackageItem(packageId) {
        let setStateInRequest = (list) => { this.setState({ listPackageItem: list }) }
        return (agent.asyncRequests.get("/packageItem/listAllByPackageId?packageId=" + packageId).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))

    }

    

    handleShowPackageItem(packageId) {
        let isShowPackageItemRows = this.state.isShowPackageItemRows;
        isShowPackageItemRows = !this.state.isShowPackageItemRows;
        this.setState({ isShowPackageItemRows: isShowPackageItemRows })
        if (isShowPackageItemRows) {
            this.getListPackageItem(packageId);
        }
    }
    handleShowmodalPackageItem(id) {
        this.setState({
            isPackageItemModalShown: true,
            idPackageItem: id
        });
    }
    handleShowmodalPackage(id) {
        this.setState({
            isPackageModalShown: true,
            idPackage: id
        });
    }
    componentWillMount(packageId) {

    };

    render() {
        const { packageItemObject, t } = this.props;
        var isShowPackageItemRows = this.state.isShowPackageItemRows;
        var dataPackageItem = this.state.listPackageItem;
        var packageItemRows = [];
        var packageItemCurrentNo = 0;
        if (dataPackageItem) {
            packageItemRows = dataPackageItem.map(item => {
                packageItemCurrentNo++;
                return (
                    <tr key={"packageItem_" + item.id} >
                        <td>{packageItemCurrentNo}</td>
                        <td colSpan="2">{item.diagnosisService ? item.diagnosisService.name : ""}</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.price)}</td>
                   
                        <td className="text-center footable-visible footable-last-column">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-menu9"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li><a onClick={() => this.handleShowmodalPackageItem(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                        <li><a onClick={() => this.deletePackageItem(item)}><i className="icon-cross2"></i>Gỡ Chỉ Định</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>
                );
            })
        }
        var rowItem = [
            <tr className="success">
                <th data-toggle="true">STT</th>
                <th colSpan="3" data-toggle="true">Tên dịch vụ</th>
                
                <th className="text-center footable-visible footable-last-column" style={{ width: "30px" }}  >
                    <i className="icon-menu-open2"></i>
                </th>
            </tr>
        ].concat(isShowPackageItemRows ? packageItemRows : "")
        return (
            [<tr className="" key={packageItemObject.id}>
                <td>
                    {isShowPackageItemRows ?
                        <button className="bg-info-600 icon-dash" onClick={() => this.handleShowPackageItem()
                        } ></button> :
                        <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowPackageItem(packageItemObject.id)}></button>

                    }

                </td>
                <td>{packageItemObject.name}</td>
                <td>{packageItemObject.code}</td>
                <td>{FormatterUtils.formatCurrency(packageItemObject.pricePackage)}</td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><a onClick={() => this.handleShowmodalPackage(packageItemObject.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                {/* <li><a onClick={() => this.deleteDepartment(packageItemObject.id)}><i className="icon-cross2"></i>Xóa</a></li> */}
                                <li><a onClick={() => this.handleShowmodalPackageItem()}><i className="icon-pencil"></i>Thêm Dịch Vụ</a></li>
                            </ul>
                        </li>
                    </ul>
                </td>
                {
                    this.state.isPackageModalShown ? <ModalPackage
                        title={this.state.idPackage ? "Chỉnh sửa" : "Thêm mới "}
                        idPackage={this.state.idPackage}
                        show={this.state.isPackageModalShown}
                        onHide={this.handleHidemodal} /> : null
                }
                {
                    this.state.isPackageItemModalShown ? <ModalPackageItem
                        title={this.state.idPackageItem ? "Chỉnh sửa " : "Thêm Mới "}
                        idPackageItem={this.state.idPackageItem}
                        show={this.state.isPackageItemModalShown}
                        onHide={(idPackageForPackageItem) => this.handleHidemodalPackageItem(idPackageForPackageItem)}
                        idPackageForPackageItem={packageItemObject.id} /> : null
                }
            </tr >].concat(isShowPackageItemRows ? rowItem : null)

        );
    }

}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(PackageItemRow));