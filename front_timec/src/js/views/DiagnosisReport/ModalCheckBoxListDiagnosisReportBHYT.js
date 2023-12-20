import React from 'react';
import { Modal } from 'react-bootstrap';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import { LOAD_UPDATING_DIAGNOSISREPORT } from './action-types';

const validate = values => {
    const errors = {};
    if (!values.diagnosisService) {
        errors.diagnosisService = { id: "Vui lòng chọn dịch vụ Chỉ Định!" }
    }

    return errors;
}
var today = new Date();
const mapStateToProps = state => {
    var updateValue = {
        ...state.diagnosisReportReducer.updatingDiagnosisReport,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadDiagnosisReport: (payload) =>
        dispatch({ type: LOAD_UPDATING_DIAGNOSISREPORT, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalCheckBoxListDiagnosisReportBHYT", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalCheckBoxListDiagnosisReportBHYT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            expanded: [],
            listAllDiagnosisService: [],
            listAllDiagnosisGroup: [],
            listCheckedNotChange: [],
            diagnosisServiceId: null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.getListAllDiagnosisGroup = this.getListAllDiagnosisGroup.bind(this);
        this.getlistAllDiagnosisService = this.getlistAllDiagnosisService.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    getListAllDiagnosisGroup() {

        let setStateInRequest = (list) => { this.setState({ listAllDiagnosisGroup: list }) }
        return agent.DiagnosisGroupApi.listAllDiagnosisGroup(
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

    getlistAllDiagnosisService() {
        const { isAllService } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllDiagnosisService: list }) }
        // if (isAllService) {
            return agent.DiagnosisServiceApi.listAllDiagnosisServiceBHYT(
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
    getListCheckDiagnosisService(prescriptionId) {
        let setStateListCheck = (list) => {
            this.setState({
                checked: list
            })
        }
        let setStateListCheckNotChange = (list) => {
            this.setState({
                listCheckedNotChange: list
            })
        }
        return agent.asyncRequests.get('/diagnosisReportBHYT/getServiceByBHYTPrescriptionId?prescriptionId=' + prescriptionId
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                var listIdCheck = [];
                var listIdCheckNotChange = []
                result.map(item => {
                    if (item.status != "OPEN") {
                        listIdCheckNotChange.push(item.diagnosisService.id)
                    }
                    if(item.statusPayment){
                        listIdCheckNotChange.push(item.diagnosisService.id)
                    }
                    listIdCheck.push(item.diagnosisService.id)
                })
                setStateListCheckNotChange(listIdCheckNotChange);
                setStateListCheck(listIdCheck);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        this.getListAllDiagnosisGroup();
        this.getlistAllDiagnosisService();
        this.getListCheckDiagnosisService(this.props.prescriptionId);
    }

    handleAdd() {
        var onHide = this.props.onHide;
        var prescriptionId = this.props.prescriptionId;
        var url = '/diagnosisReportBHYT/addListDiagnosisService';
        var bodyObject = {
            prescrioptionId: prescriptionId,
            listDiagnosisServiceIds: this.state.checked,
        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                onHide();
                toast.info("Lưu Thành Công.", { autoClose: 1000 });
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    handleSearch(diagnosisServiceId) {
        if (diagnosisServiceId) {
            this.setState({
                diagnosisServiceId: diagnosisServiceId
            })
        }
    }
    handleClear() {
        const { destroy } = this.props;
        this.setState({
            diagnosisServiceId: null
        })
        destroy();
    }

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }

    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "lg",
            onHide: this.props.onHide
        };
        var nodes = [];
        var dataDiagnosisGroup = this.state.listAllDiagnosisGroup;
        var dataDiagnosisService = this.state.listAllDiagnosisService;
        var diagnosisServiceId = this.state.diagnosisServiceId;
        if (dataDiagnosisGroup.length != 0 && dataDiagnosisService.length != 0) {
            if (diagnosisServiceId) {
                dataDiagnosisGroup.map((itemGroup, index) => {
                    var children = [];
                    var ispushgroup = false;
                    dataDiagnosisService.map((itemService, index) => {

                        if (itemService.id === diagnosisServiceId && itemGroup.id === itemService.diagnosisGroup.id) {
                            children.push({ value: itemService.id, label: itemService.name, disabled: this.state.listCheckedNotChange.indexOf(itemService.id) >= 0 ? true : false})
                            return ispushgroup = true;
                        }
                    })
                    if (ispushgroup) {
                        if (itemGroup.id != 88) {
                            if (children.length > 0) {
                                nodes.push({ value: "itemGroup__" + itemGroup.id, label: itemGroup.name, children: children });
                            }
                        }
                    }
                })
            } else {
                dataDiagnosisGroup.map((itemGroup, index) => {
                    var children = [];
                    dataDiagnosisService.map((itemService, index) => {
                        if (itemGroup.id === itemService.diagnosisGroup.id) {
                            children.push({ value: itemService.id, label: itemService.name, disabled: this.state.listCheckedNotChange.indexOf(itemService.id) >= 0 ? true : false  })
                        }
                    })
                    if (itemGroup.id != 88) {
                        if (children.length > 0) {
                            nodes.push({ value: "itemGroup__" + itemGroup.id, label: itemGroup.name, children: children });
                        }
                    }
                })
            }
        }

        var optionDiagnosisService = []
        if (dataDiagnosisService != null) {
            dataDiagnosisService.map(service => {
                optionDiagnosisService.push({ label: service.name, value: service.id });
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
                        <div className="row">
                            <div className="col-md-8">
                                <Field name="diagnosisServiceId" label="Tên Dịch Vụ" onChangeAction={value => this.handleSearch(value)} options={optionDiagnosisService} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-2" style={{ paddingTop: "30px" }}>
                                <button type="button" className="btn btn-warning" onClick={this.handleClear}> Hiện Tất Cả</button>
                            </div>
                        </div>
                        <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                            <div style={{ border: "1px solid #333", padding: "5px", margin: "0px -10px 10px -10px" }}>
                                <CheckboxTree
                                    nodes={nodes}
                                    checked={this.state.checked}
                                    expanded={this.state.expanded}
                                    onCheck={(checked) => this.setState({ checked })}
                                    onExpand={expanded => this.setState({ expanded })}
                                    icons={{
                                        check: <span className="" />,
                                        uncheck: <span className="" />,
                                        halfCheck: <span className="" />,
                                        expandClose: <span className="bg-info-600 icon-plus22" />,
                                        expandOpen: <span className="bg-info-600 icon-dash" />,
                                        parentClose: <span className="" />,
                                        parentOpen: <span className="" />,
                                        expandAll: <span className="" />,
                                        collapseAll: <span className="" />,
                                        leaf: <span className="" />,
                                    }}
                                />
                            </div>
                            <div className="text-right">
                                <button type="button" style={{ marginRight: "20px" }} className="btn btn-default" onClick={this.handleHideAndClear} ><i className="icon-cross" aria-hidden="true"></i> Đóng</button>
                                <button type="submit" className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalCheckBoxListDiagnosisReportBHYT',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCheckBoxListDiagnosisReportBHYT)));
