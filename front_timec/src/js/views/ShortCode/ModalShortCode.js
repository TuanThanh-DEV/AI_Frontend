import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_SHORTCODE } from './action-types';

const validate = values => {
    const errors = {};
    if (!values.shortcode) {
        errors.shortcode = 'Vui lòng nhập Code.';
    }
    if (!values.replaceText) {
        errors.replaceText = 'Vui lòng nhập Replace Text.';
    }
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.shortCodeReducer.updatingShortCode,
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    };
};
const mapDispatchToProps = dispatch => ({
    loadShortCode: (payload) =>
        dispatch({ type: LOAD_UPDATING_SHORTCODE, payload: payload })
});



class ModalShortCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllPersonel: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }

    componentWillMount() {
        const { loadShortCode, currentUser } = this.props;
        var id = this.props.idShortCode;

        const dataPromise = agent.ShortCodeApi.getShortCode(id);
        loadShortCode(Promise.resolve(dataPromise))

        this.getlistAllUser();
    }
    getlistAllUser() {
        let setStateInRequest = (list) => { this.setState({ listAllPersonel: list }) }
        return agent.UserApi.listAllPersonel().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }


    handleAdd(values) {
        const { currentUser } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idShortCode;
        var url = '/shortCode/add';
        var bodyObject = {
            userId: currentUser.id,
            shortcode: values.shortcode,
            replaceText: values.replaceText,



        };
        if (id) {
            url = '/shortCode/update';
            bodyObject.id = id;
            bodyObject.userId = currentUser.id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {

                toast.info("Thành Công! ", { autoClose: 15000 });
                onHide();
            } else {

                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {

        const { handleSubmit, submitting, title, invalid, currentUser } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };

        var id = this.props.idShortCode;

        var optionGender = [

            { label: "Nam ", value: "MALE" },
            { label: "Nữ ", value: "FEMALE" },
            { label: "Khác ", value: "OTHER" },
        ]

        var optionUser = [];
        optionUser.push({ label: currentUser.id, value: currentUser.id });
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
                                {/* <Field  disabled={true} name="userId" label="USER" options={optionUser} component={RenderSelect}></Field> */}
                                <Field name="shortcode" label="Mã Lệnh Viết Tắt" placeholder="Nhập mã lệnh viết tắt ..." component={RenderInputWithDiv}></Field>
                                <Field name="replaceText" label="Lệnh tương ứng  " placeholder="Nhập Lệnh đầy đủ ..." component={RenderInputWithDiv}></Field>
                                <div className="text-right">
                                <button style={{marginRight:"20px"}} type="button" className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
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
            form: 'ModalShortCode',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalShortCode)));
