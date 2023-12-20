import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import moment from 'moment'

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    
};
const mapDispatchToProps = dispatch => ({
});
class ModalOutputStockForInvoiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOutPutStock:[],
        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); 
    }

    getlistAllOutPutSockByInvoiceId(id){
        let setStateInRequest = (list) => { this.setState({ listOutPutStock: list }) }
        return agent.asyncRequests.get("/outputStock/findByInvoiceId?invoiceId=" + id).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        const id = this.props.idInvoice;
        if(id){
            this.getlistAllOutPutSockByInvoiceId(id);
        }
        
    }

    render() {
        const {idInvoice, submitting, title } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"large",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var data = this.state.listOutPutStock;
        var rows = null;
        if(data){
            rows = data.map( item => {
                return  <tr style={{textAlign:"center", borderBottom:"1px solid #333"}}>
                            <td width="5%">{item.outputForm ? item.outputForm.id : ""}</td>
                            <td width="25%">{item.drug.name + " " + item.drug.hamLuongBHYT}</td>
                            <td width="20%">{item.drugStore.name}</td>
                            <td width="5%">{item.outAmount}</td>
                            <td width="15%">{item.outAmount * item.drug.salePrice}</td>
                            <td width="15%">{moment(item.outputDatee).format("DD/MM/YYYY")}</td>
                            <td width="10%">{item.invoice.id}</td>
                        </tr>
            })
        }

        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                           
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th width="10%" data-toggle="true">Mã Phiếu</th>
                                            <th width="25%" data-toggle="true">Tên Thuốc</th>   
                                            <th width="20%" data-toggle="true">Quầy Thuốc</th>   
                                            <th width="5%" data-toggle="true">Số Lượng</th>   
                                            <th width="15%" data-toggle="true">Tổng Giá</th>  
                                            <th width="15%" data-toggle="true">Ngày Xuất</th>  
                                            <th width="10%" data-toggle="true">Mã Hoá Đơn</th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                                <br/>
                                <div className="text-right">
                                    <button type="button" style={{marginRight:"20px"}} className="btn btn-warning" onClick={this.handleHideAndClear} >Đóng</button>
                                 </div>
                            </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalOutputStockForInvoiceList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalOutputStockForInvoiceList)));
