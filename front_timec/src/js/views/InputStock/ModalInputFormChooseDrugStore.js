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
    if (!values.drugStoreId) {
        errors.drugStoreId = 'Vui lòng chọn kho thốc!';
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
    };
    return {
        initialValues: updateValue ,
        currentUser: state.common.currentUser,
    };
};
const mapDispatchToProps = dispatch => ({
});
class ModalInputFormChooseDrugStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrugStore : null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

     getlistAllDrugStore(){
        let setStateInRequest = (list) => { this.setState({ listAllDrugStore: list }) }
        return agent.DrugStoreApi.listAllDrugStore(
        ).then(function (res) {
            var result = res.resultData;
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
        const { currentUser } = this.props;
        this.getlistAllDrugStore();
    }
    
    handleAdd(values) {
        var {onHide, currentUser} = this.props;
        var url = '/inputForm/newInputForm';
        var bodyObject = {
            drugStoreId : values.drugStoreId,
            createdUserId : currentUser.id
        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                window.location.href = "/inputForm/" + result.id;
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    

    render() {
        const { handleSubmit, submitting, title, invalid,isUpdateStatus } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        const dataDrugStore = this.state.listAllDrugStore;
        var optionDrugStore = [];
        if(dataDrugStore){
            dataDrugStore.map(item=>{
                optionDrugStore.push({label:item.name + ' / ' +(item.hospital ? item.hospital.name : null ), value:item.id});
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
                                <Field name="drugStoreId" label="Chọn Kho Thuốc(*)"    placeholder="Chọn Kho thuốc..." options={optionDrugStore} component={RenderSelect}></Field>
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
            form: 'ModalInputFormChooseDrugStore',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInputFormChooseDrugStore)));
