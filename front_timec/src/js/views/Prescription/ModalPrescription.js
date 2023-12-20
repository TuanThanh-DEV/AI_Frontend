import React from 'react';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';


class ModalPrescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objPrescription : null
        }
    };

    componentWillMount() {
       
        var id = this.props.idPrescription;
        alert(id);
        var url = '/prescription/' + id;
        let setStateInRequest = (obj) => this.setState({
            objPrescription: obj
        });
        return agent.asyncRequests.get(url
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
           
    }
    render() {
        const { title, onHide } = this.props;
        const modalconfig = {show: this.props.show, onHide: this.props.onHide};
        const objPrescription = this.state.objPrescription;
        var newModal = null;
        if (objPrescription != null) {
            newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalconfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">Thông Tin {title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <hr/>
                        <form className="form-horizontal" role="form">   
                        <div className="form-group">
                        <div className="col-sm-3">
                                Mã Hợp Đồng:
                            </div>
                            <div className="col-sm-9">
                                <input type="text" value={objPrescription.id} className="form-control" readOnly={true} />                           
                            </div>
                        </div>   
                        </form>
                        <div className="text-right">
                            <button type="button" style={{marginRight:"20px"}} className="btn btn-success" onClick={onHide}>Đóng</button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        }
        return newModal;
    }
};
export default translate('translations')(ModalPrescription)