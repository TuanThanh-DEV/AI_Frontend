import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderInputWithDiv, RenderTextArea, RenderTextAreaShortCode } from '../../components/formInputs';
import agent from '../../services/agent';

const selector = formValueSelector("ModalChooseICD");

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
    };
    return {
        initialValues: updateValue,
        analysisSelector: selector(state, "analysis"),
    };
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalChooseICD", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalChooseICD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllICD: [],
            idICD : null,
            icdCode : ''
        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.updateListICD = this.updateListICD.bind(this);

    }

    componentWillMount() {
    }

    updateListICD(values) {

        let setStateInRequest = (list) => { this.setState({ listAllICD: list }) }
        return (agent.asyncRequests.get('/icd/getBySearch?search=' + encodeURIComponent(values.search)).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }))
    }

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide, analysisSelector, icdType } = this.props;
        const { idICD, icdCode} = this.state;
        // event.preventDefault();
        onHide(analysisSelector, idICD, icdType,icdCode);
        destroy();
    }


    handleChangeIcd(icdId) {

        var icdString = "";
        var code = ""
        var dataListIcd = this.state.listAllICD;
        for (var i = 0; i < dataListIcd.length; i++) {
            if (dataListIcd[i].id == icdId) {
                icdString = dataListIcd[i].code + " - " + dataListIcd[i].name;
                code = dataListIcd[i].code;
                break;
            }
        }

        const { updateField, analysisSelector } = this.props;
        if (analysisSelector) {
            updateField("analysis", analysisSelector + ", " + icdString);
        } else {
            updateField("analysis", icdString);
        }
        const codes = this.state.icdCode;
        this.setState( {
            idICD : icdId,
            icdCode : codes + ", "+ code
        })
    }



    render() {

        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "lg", onHide: this.props.onHide, submitting: this.props.submitting };

        const dataICD = this.state.listAllICD;
        if (!dataICD) {
            return null;
        }
        var rows = dataICD.map((item, index) => {
            return (
                <tr >
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <a onClick={() => this.handleChangeIcd(item.id)}><i className="icon-pencil"></i>Chọn</a>
                    </td>
                </tr>);
        });

        var newModal = null;

        newModal =
            <div style={{ width: '30%' }}>
                <Modal {...modalConfig} aria-labelledby="contained-modal-title-lg"  >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="">
                            <div className="row">
                                <div className="panel-flat">
                                    <form className="main-search" role="form" onSubmit={handleSubmit(this.updateListICD)}>

                                        <div className="col-md-8">
                                            <Field name="search" placeholder="Tìm Theo Tên, Code ICD...." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="submit" className="btn bg-success btn-xlg" disabled={submitting} >Tìm Kiếm</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="button" className="btn bg-success btn-xlg" onClick={this.handleHideAndClear} >Xong</button>
                                        </div>
                                    </form>

                                </div>

                            </div>
                            <div className="panel-flat">
                                <Field name="analysis" rows="5" label="Chẩn Đoán" placeholder="Có thể dùng gõ tắt..."
                                    component={RenderTextArea}></Field>

                            </div>
                            <div className="row">
                            {submitting ? <LoadingScreen /> :
                                <div className="panel panel-flat">
                                    <div class="table-wrapper-scroll-y my-custom-scrollbar">

                                        <table class="table table-bordered table-striped mb-0">
                                            <thead>
                                                <tr className="bg-teal">
                                                    <th data-toggle="true">Code</th>
                                                    <th data-toggle="true">Tên</th>
                                                    <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows}
                                            </tbody>
                                        </table>
                                    </div>
                                </div> }
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalChooseICD',
            destroyOnUnmount: true,
            enableReinitialize: true,

        })(ModalChooseICD)));
