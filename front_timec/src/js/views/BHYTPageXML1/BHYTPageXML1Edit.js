import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { RenderDatePicker } from '../../components/formInputs';
import agent from '../../services/agent';

const validate = values => {
    const errors = {};
    return errors;
}

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "BHYTPageXML1Edit", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })

});
class BHYTPageXML1Edit extends React.Component {
    constructor() {
        super();
        this.state = {
            defauXML: '<?xml version="1.0" encoding="utf-8"?>',
            dataXML: null,
            listAllPatient: null,
        }
    };

    getlistAllPatient() {
        let setStateInRequest = (list) => { this.setState({ listAllPatient: list }) }
        return agent.PatientApi.listAllPatient().then(function (res) {
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
    componentWillMount() {
        // var id = this.props.match.params.id;
        // console.log(id);

        this.getlistAllPatient();
    };

    componentDidUpdate() {

    }

    handleCreateXML() {


    }

    handleDowload() {
        var myData = '<email><to>Test</to><from>Test1</from><heading>Test email</heading><body>Email regards to xml data parsing in React</body></email>'
        const fileName = "file";
        const json = this.state.defauXML + myData;
        const blob = new Blob([json], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".xml";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        const { dataXML } = this.state;
        const { handleSubmit } = this.props;
        // let parser = new xml2js.Parser();
        const {listAllPatient} = this.state;

        var optionPatient = [];
        if(listAllPatient){
            listAllPatient.map( item => {
                optionPatient.push( { label : item.fullName, value : item.id } )
            })
        }
        return (

            <div className="content-wrapper" >
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href="/"><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active"><a href="">Quản Lý Thanh Toán</a></li>
                            <li className="active">Phiếu Thanh Toán</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                {dataXML ? <button className="btn bg-teal" onClick={() => this.handleDowload()}> Tải file XML</button> : null}
                                {/* <a className="btn bg-teal"
                                    href={`data:text/xml;charset=utf-8,${encodeURIComponent(
                                        // XML.stringify(YOURJSON)
                                        parser.parseString(YOURJSON)
                                    )}`}
                                    download="filename.xml"
                                >
                                    {`Download Json`}
                                </a> */}
                            </div>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleCreateXML)} >
                                                <div className="row">
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                    <div className="col col-md-6" >
                                                        <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        <label> (....asd..)</label>
                                                    </div>
                                                </div>
                                                <div className="col col-md-1 pull-right" style={{ paddingLeft: "10px", paddingTop: "27px" }}>
                                                    {!dataXML ? <button type="submit " className="btn bg-success btn-xlg" >Tạo XML</button> : null}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'BHYTPageXML1Edit',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(BHYTPageXML1Edit)));