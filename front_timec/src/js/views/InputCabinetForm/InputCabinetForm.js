import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { FormatterUtils } from '../../utils/javascriptUtils';
import TableInputCabinet from './TableInputCabinet';

const validate = values => {
    const errors = {};
    return errors;
}
var today = new Date();

const mapStateToProps = state => {
 
    return {
        currentUser: state.common.currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "InputCabinetForm", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class InputCabinetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
    
        }
        this.handleHidemodal = () => {
            this.setState({
               
            });
        }
        this.handleUpdate  = this.handleUpdate.bind(this);
     };

    componentWillMount() {
   
    }

    handleUpdate(values) {
        var id = this.props.match.params.id;
        var url = '/inputForm/updateNote';
        var bodyObject = {
            id: id,
            reducedAmountSupplier: values.reducedAmountSupplier,
            invoiceAmountSupplier : values.invoiceAmountSupplier,
            note: values.note,
        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
              toast.info("Lưu Thành Công.", {autoClose: 1000});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    
    }

    render() {
        const {  currentUser} = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting,
            idPrescription : this.props.idPrescription
        };
        var newModal = null;
        newModal =
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Phiếu Nhập Kho</li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="panel panel-flat">
                            <div className="panel-body">
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            <div className="tabbable">
                                                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component bg-teal" style={{marginBottom:"0"}}>
                                                    <li className="active">
                                                        <a href="#default-justified-tab1" data-toggle="tab"><i className="icon-menu6"></i> Danh Sách Thuốc</a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content">
                                                    <TableInputCabinet currentUser={currentUser} 
                                                    inputCabinetFormId={this.props.match.params.id}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'InputCabinetForm',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(InputCabinetForm)));
