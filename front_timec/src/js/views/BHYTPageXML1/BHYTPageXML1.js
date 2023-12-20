import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({


});
class BHYTPageXML1 extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    };


    componentWillMount() {
    };

    handleLinkBHYTXML1Edit(){
        window.location.href = "/apiBHYT-xml1-edit/" + 'create'
    }
    render() {

        return (

            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Thanh Toán</li>
                            <li className="active">Phiếu Thanh Toán</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <button className="btn bg-teal" onClick={() => this.handleLinkBHYTXML1Edit()}>Thêm Mới</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(BHYTPageXML1));