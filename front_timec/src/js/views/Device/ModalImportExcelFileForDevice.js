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

class ModalImportExcelFileForDevice extends React.Component {
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
    }

    showResults(values) {
        const { onHide, currentUser } = this.props;
        var url = "/device/importByExcel";
        var formData = new FormData();
        var files = values.uploadfile;
        for (var index = 0; index < files.length; index++) {
            formData.append("file", files[index]);
        }
       
        return agent.asyncRequests.post(url + "?createUserId=" +currentUser.id, formData).then(
            function (res) {
                var result = res.body.resultData;
                if (result) {
                    window.location.href = "/listDevice" ;
                    onHide();
                    toast.error("Nhập file thành công!", {
                        autoClose: 15000
                    });
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
    render() {
        const { onHide, handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { show: this.props.show, onHide: this.props.onHide, submitting: this.props.submitting };
        var newModal = null;

        newModal =
            <Modal {...modalConfig} aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">
                        Nhập Danh Sách Thiết Bị Bằng {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {submitting ? <LoadingScreen /> :
                        <form onSubmit={handleSubmit(this.showResults)}>
                            
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
                                        <a href="assets/teamplateExcel/MauNhapKhoThietBi.xlsx" target="_blank" download><span className="glyphicon glyphicon-save" style={{ color: '#3cb371' }} > Lấy File mẫu</span></a>
                                    </div>
                               </div>
                                <div className="col-md-6">
                                    <div className="text-right" style={{paddingTop:"20px"}}>
                                        <button type="button" className="btn btn-orange" onClick={onHide} >Hủy</button>
                                        <button type="submit" className="btn bg-success" disabled={submitting}>Nhập Kho</button>
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
            form: 'ModalImportExcelFileForDevice',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalImportExcelFileForDevice)));
