import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

const validate = values => {
    const errors = {};
    return errors;
};


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class BHYTList extends React.Component {
    constructor() {
        super();
        this.state = {
            listDrug: null,
            isDrugModalShown: false,
            objectdrug: null,
            idDrug: "",
            optionSupplier: [],
            listAllDrug: [],
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDrugModalShown: false });
            this.updateListDrug();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isDrugModalShown: true,
            idDrug: id
        });
    }



    handleLinkBHYT(textLink) {
        if(textLink == "xml1"){
            window.location.href = "/apiBHYT-" +textLink;
        }
        if(textLink == "xml2"){
            window.location.href = "/apiBHYT-" +textLink;
        }
        if(textLink == "xml3"){
            window.location.href = "/apiBHYT-" +textLink;
        }
        if(textLink == "xml4"){
            window.location.href = "/apiBHYT-" +textLink;
        }
        if(textLink == "xml5"){
            window.location.href = "/apiBHYT-" +textLink;
        }

    }
    componentWillMount() {

    };


    render() {

        const data = this.state.listDrug;

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">API BHYT</li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">
                                <div className="panel-body">
                                    <div className="col-md-12">
                                        <div className="col-md-1"></div>

                                        <div className="col-md-2">
                                            <button className="btn btn-success" onClick={() => this.handleLinkBHYT("xml1")}>DS file Tổng Hợp</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-success" onClick={() => this.handleLinkBHYT("xml2")}>DS file HS Chi Tiếc Thuốc</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-success" onClick={() => this.handleLinkBHYT("xml3")}>DS file HS Chi Tiết DVKT</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-success" onClick={() => this.handleLinkBHYT("xml4")}>DS file HS Chi Tiết Cận Lâm Sàn</button>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-success" onClick={() => this.handleLinkBHYT("xml5")}>DS file HS Chi Tiết Diễn Biến</button>
                                        </div>

                                        <div className="col-md-1"></div>

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
            form: 'BHYTList',
            destroyOnUnmount: false,
            enableReinitialize: true,
            validate
        })(BHYTList)));