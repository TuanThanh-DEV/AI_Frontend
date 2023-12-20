import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { PermanentCacheService } from '../../services/middleware';
import TableOutputCabinet from '../InputCabinetForm/TableOutputCabinet';
import { LOAD_UPDATING_OUTPUT_FORM } from './action-types';


const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.outputFormReducer.updatingOutputForm,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadOutputForm: (payload) =>
        dispatch({ type: LOAD_UPDATING_OUTPUT_FORM, payload: payload })
});
class ModalOutputCabinet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllOutputForm: [],
        }

        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };
    handleHideAndClear() {
        const { onHide } = this.props;
        onHide();
    }

    componentWillMount() {
    }

    render() {
         var currentUserFullName = PermanentCacheService.getItem("currentUser").fullName;
        const { handleSubmit, submitting, title, invalid, prescription } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "lg",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };
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
                            <form className="form-horizontal" role="form">
                                <TableOutputCabinet  currentUserName={currentUserFullName} patientCode = {prescription.patient.code} prescriptionId={prescription.id} departmentId={prescription.departmentId}></TableOutputCabinet>
                                <div className="text-right" style={{paddingTop : '20px'}}>
                                    <button type="button"  style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
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
            form: 'ModalOutputCabinet',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalOutputCabinet)));
