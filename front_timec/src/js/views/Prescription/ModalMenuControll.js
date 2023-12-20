import React from 'react';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';

class ModalMenuControll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listQueueNumber : null
        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleChooseAndNewPrescription = (idQueueNumber) => {
            if (confirm("Xác nhận mời bệnh nhânh!")){
                const {onHide} = this.props;
                var _this = this;
                return agent.asyncRequests.get("/prescriptionEdit/createPrescriptionForChoose?idQueueNumber="+ idQueueNumber 
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        _this.props.fillDataFromQueueNumberToPresciption(result.id);
                        onHide();
                        // toast.info("Lưu Thành Công.", { autoClose: 1000 });
                    } else {
                        toast.info('Đã hết "Hàng Đợi Thường"! Vui lòng tạo thêm "Hàng Đợi Thường" hoặc "Ngừng Nhận Bênh Nhân "', { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
            }
        }
    };
    handleHideAndClear() {
        const { destroy,onHide } = this.props;
        onHide();
        destroy();
    }
    
    handleRemoveQueueNumber(id){
        var _this = this;
        if (confirm("Bạn có chắc sẽ xoá Hàng chờ này!")) {
            var url = `/queueNumber/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công! ");
                    _this.getListQueueNumber();
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
            return
        }
    }
   
    getListQueueNumber(){
        var currentUser = this.props.currentUser;
        let setStateInRequest = (list) => this.setState({
            listQueueNumber: list
        });
        return agent.asyncRequests.get('/queue/findQueueNumberByDoctor/'+currentUser.id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error(res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        this.getListQueueNumber();
    }
    render() {
        const { title, onHide, t } = this.props;
        const modalconfig = {show: this.props.show, onHide: this.props.onHide};
        const listQueueNumber = this.state.listQueueNumber;
        if(listQueueNumber){
            var row = listQueueNumber.map(item =>{

                return (<tr key={item.id}>
                            <td>{item.theNumber}</td>
                            <td>{item.patient? item.patient.fullName : null}</td>
                            <td>{t(item.type)}</td>
                            <td>
                                <div>
                                    <button className="btn btn-info" onClick={() => this.handleChooseAndNewPrescription(item.id)} >Mời Ưu Tiên</button>
                                    <button className="btn btn-warning" onClick={() => this.handleRemoveQueueNumber(item.id)} >Xoá</button>
                                </div>
                            </td>
                        </tr>)
            })
        }
        
        var newModal = null;
            newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalconfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>Thông Tin {title}</center></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <table className="table table-xxs table-bordered">  
                            <thead>
                                <tr className="bg-teal">
                                    <th width={"10%"}>Số Hàng Đợi</th>
                                    <th width={"35%"} >Tên Bệnh Nhân</th>
                                    <th width={"23%"} >Trạng Thái</th>
                                    <th width={"32%"} className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {row}
                            </tbody>

                        </table>
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};
export default translate('translations')(ModalMenuControll)