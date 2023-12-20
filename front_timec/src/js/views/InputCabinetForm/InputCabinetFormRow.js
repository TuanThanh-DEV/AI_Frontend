import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import { FormatterUtils } from '../../utils/javascriptUtils';
import moment from 'moment';


class InputCabinetFormRow extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowInputCabinet : false,
            listInputCabinet : [], 
            isShowModalAddStockCabinet : false,

        }
        this.handleHidemodal = () => {
            this.setState({isShowModalAddStockCabinet : false  });
        };

        
    };

    handleShowModalAddStockCabinet (){
        this.setState({ isShowModalAddStockCabinet: true })
    }

    getInputCabinet(inputCabinetFormId){
            let setStateInRequest = (list) => {this.setState({ listInputCabinet : list})};
            return agent.asyncRequests.get("/inputCabinet/getByFormId?formId=" + inputCabinetFormId
                ).then(function (res) {
                    var result = res.body.resultData;
                    if(result){
                        setStateInRequest(result);
                    }
    
                }, function (err) {
                    toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
                });
     }

     handleShowInputCabinet(inputCabinetFormId) {
        let isShowInputCabinets = this.state.isShowInputCabinet;
        if(!isShowInputCabinets){

            this.getInputCabinet(inputCabinetFormId);
        }
        this.setState({ isShowInputCabinet: !isShowInputCabinets })
    }

    handleSubmitInputCabinetForm(id){
        const {currentUserId} = this.props
        if (confirm("Vui lòng kiểm tra danh sách trước khi lấy thuốc ")) {
            var url = '/inputCabinetForm/inputStockCabinet?formId='+id+"&userId=" + currentUserId;
            return agent.asyncRequests.get(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result== "success") {
                    toast.success("Thành công!", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
                    window.location.href = "/listInputCabinetForm";
                } else  if (result.errorMessage){
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }else{

        }
    }


    componentWillMount() {

    };

    render() {
        const { InputCabietForm,t} = this.props;
        const {isShowInputCabinet} = this.state;
        var dataInputCabinet = this.state.listInputCabinet;
        var inputCabientRows = [];
        var inputCabinetHeader = [];
        var CurrentNo = 0;
        var statusElement = InputCabietForm.status == "DONE" ?  "bg-success" : "";
        if (dataInputCabinet) {
            inputCabientRows = dataInputCabinet.map(item => {
                return (
                    <tr key={"dataInputCabinet"+item.id}>
                        <td></td>
                        <td>{item.drug.name + " " + item.drug.hamLuongBHYT}</td>
                        {/* <td>{item.drug.barCode}</td> */}
                        <td>{item.drug.ingredient}</td>
                        <td>{item.drug.uom ? item.drug.uom : null}</td>
                        <td>{item.inputAmount}</td>
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
            })
            inputCabinetHeader = [<tr className="success">
                                <th></th>
                                <th>Tên Thuốc</th>
                                {/* <th>Barcode</th> */}
                                <th>Hoạt Chất</th>
                                <th>Đơn Vị Tính</th>
                                <th >Số Lượng</th>
                                <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                            </tr>].concat(isShowInputCabinet ? inputCabientRows : null);
        };

        return (
            [ <tr key={ "InputCabinetFormRow"+InputCabietForm.id}>
                <td> {isShowInputCabinet ? <button className="bg-info-600 icon-dash  " onClick={() => this.handleShowInputCabinet(InputCabietForm.id)}></button> :
                    <button className="bg-info-600 icon-plus22 " onClick={() => this.handleShowInputCabinet(InputCabietForm.id)}></button>}
                </td>
                    <td>{InputCabietForm.drugCabinet.name + " - " + InputCabietForm.drugCabinet.department.name}</td>
                    <td>{moment(InputCabietForm.inputDate).format("DD-MM-YYYY")}</td>
                    <td>{InputCabietForm.createdUser.fullName}</td>
                    <td  className={statusElement}>{t(InputCabietForm.status)}</td>
                    <td style={{ width: '7%' }}>
                        <button className="btn btn-success"  onClick={() => this.handleSubmitInputCabinetForm(InputCabietForm.id)}>  Chuyển Thuốc </button>
                    </td>
            </tr>].concat( (isShowInputCabinet && dataInputCabinet.length != 0) ? inputCabinetHeader : null)
        );
    }

}
export default translate('translations')(InputCabinetFormRow);