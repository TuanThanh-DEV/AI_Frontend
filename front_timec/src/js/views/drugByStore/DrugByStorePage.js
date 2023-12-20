import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';

const validate = values => {
    const errors = {};
    return errors;
};


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
   
});

class DrugByStorePage extends React.Component {
    constructor() {
        super();
        this.state = {
            listDrugStore : null,
            drugStoreId : null
        }   
    };

    getAllDrugStore(){

        let setStateInRequest = (list) => { this.setState({ listDrugStore: list }) }
        return agent.DrugStoreApi.listAllDrugStore(
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
        
        
    }
    componentWillMount() {
        this.getAllDrugStore();
    };

    handleChooseDrugStore(id){
        this.setState({
            drugStoreId :id
        })
    }

    handleCreatePrescription() {
        const { currentUser } = this.props;
        var idStore = this.state.drugStoreId;
        return agent.asyncRequests.get("/prescription/changeContextAndNewPrescription?currentUserId=" + currentUser.id + "&drugStoreId=" + idStore
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                window.location.href = "/drugByStoreRetail?id=" + result.id +'&store=' + idStore;
            } else {
                toast.error("Không thể tạo mới đơn khám bệnh cho bán thuốc ngoài luồng ( Đơn bán lẻ )! Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    render() {
        const dataDrugStore = this.state.listDrugStore;
   
        var optionDrugStore = [];
        if(dataDrugStore){
            dataDrugStore.map(item =>{
                optionDrugStore.push({label: item.name, value: item.id})
            })
        }
        var rows = [];
       
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Thuốc Theo Kho</li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <div className="panel panel-flat">
                        <div className="panel-body">
                            <div className="pull-left col-md-6"  >
                                <Field label="Kho Thuốc" name="drugStoreId" placeholder="Chọn Kho Thuốc"
                                        options={optionDrugStore} component={RenderSelect}
                                        onChangeAction={(value) => this.handleChooseDrugStore(value)}>
                                </Field>    
                            </div>
                            <div className="pull-left col-md-6" style={{paddingTop :'28px'}} >
                                <button className="btn btn-success" onClick={() => this.handleCreatePrescription()}>Tạo Đơn Lấy Thuốc</button>
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
            form: 'DrugByStorePage',
            destroyOnUnmount: false,
            enableReinitialize: true,
            validate
        })(DrugByStorePage)));