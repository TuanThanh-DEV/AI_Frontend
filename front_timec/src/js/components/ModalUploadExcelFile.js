import React from "react";
import { connect } from "react-redux";
import agent from '../services/agent';
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import {RenderInputMultiFile} from "./formInputs";
import { translate } from "react-i18next";
import { LoadingScreen } from "./commonWidgets";




class ModalUploadExcelFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showResults = this.showResults.bind(this);
    }

    componentWillMount() { }

    showResults(values) {
        const { onHide } = this.props;
        var url = this.props.urlToImportExcel;
        var formData = new FormData();
        var files = values.uploadfile;
        for (var index = 0; index < files.length; index++) {
            formData.append("file", files[index]);
        }

        return agent.asyncRequests.post(url, formData).then(
            function (res) {
                var result = res.body;
                if (result) {

                    alert("Import Excel Thành Công!");
                    onHide();

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
                        Upload File {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {submitting ? <LoadingScreen /> :
                        <form onSubmit={handleSubmit(this.showResults)}>

                            <Field
                                name="uploadfile"
                                accept="*"
                                label="Select files"
                                defaultValue={null}
                                component={RenderInputMultiFile}
                            />
                            <div className="text-right">
                                <button type="button" className="btn btn-link" onClick={onHide} >Hủy</button>
                                <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Thực Hiện</button>
                            </div>
                        </form>
                    }
                </Modal.Body>
            </Modal>


        return newModal;
    }
}

export default translate("translations")(
    (
        reduxForm({
            form: "ModalUploadExcelFile",
            destroyOnUnmount: true,
            enableReinitialize: true
        })(ModalUploadExcelFile)
    )
);
