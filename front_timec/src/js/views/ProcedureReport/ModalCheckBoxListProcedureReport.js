import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import _ from 'lodash';
import { LOAD_UPDATING_PROCEDUREREPORT } from './action-types';

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.procedureReportReducer.updatingProcedureReport,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadProcedureReport: (payload) =>
        dispatch({ type: LOAD_UPDATING_PROCEDUREREPORT, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalCheckBoxListProcedureReport", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalCheckBoxListProcedureReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            expanded: [],
            listAllProcedureService : [],
            procedureServiceChooseId : null,
            listCheckedNotChange : []   
    
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.getListAllProcedureService = this.getListAllProcedureService.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.getListCheckProcedureService = this.getListCheckProcedureService.bind(this);
     };

    getListAllProcedureService(procedureServiceId){
        if(procedureServiceId){
            this.setState({
                procedureServiceChooseId : procedureServiceId
             })
         }else{
            let setStateInRequest = (list) => { this.setState({ listAllProcedureService: list }) }
            return agent.ProcedureServiceApi.listAllProcedureService(
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
    }

    getListCheckProcedureService(prescriptionId){
        let setStateListCheck = (list) => { this.setState({ 
             checked : list
            }) }
        let setStateListCheckNotChange = (list) => { this.setState({ 
            listCheckedNotChange : list
            }) }
        return agent.asyncRequests.get('/procedureReport/listProcedureReportByProcedureService?prescriptionId=' + prescriptionId
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                var listIdCheck = [];
                var listIdCheckNotChange =[]
                result.map(item => {
                    if(item.status != "OPEN"){
                        listIdCheckNotChange.push(item.procedureService.id)
                    }
                    listIdCheck.push(item.procedureService.id)
                })
                setStateListCheckNotChange(listIdCheckNotChange);
                setStateListCheck(listIdCheck);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
            +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    
    componentWillMount() {
        this.getListAllProcedureService();
        this.getListCheckProcedureService(this.props.prescriptionId);
    }

    handleAdd(){
        var onHide = this.props.onHide;
            var prescriptionId = this.props.prescriptionId;
            var url = '/procedureReport/addListProcedureService';
            var bodyObject = {
                prescriptionId : prescriptionId,
                listProcedureServiceIds : this.state.checked,
            };
            return agent.asyncRequests.post(url, bodyObject
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        onHide();
                         toast.info("Lưu Thành Công.", {autoClose: 1000});
                    } else {
                        toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
    };

    handleSearch(procedureServiceId){
        this.getListAllProcedureService(procedureServiceId);
    }
    handleClear(){
        const { destroy } = this.props;
        this.setState({
            procedureServiceChooseId : null})
        destroy();
    }

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }

    render() {

        // console.log("listCheckedNotChange ", this.state.listCheckedNotChange )
        // console.log("checked", this.state.checked)
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"lg",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var nodes = [];
        var optionProcedureService = [];
        var dataProcedureService = this.state.listAllProcedureService;
        var procedureServiceChooseId = this.state.procedureServiceChooseId;
            if (dataProcedureService.length != 0) {
                if(procedureServiceChooseId == null){
                    dataProcedureService.map(itemService => {
                            nodes.push({ value: itemService.id, label: itemService.name, disabled: this.state.listCheckedNotChange.indexOf(itemService.id) >= 0 ? true : false});
                        })
                }else{
                    dataProcedureService.map(itemService => {
                        if(procedureServiceChooseId == itemService.id ){
                            nodes.push({ value: itemService.id, label: itemService.name, disabled: this.state.listCheckedNotChange.indexOf(itemService.id) >= 0 ? true : false });
                            return;
                        }
                    })
                }
                dataProcedureService.map(itemService => {
                    optionProcedureService.push({ label: itemService.name, value: itemService.id });
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
                            <div className="col-md-8" autoFocus={true}>
                            <Field name="procedureService.id" label="Nhóm Chỉ Định"  onChangeAction={value=>this.handleSearch(value)} options={optionProcedureService} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-2" style={{paddingTop:"30px"}}>
                            <button  type ="button" className="btn btn-warning" onClick={this.handleClear}> Hiện Tất Cả</button>
                            </div>
                        </div>
                     <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                        <div style={{border:"1px solid #333", padding: "5px",margin: "0px -10px 10px -10px"}}>
                            <CheckboxTree
                                nodes={nodes}
                                checked={this.state.checked}
                                expanded={this.state.expanded}
                                // disabled = {true}
                                // disabled = {this.state.listCheckedNotChange.indexOf('checked') ? true : false}
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
                        <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>           
                            <button className="btn btn-primary" type="submit" disabled={submitting}>Tạo Đơn Thủ Thuật</button>
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
            form: 'ModalCheckBoxListProcedureReport',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCheckBoxListProcedureReport)));
