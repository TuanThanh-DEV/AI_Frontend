import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { RenderInputWithDiv } from '../../components/formInputs';
import agent from '../../services/agent';
import ModalDrug from '../Drug/ModalDrug';

const validate = values => {
    const errors = {};
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
    };
    return {
        initialValues: updateValue,
    };
};

const mapDispatchToProps = dispatch => ({

        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "FormSearchBarcode", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class FormSearchBarcode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listDrug: null,
            isShowModalDrug : false,
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleShowModalDrug = this.handleShowModalDrug.bind(this);
        this.handleHidemodal = (result) => {
            this.setState({
                isShowModalDrug : false,
            });
            if(result == 'success'){
                window.location.reload(true);
            }
        };
    };
    handleAdd(drug) {
        const { drugStoreId, inputFormId,destroy} = this.props;
        var url = "/inputStock/addByInputForm";
        
        var bodyObject = {
            inputFormId: inputFormId,
            drugId : drug.id,
            drugStoreId : drugStoreId,
            salePrice : drug.salePrice,
            batchBarcode: drug.barCode,
            inputAmount: 0,
            remainAmount: 0,
        };
        return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    destroy();
                    window.location.reload(true);
                } else {
                    // toast.error("Mã Thuốc Không Đúng!");
                    toast.error(res.body.errorMessage);
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    
    handleSearch(values){
        let setStateInRequest = (list) => { this.setState({ listDrug: list }) }
        return agent.asyncRequests.get("/drug/getListByBarcode?barcode=" + values.barcode
        ).then(function (res) {
            var result = res.body.resultData;
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
        const {destroy} = this.props;
        destroy();
    };
    handleShowModalDrug(){
        this.setState({
            isShowModalDrug : true
        })
    }
    
    render() {
        const {handleSubmit, submitting} = this.props;

        var dataDrugs = this.state.listDrug;
        var rows = null;
        var bodyRow = null;
        if(dataDrugs){
            if(dataDrugs.length > 0 ){
                rows = dataDrugs.map( (item, index) => {
                    return (<tr key={"stock_search_" + index} >
                    <td>{(index+1)}</td>
                    <td >{item.barCode}</td>
                    <td >{item.name + " (" + item.uom + ")"}</td>
                    <td> 
                        <button className="btn btn-info" onClick={ () => this.handleAdd(item)}> Chọn </button>
                    </td>
                </tr>)
                })
                bodyRow = <table className="table table-xxs table-bordered">
                <thead>
                    <tr className="bg-teal" >
                        <th rowSpan="2" width="5%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '12%' }}>Mã Lô</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '12%' }}>Tên Thuốc</th>
                        <th rowSpan="2" width="5%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            }else{
                bodyRow = <div> 
                    <div>
                        <span className="help-block has-error" >Mã Này chưa có trong hệ thống!</span> <br/>
                    </div>
                    <div>
                        <button type="button" className="btn bg-teal" onClick={this.handleShowModalDrug}>Thêm Loại Thuốc Mới</button>
                    </div>
                    
                    
                </div>
            }
        }


        return (
            <div className="row">
                <div className="panel panel-flat">
                    <div className="panel-body">
                        <form className="form-horizontal" role="form"  onSubmit={handleSubmit(this.handleSearch)}>
                            <div className="form-group">
                                <div className="col-md-11">
                                    <Field name="barcode" label="Mã lô, tên Thuốc" placeholder="Nhập mã lô, tên thuốc ... " component={RenderInputWithDiv}></Field>
                                </div>
                                <div className="col-md-1" style={{paddingTop : '28px'}}>
                                    <button type="submit"  className="btn bg-success" disabled={submitting}> Tìm</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {this.state.isShowModalDrug ? <ModalDrug
                    inputFormId={this.props.inputFormId}
                    title="Thông Tin Thuốc"
                    show={this.state.isShowModalDrug}
                    onHide={this.handleHidemodal}
                    idPatient={this.state.idPatient}
                    isAddInForm={true}
                    drugStoreId={this.props.drugStoreId}
                     /> : null
                }
                <div class="content">
                    {bodyRow}
                </div>
            </div>
            
        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'FormSearchBarcode',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(FormSearchBarcode)));