import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment';

class PrescriptionRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPrescriptionItem : false,
            listPrescriptionItem: null,
            countCart : 0
        }
        this.handleShowPrescriptionItem = this.handleShowPrescriptionItem.bind(this);
        this.getListPrescriptionItemById = this.getListPrescriptionItemById.bind(this);
        this.handleChooseAll = this.handleChooseAll.bind(this);
    };

    handleShowPrescriptionItem(prescriptionId){
        let isShowPrescriptionItem  = this.state.isShowPrescriptionItem;
        isShowPrescriptionItem = !this.state.isShowPrescriptionItem;
        this.setState({isShowPrescriptionItem:isShowPrescriptionItem})
        if(isShowPrescriptionItem){
            this.getListPrescriptionItemById(prescriptionId);
        }
    }
    getListPrescriptionItemById(prescriptionId){
        let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list }) }
        return (agent.asyncRequests.get("/prescriptionItem/listFindByPrescriptionId?prescriptionId="+prescriptionId).then(function(res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function(err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))
    }
    handleChooseAll(prescriptionIdOld){
        console.log(this.state.countCart)
        var currentPrescriptionId = this.props.prescriptionId;
        const {onHide} =  this.props;
        var _this = this;
        if(currentPrescriptionId != 'new'){
            let setStateInRequest = (number) => { this.setState({ countCart: this.state.countCart + number }) }
            return (agent.asyncRequests.get("/prescription/chooseDrugAll?prescriptionIdOld="+prescriptionIdOld +"&currentPrescriptionId=" + currentPrescriptionId).then(function(res) {
                var result = res.body;
                if (result) {
                    setStateInRequest(result);
                    _this.props.handleSumNumberDrugChoose(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                        autoClose: 5000
                    });
                }
            }, function(err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                    autoClose: 15000
                });
            }))
        }else{
            toast.info("Vui Mời Bệnh Nhân trước khi chọn Thuốc!",  {autoClose: 5000});
            onHide();
        }
        
    }
    
    componentWillMount() {
    };
    
    render() {
        const { prescriptionObject, key} = this.props;
        var isShowPrescriptionItem = this.state.isShowPrescriptionItem;
        var listPrescriptionItem = this.state.listPrescriptionItem;
        
            if(listPrescriptionItem){
            var  PrescriptionRows = listPrescriptionItem.map(item=>{
                    return (
                        <tr key={"listPrescriptionItem_" + item.id}>
                            <td colSpan="6">
                                <div style={{paddingLeft:"30px"}}>
                                    <p style={{display:"inline", float:"left"}}> Tên Thuốc:  {item.drug ? item.drug.name  + " " + item.drug.hamLuongBHYT: null }</p>
                                    <p style={{display:"inline", float:"left", paddingLeft:"20px"}}> Hướng Dẫn: {item.instruction}</p>
                                </div>
                            </td>
                        </tr>
                    );
                })
            };
            return (
                [<tr key={"prescriptionObject_"+prescriptionObject.id}>
                <td style={{textAlign:"center"}}> 
                    {isShowPrescriptionItem ? <button className="bg-info-600 icon-dash"  onClick={() => this.handleShowPrescriptionItem(prescriptionObject.id)}></button> 
                    : 
                    <button className="bg-info-600 icon-plus22"  onClick={() => this.handleShowPrescriptionItem(prescriptionObject.id)}></button>}
                 </td>
                <td>{prescriptionObject.id} {prescriptionObject.insuranceTypeId && prescriptionObject.insuranceTypeId > 1 && prescriptionObject.bhytPrescriptionId ? ' - BHYT '  : '' } </td>
                <td>{prescriptionObject.finishTime ? moment(prescriptionObject.finishTime).format("DD-MM-YYYY") : ""}</td>
                <td>{prescriptionObject.user ? prescriptionObject.user.fullName :  "N/A"}</td>
                <td>{prescriptionObject.icd ? prescriptionObject.icd.name : null}</td>
                <td>
                    <div>
                        <button className="btn btn-info" onClick={() => this.handleChooseAll(prescriptionObject.id)}> Dùng Lại</button>
                    </div>
                </td>
            </tr>].concat(isShowPrescriptionItem ? PrescriptionRows : null)
        );
    }
}
export default translate('translations')(PrescriptionRow);