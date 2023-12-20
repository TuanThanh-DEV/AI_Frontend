import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderTextArea, RenderSelect, RenderNumberInput,RenderDatePickerWithTime } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';

const validate = values => {
    const errors = {};
    if (!values.drugCabinetId) {
        errors.drugCabinetId = 'Vui lòng chọn Tủ Thuốc!';
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
    };
    return {
        initialValues: updateValue ,
    };
};
const mapDispatchToProps = dispatch => ({
});
class ModalOutputFormChooseDrugCabinet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrugCabinet : null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

     getlistAllDrugCanimet(){
        let setStateInRequest = (list) => { this.setState({ listAllDrugCabinet: list }) }
        return agent.asyncRequests.get('/drugCabinet/listAll'
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
  

    componentWillMount() {
        this.getlistAllDrugCanimet();
    }
    
    handleAdd(values) {
        // window.location.href = "/inputCabinetForm/" + values.drugCabinetId;
    };

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    

    render() {
        const { handleSubmit, submitting, title } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        const dataDrugCabinet = this.state.listAllDrugCabinet;
        var optionDrugCabinet = [];
        if(dataDrugCabinet){
            dataDrugCabinet.map(item=>{
                optionDrugCabinet.push({label:item.name + ' / ' +(item.department.name), value:item.id});
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
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <Field name="drugCabinetId" label="Chọn Tủ Thuốc"    placeholder="Chọn Tủ Thuốc..." options={optionDrugCabinet} component={RenderSelect}></Field>
                                <div className="text-right">
                                    <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                    <button type="submit"  className="btn bg-success" disabled={submitting}> Tạo </button>
                                </div>
                            </form>
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
            form: 'ModalOutputFormChooseDrugCabinet',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalOutputFormChooseDrugCabinet)));
