import React from "react";
import { Modal } from "react-bootstrap";
import { translate } from "react-i18next";
import { toast } from 'react-toastify';
import { Field, reduxForm } from "redux-form";
import agent from "../../services/agent";
import { connect } from 'react-redux';
import { LoadingScreen } from "../../components/commonWidgets";
import { RenderInputMultiFile, RenderSelect } from "../../components/formInputs";


const validate = values => {
    const errors = {};
    if (!values.fromDrugStoreId) {
        errors.fromDrugStoreId = 'Vui lòng chọn kho xuất!';
    };

    if (!values.fromDrugStoreId) {
        errors.toDrugStoreId = 'Vui lòng chọn kho nhập!';
    };

    if (values.fromDrugStoreId && values.fromDrugStoreId && values.fromDrugStoreId == values.toDrugStoreId) {
        errors.toDrugStoreId = 'Kho nhập phải khác kho xuất!';
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

class ModalExcelMoveStoreForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrugStore : null
        };
        this.showResults = this.showResults.bind(this);
    }

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
        this.getlistAllDrugStore();
    }

    showResults(values) {
        const { onHide } = this.props;
        var formData = new FormData();
        var files = values.uploadfile;
        for (var index = 0; index < files.length; index++) {
            formData.append("file", files[index]);
        }
        var fromDrugStoreId = values.fromDrugStoreId ? values.fromDrugStoreId : null;
        var toDrugStoreId = values.toDrugStoreId ? values.toDrugStoreId : null;
        if(fromDrugStoreId && toDrugStoreId){
            return agent.asyncRequests.post("/moveStoreForm/importMoveStoreForm?fromDrugStoreId="
            + fromDrugStoreId + "&toDrugStoreId=" + toDrugStoreId, formData).then(
                function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        onHide();
                        toast.info("Đã tạo phiếu xuất kho và nhập kho tương ứng. Vui lòng kiểm tra trạng thái của các phiếu này.");
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, {
                            autoClose: 15000
                        });
                    }
                },
                function (err) {
                    toast.error(
                        "Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.",
                        { autoClose: 15000 }
                    );
                }
            );
        }
    }
    render() {
        const { onHide, handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { show: this.props.show, onHide: this.props.onHide, submitting: this.props.submitting };
        var newModal = null;
        const dataDrugStore = this.state.listAllDrugStore;
        var optionDrugStore = [];
        if(dataDrugStore){
            dataDrugStore.map(item=>{
                optionDrugStore.push({label:item.name + ' / ' +(item.hospital ? item.hospital.name : null ), value:item.id});
            })
        }

        newModal =
            <Modal {...modalConfig} aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">
                        Nhập Phiếu Chuyển Kho Excel
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {submitting ? <LoadingScreen /> :
                        <form onSubmit={handleSubmit(this.showResults)}>
                            <Field name="fromDrugStoreId" label="Xuất Chuyển Từ Kho (*)"    placeholder="Chọn quầy thuốc..." options={optionDrugStore} component={RenderSelect}></Field>
                            <Field name="toDrugStoreId" label="Nhập Đến Kho (*)"    placeholder="Chọn quầy thuốc..." options={optionDrugStore} component={RenderSelect}></Field>
                            <Field
                                name="uploadfile"
                                accept="*"
                                label="Chọn file!"
                                defaultValue={null}
                                component={RenderInputMultiFile}
                            />
                            <br/>
                            <div className="row">
                               <div className="col-md-6">
                                    <div className="text-left" style={{paddingTop:"20px"}}>
                                        {/* <a to="/front_timec/src/assets/teamplateExcel/danhsachthuocnhapkho.xlsx" target="_blank" download>Lấy File mẫu</a> */}
                                        <a href="assets/teamplateExcel/danhsachthuocnhapkho.xlsx" target="_blank" download><span className="glyphicon glyphicon-save" style={{ color: '#3cb371' }} > Lấy File Chuyển Kho Mẫu</span></a>
                                    </div>
                               </div>
                                <div className="col-md-6">
                                    <div className="text-right" style={{paddingTop:"20px"}}>
                                        <button type="button" className="btn btn-orange" onClick={onHide} >Hủy</button>
                                        <button type="submit" className="btn bg-success" disabled={submitting}>Tạo Chuyển Kho</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    }
                </Modal.Body>
            </Modal>


        return newModal;
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalExcelMoveStoreForm',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalExcelMoveStoreForm)));
