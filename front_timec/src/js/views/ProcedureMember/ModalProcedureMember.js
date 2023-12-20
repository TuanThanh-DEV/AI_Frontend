import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PROCEDUREMEMBER } from './action-types';

const validate = values => {
    const errors = {};
    if (!values.procedureReportId) {
        errors.procedureReportId = "Vui lòng chọn phiếu thủ thuật!"
    }
    if (!values.userId) {
        errors.userId = "Vui lòng chọn thành viên thủ thuật"
    }
    if (!values.role) {
        errors.role = "Vui lòng chọn chức vụ!"
    }

    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.procedureMemberReducer.updatingProcedureMember,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadProcedureMember: (payload) =>
        dispatch({ type: LOAD_UPDATING_PROCEDUREMEMBER, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalProcedureMember", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }) 
});
class ModalProcedureMember extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllProcedureReport: [],
            listAllPersonel: [],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };


    getlistAllProcedureReport() {
        
            let setStateInRequest = (list) => { this.setState({ listAllProcedureReport: list }) }
            return agent.ProcedureReportApi.listAllProcedureReport(
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        
    }
    getlistAllUser() {
        
            let setStateInRequest = (list) => { this.setState({ listAllPersonel: list }) }
            return agent.UserApi.listAllPersonel(
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        
        
    }



    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idProcedureMember;
        var url = '/procedureMember/add';
        var bodyObject = {
            procedureReportId: values.procedureReportId,
            userId: values.userId,
            role: values.role,

        };
        if (id) {
            url = '/procedureMember/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", { autoClose: 1000 });
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadProcedureMember , idProcedureReport, updateField} = this.props;
        var id = this.props.idProcedureMember;

        const dataPromise = agent.ProcedureMemberApi.getProcedureMember(id);
        loadProcedureMember(Promise.resolve(dataPromise))

        this.getlistAllProcedureReport();
        this.getlistAllUser();
        if(idProcedureReport){
            updateField("procedureReportId", idProcedureReport)
        }
    }

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionAllProcedureReport = [];
        var dataListProcedureReport = this.state.listAllProcedureReport;
        if (dataListProcedureReport) {
            dataListProcedureReport.map(item => {
                optionAllProcedureReport.push({
                    label: (item.prescription && item.prescription.patient ? item.prescription.id + " - " + item.prescription.patient.fullName : "") + " - "
                        + (item.procedureService ? item.procedureService.name : null), value: item.id
                });
            })
        }
        var optionAllUser = [];
        var dataListUser = this.state.listAllPersonel;
        if (dataListUser) {
            dataListUser.map(item => {
                optionAllUser.push({ label: item.fullName, value: item.id });
            })
        }

        var optionProcedureMemberRole = [

            { label: "LEADER ", value: "LEADER" },
            { label: "MEMBER ", value: "MEMBER" },

        ]

        var id = this.props.idProcedureMember;
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
                                <Field placeholder="Tìm kiếm theo mã bệnh án ..." name="procedureReportId" label="Phiếu Thủ Thuật" options={optionAllProcedureReport} component={RenderSelect} ></Field>
                                <Field name="userId" label="Thành Viên Thủ Thuật" options={optionAllUser} component={RenderSelect}></Field>
                                <Field name="role" label="Chức Vụ" options={optionProcedureMemberRole} component={RenderSelect}></Field>

                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
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
            form: 'ModalProcedureMember',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalProcedureMember)));
