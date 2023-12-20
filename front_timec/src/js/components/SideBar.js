import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SecuredComponent from './SecuredComponent';

const mapStateToProps = state => ({
	currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({

});

class SideBar extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUrl: window.location.pathname
		}
		this.onChangeMenu = () => {
			this.setState({currentUrl: window.location.pathname});
		}
	};
	render() {
		// viewChangeCounter is used to update the color active link of sidebar
		const { currentUser } = this.props;
		if (!currentUser) {
			return "";
		}
		var currentUrl = this.state.currentUrl;
		return (
			<div className="sidebar sidebar-main">
				<div className="sidebar-content">
					<div className="sidebar-user">
						<div className="category-content">
							<div className="media">
								<a href="#" className="media-left"><img src="/assets/images/anonymous-user.png" className="img-circle img-sm" alt="" />
								</a>
								<div className="media-body"> <span className="media-heading text-semibold">{currentUser ? currentUser.fullName : ''}</span>
									<div className="text-size-mini text-muted"> <i className="icon-envelop text-size-small"></i> &nbsp;{currentUser ? currentUser.email : ''} </div>
								</div></div>
						</div>
					</div>

					<div className="sidebar-category sidebar-category-visible">
						<div className="category-content no-padding">


							<ul className="navigation navigation-main navigation-accordion">

								<li className="navigation-header"><span>Main</span> <i className="icon-menu" title="Main pages"></i></li>
								<li><a href="/Dashboard"><i className="icon-home4"></i> <span>Dashboard</span></a></li>
								<SecuredComponent allowedPermission="admin.notification.sideBar">

									<li className="">
										<Link to='/#'> <i className="icon-calendar22"></i><span>Thông Báo</span>
										</Link>
										<ul>
											<SecuredComponent allowedPermission="admin.dashboardNotification.read">
												<li className={currentUrl == '/listDashboardNotification' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDashboardNotification'> <span>Thông Báo</span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.appointment.read">
												<li className={currentUrl == '/listAppointment' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listAppointment'> <span>Cuộc Hẹn</span>
													</Link>
												</li>
											</SecuredComponent>

										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.invoiceManagement.sideBar">
									<li className="">
										<Link to='/#'><i
											className="icon-file-text"></i> <span>Quản Lý Hoá Đơn</span></Link>
										<ul>
											<SecuredComponent allowedPermission="admin.invoice.read">
												<li className={currentUrl == '/listInvoice' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listInvoice'>
													<span>Danh Sách Hóa Đơn</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.drugByStore.read">
												<li className={currentUrl == '/drugByStore' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/drugByStore'>
													<span>Thuốc Theo Kho</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.insuranceInvoice.read">
												<li className={currentUrl == '/listInsuranceInvoice' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listInsuranceInvoice'>
													<span>Hóa Đơn Bảo Hiểm</span></Link>
												</li>
											</SecuredComponent>
											{/* <SecuredComponent allowedPermission="admin.users.read"> */}
												<li className={currentUrl == '/listInsuranceInvoiceItem' ? 'active': ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listInsuranceInvoiceItem'>
												<span>Danh Mục Hóa Đơn Bảo Hiểm</span></Link>
											</li>
											{/* </SecuredComponent> */}
											<SecuredComponent allowedPermission="admin.configTable.read">
												<li className={currentUrl == '/listConfigTable' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listConfigTable'>
													<span>Cấu Hình Phí Khám</span></Link>
												</li>
											</SecuredComponent>
										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.paymentManagement.sideBar">
									<li className="">
										<Link to='/#'> <i className="icon-coins"></i><span>Quản Lý Thanh Toán</span>
										</Link>
										<ul>
											<SecuredComponent allowedPermission="admin.myCashDesk.read">
												<li className={currentUrl == '/MyCashDesk' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/MyCashDesk'><span>Quầy Thu Ngân Của Tôi</span>
													</Link>
												</li>
											</SecuredComponent>
											
											<SecuredComponent allowedPermission="admin.cashDesk.read">
												<li className={currentUrl == '/listCashDesk' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listCashDesk'><span>Quầy Thu Ngân</span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.cashWidrawal.read">
												<li className={currentUrl == '/listCashWidrawal' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listCashWidrawal'><span>Rút Tiền Mặt </span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.payment.read">
												<li className={currentUrl == '/listPayment' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPayment'><span>Danh Sách Phiếu Thu</span>
													</Link>
												</li>
											</SecuredComponent>
										
											<SecuredComponent allowedPermission="admin.pagePaymentGroup.read">
												<li className={currentUrl == '/pagePaymentGroup' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/pagePaymentGroup'><span>Phiếu Thu Khám Đoàn</span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.billing.read">
												<li className={currentUrl == '/listBilling' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listBilling'><span>Phiếu Thanh Toán</span>
													</Link>
												</li>
											</SecuredComponent>
										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.report.sideBar">
									<li className="">
										<Link to='/#'> <i className="icon-windows2"></i><span>Báo Cáo</span>
										</Link>
										<ul>
											{/* <SecuredComponent allowedPermission="admin.dayRevenue.read">
												<li>
													<Link

														to={{
															pathname: '/revenueDashboard',
															state: {
																currentUser: currentUser
															}
														}}

													><span>Biểu Đồ Doanh Thu</span>
													</Link>
												</li>
											</SecuredComponent> */}

											<SecuredComponent allowedPermission="admin.dayRevenue.read">
												<li className={currentUrl == '/listDayRevenue' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link

														to={{
															pathname: '/listDayRevenue',
															state: {
																currentUser: currentUser
															}
														}}

													><span>Doanh Thu Theo Ngày</span>
													</Link>
												</li>
											</SecuredComponent>

											<SecuredComponent allowedPermission="admin.monthRevenue.read">
												<li className={currentUrl == '/doctorRevenueReport' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/doctorRevenueReport'><span>Doanh Thu Bác Sĩ</span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.monthRevenue.read">
												<li className={currentUrl == '/doctorRevenueReportDepartment' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/doctorRevenueReportDepartment'><span>Doanh Thu Bác Sĩ Theo Chuyên Khoa</span>
													</Link>
												</li>
											</SecuredComponent>
											
											<SecuredComponent allowedPermission="admin.monthRevenue.read">
												<li className={currentUrl == '/listMonthRevenue' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listMonthRevenue'><span>Doanh Thu Theo Tháng/Năm</span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.reportBHYT.read">
												<li className={currentUrl == '/listReportBHYT' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listReportBHYT'><span>Báo Cáo BHYT</span>
													</Link>
												</li>
											</SecuredComponent>
										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.accountCode.sideBar">
									<li className="">
										<Link to='/#'> <i className="icon-windows2"></i><span>Danh Mục Kế Toán</span>
										</Link>
										<ul>
											<SecuredComponent allowedPermission="admin.accountCode.read">
												<li className={currentUrl == '/listAccountCode' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listAccountCode'><span>Danh Sách Mã Số Kế Toán</span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.journal.read">
												<li className={currentUrl == '/listJournal' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listJournal'><span>Nhật Ký Chung</span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.ledger.read">
												<li className={currentUrl == '/listLedger' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listLedger'><span>Sổ Cái</span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.yearBalance.read">
												<li className={currentUrl == '/listYearBalance' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listYearBalance'><span>Bảng Cân Đối Kế Toán Theo Năm</span>
													</Link>
												</li>
											</SecuredComponent>
										</ul>

									</li>
								</SecuredComponent>
							
								<SecuredComponent allowedPermission="admin.users.sideBar">
									<li className="">
										<Link to='/#'><i
											className="icon-user"></i> <span>Quản Lý Nhân Sự</span></Link>
										<ul >
											<SecuredComponent allowedPermission="admin.users.read">
												<li className={currentUrl == '/listPersonel' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPersonel'>
													<span>Nhân Sự</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.roles.read">
												<li className={currentUrl == '/listRole' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listRole'>
													<span>Phân Quyền Nhân Sự</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.userConfig.read">
												<li className={currentUrl == '/listUserConfig' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listUserConfig'>
													<span>Cấu Hình Lương Cơ Bản</span></Link>
												</li>
											</SecuredComponent>
												<li className={currentUrl == '/listHelpTicket' ? 'active': ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listHelpTicket'> <span>Phiếu hỗ trợ</span>
												</Link>
											</li>
										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.system.sideBar">
									<li className="">
										<Link to='/#'><i
											className="icon-display"></i><span>Hệ Thống</span></Link>
										<ul >
											<SecuredComponent allowedPermission="admin.hospital.read">
												<li className={currentUrl == '/listHospital' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listHospital'>
													<span>Phòng Khám</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.department.read">
												<li className={currentUrl == '/listDepartment' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDepartment'>
													<span>Chuyên Khoa</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.shortCode.read">
												<li className={currentUrl == '/listShortCode' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listShortCode'> <span>Bảng Gõ Tắt</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.userContext.read">
												<li className={currentUrl == '/listUserContext' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listUserContext'> <span>Phân Bổ Nhân Viên</span></Link>
												</li>
											</SecuredComponent>
										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.equipmentManagement.sideBar">
									<li className="">
										<Link to='/#'><i
											className="icon-car2"></i><span>Quản Lý Thiết Bị</span></Link>
										<ul >
											<SecuredComponent allowedPermission="admin.supplier.read">
												<li className={currentUrl == '/listSupplier' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listSupplier'>
													<span>Nhà Cung Cấp Thiết Bị</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.device.read">
												<li className={currentUrl == '/listDevice' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDevice'>
													<span>Thiết Bị</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.deviceMaintenance.read">
												<li className={currentUrl == '/listDeviceMaintenance' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDeviceMaintenance'>
													<span>Bảo Trì Thiết Bị</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.maintenancePlan.read">
												<li className={currentUrl == '/listMaintenancePlan' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listMaintenancePlan'>
													<span>Kế Hoạch Bảo Trì</span></Link>
												</li>
											</SecuredComponent>


										</ul>
									</li>

								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.icdManagement.sideBar">
									<li>
										<Link to='/#'><i
											className="icon-heart-broken2"></i> <span>Quản Lý ICD</span></Link>
										<ul>
											<SecuredComponent allowedPermission="admin.icd.read">
												<li className={currentUrl == '/listIcd' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listIcd'>
													<span>Mã ICD</span></Link>
												</li>
											</SecuredComponent>
										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.drugStoreManagement.sideBar">

									<li>
										<Link to='/#'><i
											className="icon-import"></i> <span>Quản Lý Nhà Thuốc</span></Link>
										<ul>
											<SecuredComponent allowedPermission="admin.uom.read">
												<li className={currentUrl == '/listUom' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listUom'>
													<span>Đơn Vị Tính</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.drugCategory.read">
												<li className={currentUrl == '/listDrugCategory' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDrugCategory'>
													<span>Loại Thuốc</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.drug.read">
												<li className={currentUrl == '/listDrug' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDrug'>
													<span>Thuốc</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.cBKetHopThuoc.read">
												<li className={currentUrl == '/configWarningDrug' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/configWarningDrug'>
													<span>Cảnh Báo Kết Hợp Thuốc</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.cbDayDrug.read">
												<li className={currentUrl == '/checkDrugDate' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/checkDrugDate'>
													<span>Cảnh Báo Hết Hạn Thuốc</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.group.read">
												<li className={currentUrl == '/listGroup' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listGroup'>
													<span>Liều Thuốc Mẫu</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.supplierDrug.read">
												<li className={currentUrl == '/listSupplierDrug' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listSupplierDrug'>
													<span>Nhà Cung Cấp Thuốc</span></Link>
												</li>
											</SecuredComponent>
											{/* Users do not use medical supplies screen */}
											{/* <SecuredComponent allowedPermission="admin.medicalSuppliesCategory.read">
												<li><Link to='/listMedicalSuppliesCategory'>
													<span>Nhóm Vật Tư Y Tế</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.medicalSupplies.read">
												<li><Link to='/listMedicalSupplies'>
													<span>Vật Tư Y Tế</span></Link>
												</li>
											</SecuredComponent> */}
											<SecuredComponent allowedPermission="admin.drugStore.read">
												<li className={currentUrl == '/listDrugStore' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDrugStore'>
													<span>Quầy Thuốc</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.stock.read">
												<li className={currentUrl == '/listStock' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listStock'>
													<span>Xuất - Nhập - Tồn Kho</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.configDayDrug.read">
												<li className={currentUrl == '/configDayDrug' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/configDayDrug'>
													<span>Cấu Hình Ngày Hết Hạn Thuốc</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.alertStock.read">
												<li className={currentUrl == '/listAlertStock' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listAlertStock'>
													<span>Cảnh Báo Số Lượng Thuốc</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.allInputForm.read">
												<li className={currentUrl == '/listAllInputForm' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listAllInputForm'>
													<span>Danh Sách Phiếu Nhập Kho</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.allOutputForm.read">
												<li className={currentUrl == '/listAllOutputForm' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listAllOutputForm'>
													<span>Danh Sách Phiếu Xuất Kho</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.reportCheckDrug.read">
												<li className={currentUrl == '/listCheckDrug' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listCheckDrug'>
													<span>Danh Sách Kiểm Kho</span></Link>
												</li>
											</SecuredComponent>

											<SecuredComponent allowedPermission="admin.allMoveStoreForm.read">
												<li className={currentUrl == '/listAllMoveStoreForm' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listAllMoveStoreForm'>
													<span>Chuyển Kho</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.kTKhoTongQuat.read">
												<li className={currentUrl == '/checkStockReport' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/checkStockReport'>
													<span>Kiểm Tra Kho Tổng Quát</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.tdInput.read">
												<li className={currentUrl == '/checkFollowInput' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/checkFollowInput'>
													<span>Thẻ Nhập Kho</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.tdOutput.read">
												<li className={currentUrl == '/checkFollowOutput' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/checkFollowOutput'>
													<span>Thẻ Xuất Kho</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.dsXuatTraCty.read">
												<li className={currentUrl == '/refunStock' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/refunCompany'>
													<span>DS Xuất Trả Công Ty</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.uotputDangeDrug.read">
												<li className={currentUrl == '/uotputDangeDrug' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/damageDrug'>
													<span>DS Xuất Hủy Thuốc</span></Link>
												</li>
											</SecuredComponent>
											{/* <SecuredComponent allowedPermission="admin.roles.read">
											<li><Link to='/listDrugStoresService'>
												<span>Quầy Bán Thuốc</span></Link>
											</li>
										</SecuredComponent> */}
										</ul>
									</li>
								</SecuredComponent>
								
								<SecuredComponent allowedPermission="admin.drugCabinet.sideBar">
									<li>
										<Link to='/#'><i
											className="icon-import"></i> <span>Quản Lý Tủ Thuốc</span></Link>
										<ul>
											<SecuredComponent allowedPermission="admin.drugCabinet.read">
												<li className={currentUrl == '/listDrugCabinet' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDrugCabinet'>
													<span>Tủ Thuốc</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.listDrugCabinet.read">
												<li className={currentUrl == '/listAllDrugCabinet' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listAllDrugCabinet'>
													<span>Danh Sách Tủ</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.listInputCabinetForm.read">
												<li className={currentUrl == '/listInputCabinetForm' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listInputCabinetForm'>
													<span>Danh Sách Phiếu Lĩnh Dược</span></Link>
												</li>
											</SecuredComponent>
										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.patientManagement.sideBar">
									<li className="">
										<Link to='/#'><i
											className="icon-person"></i> <span>Quản Lý Bệnh Nhân</span></Link>
										<ul>
											<SecuredComponent allowedPermission="admin.patient.read">
												<li className={currentUrl == '/listPatient' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPatient'>
													<span>Danh sách Bệnh Nhân</span></Link>
												</li>
											</SecuredComponent>

										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.schedule.sideBar">
									<li className="">
										<Link to='#'><i
											className="icon-users4"></i> <span>Quản Lý Lịch Khám</span></Link>
										<ul>
											<SecuredComponent allowedPermission="admin.queue.read">
												<li className={currentUrl == '/listByDepartment' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listByDepartment'>
													<span>Hàng Đợi Theo Chuyên Khoa</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.queue.read">
												<li className={currentUrl == '/listQueue' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listQueue'>
													<span>Hàng Đợi Khám</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.company.read">
												<li className={currentUrl == '/listCompany' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listCompany'>
													<span>Công Ty Khách Hàng</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.bookingGroup.read">
												<li className={currentUrl == '/listBookingGroup' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listBookingGroup'>
													<span>Khám Theo Nhóm</span></Link>
												</li>
											</SecuredComponent>
											<li className={currentUrl == '/listPackage' ? 'active': ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listPackage'> <span>Gói Khám</span>
												</Link>
											</li>
											<li className={currentUrl == '/listCoupon' ? 'active': ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listCoupon'> <span>Mã Giảm Giá</span>
												</Link>
											</li>


											{/* <SecuredComponent allowedPermission="admin.users.read">
											<li><Link to='/listQueueNumber'>
												<span>Số thứ tự</span></Link>
											</li>
										</SecuredComponent> */}

										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.test.sideBar">
									<li className="">
										<Link to='/#'><i
											className="icon-clipboard3"></i> <span>Dịch Vụ / Chỉ Định</span></Link>
										<ul>
											<SecuredComponent allowedPermission="admin.diagnosisGroup.read">
												<li className={currentUrl == '/listDiagnosisGroup' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDiagnosisGroup'>
													<span>Nhóm Dịch Vụ </span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.diagnosisService.read">
												<li className={currentUrl == '/listDiagnosisService' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDiagnosisService'>
													<span>Dịch Vụ Chỉ Định</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.diagnosisReport.read">
												<li className={currentUrl == '/listDiagnosisReport' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listDiagnosisReport' >
														<span> Kết quả Chỉ Định</span></Link>

												</li>
											</SecuredComponent>


										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.medicalExamination.sideBar">

									<li className="">
										<Link to='/#'><i
											className="icon-repo-forked"></i> <span>Khám Bệnh</span></Link>
										<ul>

											{/* <SecuredComponent allowedPermission="admin.procedureReport.read"> */}
											<li className={currentUrl == '/listProcedureReport' ? 'active': ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listProcedureReport'>
												<span>Phiếu Thủ Thuật</span></Link>
											</li>
											{/* </SecuredComponent> */}

											{/* <SecuredComponent allowedPermission="admin.users.read">
											<li><Link to='/listPrescriptionItem'>
												<span>Toa thuốc</span></Link>
											</li>
										</SecuredComponent> */}

											<SecuredComponent allowedPermission="admin.transferHospital.read">
												<li className={currentUrl == '/listTransferHospital' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listTransferHospital'>
													<span>Bệnh Viện Chuyển Đi</span></Link>
												</li>
											</SecuredComponent>

											<SecuredComponent allowedPermission="admin.transferForm.read">
												<li className={currentUrl == '/listTransferForm' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listTransferForm'>
													<span>Giấy Chuyển Viện</span></Link>
												</li>
											</SecuredComponent>

											<SecuredComponent allowedPermission="admin.prescription.read">
												<li className={currentUrl == '/listPrescription' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPrescription'>
													<span>Khám Bệnh</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.outputCabinet.sideBar">
											<li className={currentUrl == '/listNursing' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listNursing'>
													<span>Điều Dưỡng</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.procedureService.read">
												<li className={currentUrl == '/listProcedureService' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listProcedureService'>
													<span>Dịch Vụ Thủ Thuật</span></Link>
												</li>
											</SecuredComponent>

											<SecuredComponent allowedPermission="admin.procedureMember.read">
												<li className={currentUrl == '/listProcedureMember' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listProcedureMember'>
													<span>Thành Viên Tham Gia Thủ Thuật</span></Link>
												</li>
											</SecuredComponent>

											<SecuredComponent allowedPermission="admin.myPrescriptionReview.read">
												<li className={currentUrl == '/MyPrescriptionReview' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/MyPrescriptionReview'><span>Chấm Điểm Của Tôi</span>
													</Link>
												</li>
											</SecuredComponent>

										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.attendance.sideBar">

									<li>
										<Link to='/#'><i
											className="icon-stack-check"></i> <span>Chấm Công</span></Link>
										<ul>
											<SecuredComponent allowedPermission="admin.userAttendance.read">
												<li className={currentUrl == '/listUserAttendance' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listUserAttendance'>
													<span>Ngày Công</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.userSalary.read">
												<li className={currentUrl == '/listUserSalary' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listUserSalary'>
													<span>Báo Cáo Lương</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.prescriptionReview.read">
												<li className={currentUrl == '/listPrescriptionReview' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPrescriptionReview'> <span>Phân Công Chấm Điểm</span>
													</Link>
												</li>
											</SecuredComponent>
										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.insurance.sideBar">
									<li>
										<Link to='/#'><i
											className="icon-aid-kit"></i> <span>Bảo Hiểm Y Tế</span></Link>
										<ul>
											<SecuredComponent allowedPermission="admin.insuranceType.read">
												<li className={currentUrl == '/listInsuranceType' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listInsuranceType'>
													<span>Loại Bảo Hiểm Hỗ Trợ</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.insuranceCard.read">
												<li className={currentUrl == '/listInsuranceCard' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listInsuranceCard'>
													<span>Thẻ Bảo Hiểm Bênh Nhân</span></Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.insuranceMapping.read">
												<li className={currentUrl == '/listInsuranceMapping' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listInsuranceMapping'>
													<span>Mapping Bảo Hiểm</span></Link>
												</li>
											</SecuredComponent>

											<SecuredComponent allowedPermission="admin.insuranceMapping.read">
												<li className={currentUrl == '/apiBHYT' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/apiBHYT'>
													<span>API Bảo Hiểm</span></Link>
												</li>
											</SecuredComponent>

										</ul>
									</li>
								</SecuredComponent>
								
								<SecuredComponent allowedPermission="admin.ticket.sideBar">
									<li className="">
										<Link to='/#'> <i className="icon-dropbox"></i><span>Hỗ Trợ</span>
										</Link>
										<ul>
											<SecuredComponent allowedPermission="admin.ticket.read">
												<li className={currentUrl == '/listHelpTicket' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listHelpTicket'> <span>Phiếu hỗ trợ</span>
													</Link>
												</li>
											</SecuredComponent>
										</ul>
									</li>
								</SecuredComponent>
								<SecuredComponent allowedPermission="admin.template.sideBar">
									<li className="">
										<Link to='/#'> <i className=" icon-insert-template"></i><span>Bệnh án</span>
										</Link>
										<ul>
											<SecuredComponent allowedPermission="admin.template.read">
												<li className={currentUrl == '/listPrescriptionForm' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPrescriptionForm'> <span>Mẫu bệnh án</span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.template.read">
												<li className={currentUrl == '/listPrescriptionFormItem' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPrescriptionFormItem'> <span>Chi tiết bệnh án </span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.template.read">
												<li className={currentUrl == '/listPreTemplate' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPreTemplate'> <span>Mẫu bệnh án </span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.template.read">
												<li className={currentUrl == '/listPreTemplateItem' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPreTemplateItem'> <span>Mẫu bệnh án </span>
													</Link>
												</li>
											</SecuredComponent>
											<SecuredComponent allowedPermission="admin.template.read">
												<li className={currentUrl == '/listPreTemplateField' ? 'active': ''} onClick={() => this.onChangeMenu()}>
													<Link to='/listPreTemplateField'> <span>Trường dữ liệu bệnh án </span>
													</Link>
												</li>
											</SecuredComponent>

										</ul>
									</li>
								</SecuredComponent>

								{/* </SecuredComponent>	 */}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar));