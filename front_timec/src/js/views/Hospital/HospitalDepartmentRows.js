import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalHospital from './ModalHospital';
import ModalDepartment from '../Department/ModalDepartment';

class HospitalDepartmentRows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listDepartment: null,
            isDepartmentModalShown: false,
            idDepartment: null,
            idHospital: null,
            isShowDepartmentRows: false,
            isHospitalModalShown: false,
            listDepartment: []
        }
        this.handleShowDepartment = this.handleShowDepartment.bind(this);
        this.handleShowmodalDepartment = this.handleShowmodalDepartment.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isHospitalModalShown: false });
            this.props.handleHidemodal();
        };
        this.handleHidemodalDepartment = (idHospitalForDepartment) => {
            this.setState({ isDepartmentModalShown: false });
            this.props.handleHidemodal();
            if (idHospitalForDepartment) {
                this.getListDepartment(idHospitalForDepartment);
            }
        };

    };

    getListDepartment(hospitalId) {
        // var isShowDepartmentRows = this.state.isShowDepartmentRows;
        // alert("isShowDepartmentRows : " + isShowDepartmentRows)
        // if(isShowDepartmentRows){
        let setStateInRequest = (list) => { this.setState({ listDepartment: list }) }
        return (agent.asyncRequests.get("/department/listAllByHospitalId?hospitalId=" + hospitalId).then(function (res) {
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
    handleShowDepartment(hospitalId) {
        let isShowDepartmentRows = this.state.isShowDepartmentRows;
        isShowDepartmentRows = !this.state.isShowDepartmentRows;
        this.setState({ isShowDepartmentRows: isShowDepartmentRows })
        if (isShowDepartmentRows) {
            this.getListDepartment(hospitalId);
        }
    }
    handleShowmodalDepartment(id) {
        this.setState({
            isDepartmentModalShown: true,
            idDepartment: id
        });
    }
    handleShowmodalHospital(id) {
        this.setState({
            isHospitalModalShown: true,
            idHospital: id
        });
    }
    componentWillMount() {
    };

    render() {
        const { hospitalObject, t } = this.props;
        var isShowDepartmentRows = this.state.isShowDepartmentRows;
        var dataDepartment = this.state.listDepartment;
        var departmentRows = [];
        var departmentCurrentNo = 0;
        if (dataDepartment) {
            departmentRows = dataDepartment.map(item => {
                departmentCurrentNo++;
                return (
                    <tr key={"department_" + item.id}>
                        <td>{departmentCurrentNo}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td className={item.hasActive ? "text-success" : "text-warning"}>{item.hasActive ? "Đang Hoạt Động" : "Vô Hiệu Hoá"}</td>

                        <td className="text-center footable-visible footable-last-column">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-menu9"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li><a onClick={() => this.handleShowmodalDepartment(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                        {/* <li><a onClick={() => this.deleteDepartment(item.id)}><i className="icon-cross2"></i>Xóa</a></li> */}
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>
                );
            })
        }

        // currentNo++
        return (
            [<tr className="bg-success-300" key={hospitalObject.id}>
                <td>
                    {hospitalObject.hasActive ?
                        (
                            isShowDepartmentRows ?
                                <button className="bg-info-600 icon-dash" onClick={() => this.handleShowDepartment(hospitalObject.id)
                                } ></button> :
                                <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowDepartment(hospitalObject.id)}></button>
                        ) : null
                    }

                </td>
                <td>{hospitalObject.code}</td>
                <td>{hospitalObject.name}</td>
                <td className={hospitalObject.hasActive ? "text-white" : "text-warning"}>{hospitalObject.hasActive ? "Đang Hoạt Động" : "Vô Hiệu Hoá"}</td>

                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><a onClick={() => this.handleShowmodalHospital(hospitalObject.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                {/* <li><a onClick={() => this.deleteHospital(hospitalObject.id)}><i className="icon-cross2"></i>Xóa</a></li> */}
                                {hospitalObject.hasActive ? <li><a onClick={() => this.handleShowmodalDepartment()}><i className="icon-pencil"></i>Thêm Chuyên Khoa</a></li> : null}
                            </ul>
                        </li>
                    </ul>
                </td>
                {
                    this.state.isHospitalModalShown ? <ModalHospital
                        title={this.state.idHospital ? "Chỉnh sửa Phòng Khám" : "Thêm Mới Phòng Khám"}
                        idHospital={this.state.idHospital}
                        show={this.state.isHospitalModalShown}
                        onHide={this.handleHidemodal}
                    // handleShowmodal =  {this.handleShowmodal()}
                        UpdateListHospital={this.props.UpdateListHospital}
                    /> : null
                }
                {
                    this.state.isDepartmentModalShown ? <ModalDepartment
                        title={this.state.idDepartment ? "Chỉnh sửa Chuyên Khoa" : "Thêm Mới Chuyên Khoa"}
                        idDepartment={this.state.idDepartment}
                        show={this.state.isDepartmentModalShown}
                        onHide={(idHospitalForDepartment) => this.handleHidemodalDepartment(idHospitalForDepartment)}
                        idHospitalForDepartment={hospitalObject.id} /> : null
                }
            </tr >].concat(isShowDepartmentRows ? departmentRows : null)

        );
    }
}
export default translate('translations')(HospitalDepartmentRows);