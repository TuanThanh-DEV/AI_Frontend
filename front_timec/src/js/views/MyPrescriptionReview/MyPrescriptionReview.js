import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { LoadingScreen } from '../../components/commonWidgets';
import ModalMark from '../MyPrescriptionReview/ModalMark';

const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser
    }};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload: payload, token: token, skipTracking: true }),
    onRedirect: () =>
        dispatch({ type: REDIRECT }),
    fireRedirect: (url) =>
        dispatch({ type: FIRE_REDIRECT, toUrl: url }),

});

class MyPrescriptionReview extends React.Component {
    constructor() {
        super();
        this.state = {
            listPrescriptionReview: null,
            isCashWidrawalModalShown:false,
            cashWidrawalDto: null,
            isShowButtonOpenPrescriptionReview: true,
            objectcashDesk: null, 
            isPrescriptionReviewModalShown: false,
            isPrescriptionReviewMark: false,
            idPrescriptionReview: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleShowmodalMark=this.handleShowmodalMark.bind(this);
        this.handleHidemodal = () => {
        this.getPrescriptionReview(),
        this.setState({ isCashWidrawalModalShown: false,
            isPrescriptionReviewMark: false,
            isPrescriptionReviewModalShown :false });
        };
    };
    handleShowmodal(id) {
        this.setState({
            isPrescriptionReviewModalShown: true,
            idPrescriptionReview: id
        });
    }
    handleShowmodalMark(id) {
        this.setState({
            isPrescriptionReviewMark: true,
            idPrescriptionReview: id
        });
    }
    
    getPrescriptionReview() {
       
         let setStateInRequest = (list) => {
            this.setState({
                listPrescriptionReview: list
            })
        }
        return (agent.asyncRequests.get("/prescriptionReview/listAll").then(function(res) {
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
    componentWillMount() {
        this.getPrescriptionReview()
    };
    render() {
        const dataMyPrescriptionReview = this.state.listPrescriptionReview;
        var isShowButtonOpenPrescriptionReview = this.state.isShowButtonOpenPrescriptionReview;
        const {currentUser} = this.props;
        if (!dataMyPrescriptionReview) {
         return <LoadingScreen></LoadingScreen>
        }else{
            var rowsMyPrescriptionReview = dataMyPrescriptionReview.map(item => {
           
                if(currentUser.id == item.reviewer.id && item.finishDate == null){
                    isShowButtonOpenPrescriptionReview = false
                return (
                    <div class="col-lg-4 col-md-6">
                        <div class="thumbnail">
                        <div className="content-group">
                        <div className="text-center">
                        <div className="content-group-sm">
                        <h5 className="text-semibold no-margin-bottom">
                            Phiếu Khám: {item.prescription?(item.prescription.user.fullName+' - ' + item.prescription.department.name):null} & Mã ICD: {item.prescription.icd ? item.prescription.icd.code : null}
                            </h5>
                            <span className="display-block">Thời Gian Tạo & Hạn Chấm Điểm <br /><small style={{color:"gray"}} className="display-block">{moment(item.createdDate).format("DD/MM/YYYY")} - {moment(item.dueDate).format("DD/MM/YYYY")}</small></span>
                        </div>
                        </div></div>
                        <div class="thumb thumb-rounded">
                            <div class="caption-overflow">
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-xs-6">
                                <div class="thumb thumb-rounded">
                                <img src="/assets/images/anonymous-user.png" style={{width:"80px",height:"80px"}} alt="" /></div>
                                <span class="text-muted text-size-small">{item.doctor ? item.doctor.fullName : "N/A"}<br/>(Bác Sĩ)</span>
                            </div>
                            <div class="col-xs-6">
                            <div class="thumb thumb-rounded">
                            <img src="assets/images/benhnhan.jpg" style={{width:"80px",height:"80px"}} alt="" /></div>
                                <span class="text-muted text-size-small">{item.prescription.patient ? item.prescription.patient.fullName : null }<br/>(Bệnh Nhân)</span>
                            </div>
                        </div>
                        <br/>
                            <span><center>Nội Dung Ghi Chú</center></span>
                            <span className="text-muted"><center>{item.note ? item.note  : "N/A"}</center></span>
                            <br/> 
                            <ul className="list-inline no-margin-bottom text-center">
                                <li><a onClick={() => this.handleShowmodalMark(item.id)} className="btn bg-teal-700 btn-rounded btn-icon"><i class="icon-pencil"></i> Chấm Điểm</a></li>
                                <li><Link className="btn bg-teal-700 btn-rounded btn-icon" to={"/detailPrescription/" + item.prescription.id}><i className="icon-clipboard3"></i> Chi Tiết</Link></li>
                            </ul><br/>
					    	</div>
						</div>
                    );
                }
            });

            var buttonOpenNewDesk = isShowButtonOpenPrescriptionReview ?   <div class="alert alert-warning no-border">
            <button type="button" class="close" data-dismiss="alert"><span>×</span><span class="sr-only">Close</span></button>
            <span class="text-semibold">Xin chào!</span> {currentUser ? currentUser.fullName : ''} <a href="#" class="alert-link">hiện tại bạn chưa có người để chấm điểm.</a>
        </div>:null 
        }
        return (
            <div className="content-wrapper">
            <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href="#"><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Danh Sách Chấm Điểm Của Tôi</li>                     
                    </ul>
                </div>
            </div>
            <div className="content">
                <div className="row center">

                {rowsMyPrescriptionReview}
                {buttonOpenNewDesk}
                {this.state.isPrescriptionReviewMark ? <ModalMark
                    title= "Chấm Điểm"
                    idPrescriptionReview ={this.state.idPrescriptionReview} 
                    show={this.state.isPrescriptionReviewMark} 
                    onHide={this.handleHidemodal} /> : null
                }       
                </div>
            </div>
        </div>
         
        );
    }
}
export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(MyPrescriptionReview));
