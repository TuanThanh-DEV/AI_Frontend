import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { RenderSelect } from '../../components/formInputs';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormatterUtils } from '../../utils/javascriptUtils';
import DrugCabinetRow from './DrugCabinetRow';
import ModalStockCabinet from './ModalStockCabinet';
import ModalDrugCabinet from './ModalDrugCabinet';
import SecuredComponent from '../../components/SecuredComponent';
const validate = values => {
    const errors = {};
    return errors;
};


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class DrugCabinetListAll extends React.Component {
    constructor() {
        super();
        this.state = {
            drugCabinets : null, 
            isShowModalAddStockCabinet : false,
            isShowModalDrugCabinet : false,
        }
        this.handleShowModalOutputCabinet = this.handleShowModalOutputCabinet.bind(this);
        this.handleShowModalAddStockCabinet = this.handleShowModalAddStockCabinet.bind(this);
        this.handleHidemodal = () => {
            this.setState({ 
                isShowModalDrugCabinet : false
             });
             this.getStockCabinet();
        };

    };
    
    handleShowModalDrugCabinet(){
        this.setState({
            isShowModalDrugCabinet : true
        });
       
    }

    handleShowModalAddStockCabinet(value){
        this.setState({
            isShowModalAddStockCabinet : value
        });
    }

    handleShowModalOutputCabinet(){
        this.setState({
            isShowModalAddStockCabinet : true
        });
    }
    getStockCabinet(){
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        if (!search) {
            search = "";
        }
        let setStateInRequest = (list) => { this.setState({ drugCabinets: list }) }
        return agent.DrugCabinetApi.list(search,page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        this.getStockCabinet();
    };

    render() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        const data = this.state.drugCabinets;
        let isShowModalAddStockCabinet = this.state.isShowModalAddStockCabinet;
        if (!page) {
            page = 1;
        }
        var rows = [];
        if(!data)
        {
            return null;
        }else{
        
        rows = data.content.map( (item,index) =>{

                return <DrugCabinetRow key={"DrugCabinetRow"+index} drugCabinets={item} isShowModalAddStockCabinet={isShowModalAddStockCabinet} getStockCabinet={() => this.getStockCabinet()}></DrugCabinetRow>
               
            });
        };
       
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Thuốc</li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <SecuredComponent allowedPermission="admin.drugCabinet.create">
                        <div className="row" style={{paddingBottom : '10px'}}>
                            <div className="heading-btn-group" style={{paddingRight : '10px'}}>
                                <button className="btn bg-teal pull-right"  onClick={() => this.handleShowModalDrugCabinet()}>Thêm Tủ Thuốc </button>
                            </div>
                        </div>
                    </SecuredComponent>
                    <div className="col-md-12">
                        <div className="panel panel-flat">
                            <div className="panel-body">
                                <form className="main-search" role="form">
                                    <div className="input-group content-group">
                                        <div className="has-feedback has-feedback-left">
                                            <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo tên thuốc..." name="search" defaultValue={search} autoFocus={true} />
                                            <div className="form-control-feedback">
                                                <i className="icon-search4 text-muted text-size-base"></i>
                                            </div>
                                        </div>
                                        <div className="input-group-btn">
                                            <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <table className="table table-xxs table-bordered">
                            <thead>
                                <tr className="bg-teal">
                                    <th></th>
                                    <th colSpan="1" data-toggle="true">Tên Tủ Thuốc</th>
                                    <th colSpan="1" data-toggle="true">Chuyên Khoa</th>
                                    <th colSpan="6" data-toggle="true" ><center>Mô Tả</center></th>
                                    
                                    <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                        <TablePagination data={data} baseUrl="/listAllDrugCabinet"/>
                    </div>
                        {isShowModalAddStockCabinet ? <ModalStockCabinet handleShowModalAddStockCabinet={() => this.handleShowModalAddStockCabinet()}></ModalStockCabinet> : null}
                        
                </div>
            </div>

        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'DrugCabinetListAll',
            destroyOnUnmount: false,
            enableReinitialize: true,
            validate
        })(DrugCabinetListAll)));