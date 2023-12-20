import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea,  RenderSelect, RenderMoneyFormat, RenderSwitch } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DIAGNOSISSERVICE } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập tên dịch vụ!"
    }
    if(!values.price){
        errors.price = "Vui lòng nhập giá dịch vụ!"
    }
    if(!values.diagnosisGroupId){
        errors.diagnosisGroupId = "Vui lòng chọn nhóm dịch vụ!"
    }
   
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.diagnosisServiceReducer.updatingDiagnosisService,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadDiagnosisService: (payload) =>
        dispatch({ type: LOAD_UPDATING_DIAGNOSISSERVICE, payload: payload })
});
class ModalDiagnosisService extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllDiagnosisGroup: [],

        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

     getlistAllDiagnosisGroup(){
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
            +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }


    getlistAllDiagnosisGroup(){
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
            +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {
        const {initialValues} = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idDiagnosisService;
        var url = '/diagnosisService/add';
        var bodyObject = {
            ...initialValues,
            ...values
        };
        if (id) {
            url = '/diagnosisService/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadDiagnosisService } = this.props;
        var id = this.props.idDiagnosisService;
       {
            const dataPromise = agent.DiagnosisServiceApi.getDiagnosisService(id);
            loadDiagnosisService(Promise.resolve(dataPromise))
        }

       

        this.getlistAllDiagnosisGroup();
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        var optionAllDiagnosisGroup=[];
        var dataListDiagnosisGroup = this.state.listAllDiagnosisGroup;
        if(dataListDiagnosisGroup){
            dataListDiagnosisGroup.map(item=>{
                optionAllDiagnosisGroup.push({label:item.name,value:item.id});
            })
        }
        var optionServiceType = [
            {label: "Xét Nghiệm" ,value: "XET_NGHIEM"},
            {label: "Chuẩn Đoán Hình Ảnh" ,value: "CHAN_DOAN_HINH_ANH"},
            {label: "Thăm Dò Chức Năng" ,value: "THAM_DO_CHUC_NANG"},
            {label: "Thủ Thuật - Phẫu Thuật" ,value: "THU_THUAT"},
        ]
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
                                <Field name="name" label="Tên dịch vụ Chỉ Định" placeholder="Nhập tên dịch vụ..." component={RenderInputWithDiv}></Field>
                                
                                <Field name="description" label="Mô tả"    placeholder="Nhập mô tả ..." row={3} component={RenderTextArea}></Field>
                                <Field name="diagnosisGroupId" label="Tên nhóm dịch vụ (*)" options={optionAllDiagnosisGroup} component={RenderSelect}></Field>
                                <Field name="price" label="Đơn giá" placeholder="Nhập đơn giá..." component={RenderMoneyFormat}></Field>
                                <Field name="serviceType" label="Loại Dịch Vụ BHYT" options={optionServiceType} component={RenderSelect}></Field>
                                
                                <Field name="insurance" label="Được Bảo Hiểm Y Tế?" component={RenderSwitch}></Field>
                                <Field name="maDvkt" label="Mã Dịch Vụ Kỹ Thuật" placeholder="Nhập mã dịch vụ..." component={RenderInputWithDiv}></Field>
                                <Field name="maGia" label="Mã Giá" placeholder="Nhập mã giá..." component={RenderInputWithDiv}></Field>
                                <Field name="donGiaBhyt" label="Đơn Giá BHYT" placeholder="Nhập đơn giá..." component={RenderMoneyFormat}></Field>
                                <Field name="quyetDinh" label="Quyết Định" placeholder="Nhập số quyết định..." component={RenderInputWithDiv}></Field>
                                <Field name="congBo" label="Ngày công bố (YYYYMMDD)" placeholder="Nhập ngày công bố..." component={RenderInputWithDiv}></Field>
                                <Field name="maCoSoKcb" label="Mã Cơ Sở KCB" placeholder="Nhập mã cơ sở khám chữa bệnh..." component={RenderInputWithDiv}></Field>
                                <Field name="loaiPttt" label="Loại PTTT" placeholder="Nhập loại PTTT..." component={RenderInputWithDiv}></Field>
                                <Field name="maVatTu" label="Mã Vật Tư" placeholder="Nhập Mã Vật Tư..." component={RenderInputWithDiv}></Field>
                                <Field name="maNhom" label="Mã Nhóm Dịch Vụ" placeholder="Mã Nhóm Dịch Vụ..." component={RenderInputWithDiv}></Field>
                                <Field name="donViTinh" label="Đơn Vị Tính" placeholder="Nhập Đơn Vị Tính..." component={RenderInputWithDiv}></Field>
                                <Field name="maMayXetNghiem" label="Mã Máy Xét Nghiệm" placeholder="Nhập Mã Máy Xét Nghiệm..." component={RenderInputWithDiv}></Field>

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
            form: 'ModalDiagnosisService',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDiagnosisService)));
