import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// https://phraseapp.com/blog/posts/react-i18n-best-libraries/

i18n
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "Welcome to React.js": "Welcome to React.js",
                    "Declarative": "Declarative"
                    
                }
            },
            vi: {
                translations: {
                    "Welcome to React.js": "Chào mừng đến với React.js!",
                    "Declarative": "Khai báo",
                    
                    

                    "KHONG"     : "Không",
                    // gender
                    "MALE"      : "Nam",
                    "FEMALE"    : "Nữ",
                    "OTHER"     : "Khác",
                    //InvoiceStatus 
                    "OPEN" : "Mở", "CANCELLED" : "Đã Hủy", "CLOSED" : "Đóng",
                    //InvoiceType
                    "DRUG" : "Thuốc", "DIAGNOSIS_SERVICE" : "Chỉ Định", "PROCEDURE_SERVICE": "Thủ Thuật","PACKAGE":"Gói khám", "PRESCRIPTIONCOMPANY" :"Khám Đoàn",
                    //QueueType
                    "KHONG_UU_TIEN" : "Không Ưu Tiên", "UU_TIEN" : "Ưu Tiên",
                    //QueueNumberStatus
                    "TODO" : "Đang Chờ","DONE":"Hoàn Thành", "CANCELLED" : "Huỷ","IN_PROGRESS" : "Đang Xử Lý",

                    //PrescriptionSolution
                    "CapToa":"Cấp Toa Cho Về ","DieuTriNgoaiTru":"Điều Trị Ngoại Trú ","CapToaHenTaiKham":"Cấp Toa và Hẹn Tái Khám ",
                    "ChuyenVien":"Chuyển Viện ","Khac":"Cho Thực Hiện CLS ","KhongToa":"Không Toa ", "ChuaCo":" ",
                    "VALIDATED":"Đã Duyệt",
                    "PRESCRIPTION":"Phiếu khám",

                    "EMERGENCY": "Chuyển Tuyến Cấp Cứu",
                    "INTRODUCE": "Giấy Giới Thiệu",

                    /* Nhân Sự */
                    "admin.users": "Màn Hình Quản Lý Nhân Viên",
                    "admin.users.read": "Xem nhân viên",
                    "admin.users.create": "Thêm mới nhân viên",
                    "admin.users.update": "Sửa nhân viên",
                    "admin.users.delete": "Xóa nhân viên",
                    
                    "admin.roles": "Màn Hình Phân Quyền",
                    "admin.roles.read": "Xem phân quyền",
                    "admin.roles.create": "Thêm mới phân quyền",
                    "admin.roles.update": "Sửa phân quyền",
                    "admin.roles.delete": "Xóa phân quyền",

                    "admin.userConfig": "Màn Hình Cấu Hình Lương Cơ Bản",
                    "admin.userConfig.read": "Xem Cấu Hình Lương Cơ Bản",
                    "admin.userConfig.create": "Thêm mới Cấu Hình Lương Cơ Bản",
                    "admin.userConfig.update": "Sửa Cấu Hình Lương Cơ Bản",
                    "admin.userConfig.delete": "Xóa Cấu Hình Lương Cơ Bản",

                    /* Thông Báo */
                    "admin.dashboardNotification":"Màn Hình Quản Lý Thông Báo",
                    "admin.dashboardNotification.sideBar":"Menu sideBar",
                    "admin.dashboardNotification.read":"Xem Thông Báo",
                    "admin.dashboardNotification.create":"Tạo Thông Báo",
                    "admin.dashboardNotification.update":"Sửa Thông Báo",
                    "admin.dashboardNotification.delete":"Xóa Thông Báo",

                    //Kế Toán
                    "admin.accountCode": "Mã số kế toán",
                    "admin.accountCode.sideBar":"Menu Sidebar Kế Toán",
                    "admin.accountCode.read":"Xem mã số kế toán",
                    "admin.accountCode.create":"Thêm mới mã số kế toán",
                    "admin.accountCode.update":"Sửa mã số kế toán",
                    "admin.accountCode.delete":"Xoá mã số kế toán",
                            "admin.journal":"Nhật Ký Chung",
                            "admin.journal.sideBar":"Menu Sidebar Nhật Ký Chung",
                            "admin.journal.read":"Xem Nhật Ký Chung",
                            "admin.journal.create":"Thêm mới Nhật Ký Chung",
                            "admin.journal.update":"Sửa Nhật Ký Chung",
                            "admin.journal.delete":"Xoá Nhật Ký Chung",
                            "admin.ledger":"Sổ Cái",
                            "admin.ledger.sideBar":"Menu Sidebar Sổ Cái",
                            "admin.ledger.read":"Xem Sổ Cái",
                            "admin.ledger.create":"Thêm mới Sổ Cái",
                            "admin.ledger.update":"Sửa Sổ Cái",
                            "admin.ledger.delete":"Xoá Sổ Cái",
                            "admin.yearBalance":"Bảng Cân Đối Kế Toán (Theo Năm)",
                            "admin.yearBalance.sideBar":"Menu Sidebar Bảng Cân Đối Kế Toán (Theo Năm)",
                            "admin.yearBalance.read":"Xem Bảng Cân Đối Kế Toán (Theo Năm)",
                            "admin.yearBalance.create":"Thêm mới Bảng Cân Đối Kế Toán (Theo Năm)",
                            "admin.yearBalance.update":"Sửa Bảng Cân Đối Kế Toán (Theo Năm)",
                            "admin.yearBalance.goToDetail":"Đi Đến Chi Tiết",
                            "admin.yearBalance.delete":"Xoá Bảng Cân Đối Kế Toán (Theo Năm)",
                            "admin.trialBalance":"Bảng Cân Đối Kế Toán (Chi Tiết)",
                            "admin.trialBalance.sideBar":"Menu SideBar Bảng Cân Đối Kế Toán (Chi Tiết)",
                            "admin.trialBalance.read":"Xem Bảng Cân Đối Kế Toán (Chi Tiết)",
                            "admin.trialBalance.create":"Thêm mới Bảng Cân Đối Kế Toán (Chi Tiết)",
                            "admin.trialBalance.update":"Sửa Bảng Cân Đối Kế Toán (Chi Tiết)",
                            "admin.trialBalance.delete":"Xoá Bảng Cân Đối Kế Toán (Chi Tiết)",
                           
                   
                   


                    /* Cuộc Hẹn */
                    "admin.appointment":"Màn Hình Quản Lý Cuộc Hẹn",
                    "admin.appointment.read":"Xem Cuộc Hẹn",
                    "admin.appointment.create":"Tạo Cuộc Hẹn",
                    "admin.appointment.update":"Sửa Cuộc Hẹn",
                    "admin.appointment.delete":"Xóa Cuộc Hẹn",

                    /* Quầy Thu Ngân Của Tôi*/
                    "admin.myCashDesk":"Màn Hình Quản Lý Quầy Thu Ngân Của Tôi",
                    "admin.myCashDesk.read":"Xem Quầy Thu Ngân Của Tôi",
                    "admin.myCashDesk.create":"Tạo Quầy Thu Ngân Của Tôi",
                    "admin.myCashDesk.update":"Sửa Quầy Thu Ngân Của Tôi",
                    "admin.myCashDesk.delete":"Xóa Quầy Thu Ngân Của Tôi",

                    /* Chấm Điểm Của Tôi */
                    "admin.myPrescriptionReview":"Màn Hình Chấm Điểm Của Tôi",
                    "admin.myPrescriptionReview.read":"Xem Chấm Điểm Của Tôi",
                    "admin.myPrescriptionReview.create":"Tạo Chấm Điểm Của Tôi",
                    "admin.myPrescriptionReview.update":"Sửa Chấm Điểm Của Tôi",
                    "admin.myPrescriptionReview.delete":"Xóa Chấm Điểm Của Tôi",

                    /* Quầy Thu Ngân*/
                    "admin.cashDesk":"Màn Hình Quản Lý Quầy Thu Ngân",
                    "admin.cashDesk.read":"Xem Quầy Thu Ngân",
                    "admin.cashDesk.create":"Tạo Quầy Thu Ngân",
                    "admin.cashDesk.update":"Sửa Quầy Thu Ngân",
                    "admin.cashDesk.delete":"Xóa Quầy Thu Ngân",

                    /* Rút Tiền Mặt */
                    "admin.cashWidrawal":"Màn Hình Quản Lý Rút Tiền Mặt",
                    "admin.cashWidrawal.read":"Xem Rút Tiền Mặt",
                    "admin.cashWidrawal.create":"Tạo Rút Tiền Mặt",
                    "admin.cashWidrawal.update":"Sửa Rút Tiền Mặt",
                    "admin.cashWidrawal.delete":"Xóa Rút Tiền Mặt",

                    /* Phiếu Thu */
                    "admin.payment":"Màn Hình Quản Lý Phiếu Thu",
                    "admin.payment.read":"Xem Phiếu Thu",
                    "admin.payment.create":"Tạo Phiếu Thu",
                    "admin.payment.update":"Sửa Phiếu Thu",
                    "admin.payment.delete":"Xóa Phiếu Thu",
                    "admin.pagePaymentGroup.read" : "Xem Phiếu Thu Khám Đoàn",
                    "admin.pagePaymentInvoice.read" : "Xem Phiếu Thu Bán Lẻ",

                     /* Phiếu Thu */
                     "admin.billing":"Màn Hình Quản Lý Phiếu Thanh Toán",
                     "admin.billing.read":"Xem Phiếu Thanh Toán",
                     "admin.billing.create":"Tạo Phiếu Thanh Toán",
                     "admin.billing.update":"Sửa Phiếu Thanh Toán",
                     "admin.billing.delete":"Xóa Phiếu Thanh Toán",

                    /* Doanh Thu Theo Ngày */
                    "admin.dayRevenue":"Màn Hình Quản Lý Doanh Thu Theo Ngày",
                    "admin.dayRevenue.read":"Xem Doanh Thu Theo Ngày",
                    "admin.dayRevenue.create":"Tạo Doanh Thu Theo Ngày",
                    "admin.dayRevenue.update":"Sửa Doanh Thu Theo Ngày",
                    "admin.dayRevenue.delete":"Xóa Doanh Thu Theo Ngày",

                    /* Doanh Thu Theo Tháng */
                    "admin.monthRevenue":"Màn Hình Quản Lý Doanh Thu Theo Tháng",
                    "admin.monthRevenue.read":"Xem Doanh Thu Theo Tháng",
                    "admin.monthRevenue.create":"Tạo Doanh Thu Theo Tháng",
                    "admin.monthRevenue.update":"Sửa Doanh Thu Theo Tháng",
                    "admin.monthRevenue.delete":"Xóa Doanh Thu Theo Tháng",

                    /* Phòng Khám */
                    "admin.hospital":"Màn Hình Quản Lý Phòng Khám",
                    "admin.hospital.read":"Xem Phòng Khám",
                    "admin.hospital.create":"Tạo Phòng Khám",
                    "admin.hospital.update":"Sửa Phòng Khám",
                    "admin.hospital.delete":"Xóa Phòng Khám",

                    /* Chuyên Khoa */
                    "admin.department":"Màn Hình Quản Lý Chuyên Khoa",
                    "admin.department.read":"Xem Chuyên Khoa",
                    "admin.department.create":"Tạo Chuyên Khoa",
                    "admin.department.update":"Sửa Chuyên Khoa",
                    "admin.department.delete":"Xóa Chuyên Khoa",

                    /* Bảng Gõ Tắt */
                    "admin.shortCode":"Màn Hình Quản Lý Bảng Gõ Tắt",
                    "admin.shortCode.read":"Xem Bảng Gõ Tắt",
                    "admin.shortCode.create":"Tạo Bảng Gõ Tắt",
                    "admin.shortCode.update":"Sửa Bảng Gõ Tắt",
                    "admin.shortCode.delete":"Xóa Bảng Gõ Tắt",

                    /* Phân Bổ Nhân Viên */
                    "admin.userContext":"Màn Hình Quản Lý Phân Bổ Nhân Viên",
                    "admin.userContext.read":"Xem Phân Bổ Nhân Viên",
                    "admin.userContext.create":"Tạo Phân Bổ Nhân Viên",
                    "admin.userContext.update":"Sửa Phân Bổ Nhân Viên",
                    "admin.userContext.delete":"Xóa Phân Bổ Nhân Viên",

                    /* Nhà Cung Cấp Thiết Bị */
                    "admin.supplier":"Màn Hình Quản Lý Nhà Cung Cấp",
                    "admin.supplier.read":"Xem Nhà Cung Cấp",
                    "admin.supplier.create":"Tạo Nhà Cung Cấp",
                    "admin.supplier.update":"Sửa Nhà Cung Cấp",
                    "admin.supplier.delete":"Xóa Nhà Cung Cấp",

                    /* Thiết Bị */
                    "admin.device":"Màn Hình Quản Lý Thiết Bị",
                    "admin.device.read":"Xem Thiết Bị",
                    "admin.device.create":"Tạo Thiết Bị",
                    "admin.device.update":"Sửa Thiết Bị",
                    "admin.device.delete":"Xóa Thiết Bị",

                    /* Bảo Trì Thiết Bị */
                    "admin.deviceMaintenance":"Màn Hình Quản Lý Bảo Trì Thiết Bị",
                    "admin.deviceMaintenance.read":"Xem Bảo Trì Thiết Bị",
                    "admin.deviceMaintenance.create":"Tạo Bảo Trì Thiết Bị",
                    "admin.deviceMaintenance.update":"Sửa Bảo Trì Thiết Bị",
                    "admin.deviceMaintenance.delete":"Xóa Bảo Trì Thiết Bị",

                    /* Kế Hoạch Bảo Trì */
                    "admin.maintenancePlan":"Màn Hình Quản Lý Kế Hoạch Bảo Trì",
                    "admin.maintenancePlan.read":"Xem Kế Hoạch Bảo Trì",
                    "admin.maintenancePlan.create":"Tạo Kế Hoạch Bảo Trì",
                    "admin.maintenancePlan.update":"Sửa Kế Hoạch Bảo Trì",
                    "admin.maintenancePlan.delete":"Xóa Kế Hoạch Bảo Trì",

                    /* Mã ICD */
                    "admin.icd":"Màn Hình Quản Lý Mã ICD",
                    "admin.icd.read":"Xem Mã ICD",
                    "admin.icd.create":"Tạo Mã ICD",
                    "admin.icd.update":"Sửa Mã ICD",
                    "admin.icd.delete":"Xóa Mã ICD",

                    /* Nhóm ICD */
                    "admin.icdCategory":"Màn Hình Quản Lý Nhóm ICD",
                    "admin.icdCategory.read":"Xem Nhóm ICD",
                    "admin.icdCategory.create":"Tạo Nhóm ICD",
                    "admin.icdCategory.update":"Sửa Nhóm ICD",
                    "admin.icdCategory.delete":"Xóa Nhóm ICD",
                    
                    /* Đơn Vị Tính */
                    "admin.uom":"Màn Hình Quản Lý Đơn Vị Tính",
                    "admin.uom.read":"Xem Đơn Vị Tính",
                    "admin.uom.create":"Tạo Đơn Vị Tính",
                    "admin.uom.update":"Sửa Đơn Vị Tính",
                    "admin.uom.delete":"Xóa Đơn Vị Tính",

                    /* Loại Thuốc */
                    "admin.drugCategory":"Màn Hình Quản Lý Loại Thuốc",
                    "admin.drugCategory.read":"Xem Loại Thuốc",
                    "admin.drugCategory.create":"Tạo Loại Thuốc",
                    "admin.drugCategory.update":"Sửa Loại Thuốc",
                    "admin.drugCategory.delete":"Xóa Loại Thuốc",

                    /* Đơn Thuốc Mẫu */
                    "admin.group":"Màn Hình Quản Lý Đơn Thuốc Mẫu",
                    "admin.group.read":"Xem Đơn Thuốc Mẫu",
                    "admin.group.create":"Tạo Đơn Thuốc Mẫu",
                    "admin.group.update":"Sửa Đơn Thuốc Mẫu",
                    "admin.group.delete":"Xóa Đơn Thuốc Mẫu",

                    /* Thuốc */
                    "admin.drug":"Màn Hình Quản Lý Thuốc",
                    "admin.drug.read":"Xem Thuốc",
                    "admin.drug.create":"Tạo Thuốc",
                    "admin.drug.update":"Sửa Thuốc",
                    "admin.drug.delete":"Xóa Thuốc",

                    /* Nhà Cung Cấp Thuốc */
                    "admin.supplierDrug":"Màn Hình Quản Lý Nhà Cung Cấp Thuốc",
                    "admin.supplierDrug.read":"Xem Nhà Cung Cấp Thuốc",
                    "admin.supplierDrug.create":"Tạo Nhà Cung Cấp Thuốc",
                    "admin.supplierDrug.update":"Sửa Nhà Cung Cấp Thuốc",
                    "admin.supplierDrug.delete":"Xóa Nhà Cung Cấp Thuốc",

                    /* Nhóm Vật Tư Y Tế */
                    "admin.medicalSuppliesCategory":"Màn Hình Quản Lý Nhóm Vật Tư Y Tế",
                    "admin.medicalSuppliesCategory.read":"Xem Nhóm Vật Tư Y Tế",
                    "admin.medicalSuppliesCategory.create":"Tạo Nhóm Vật Tư Y Tế",
                    "admin.medicalSuppliesCategory.update":"Sửa Nhóm Vật Tư Y Tế",
                    "admin.medicalSuppliesCategory.delete":"Xóa Nhóm Vật Tư Y Tế",

                    /* Vật Tư Y Tế */
                    "admin.medicalSupplies":"Màn Hình Quản Lý Vật Tư Y Tế",
                    "admin.medicalSupplies.read":"Xem Vật Tư Y Tế",
                    "admin.medicalSupplies.create":"Tạo Vật Tư Y Tế",
                    "admin.medicalSupplies.update":"Sửa Vật Tư Y Tế",
                    "admin.medicalSupplies.delete":"Xóa Vật Tư Y Tế",

                    /* Quầy Thuốc */
                    "admin.drugStore":"Màn Hình Quản Lý Quầy Thuốc",
                    "admin.drugStore.read":"Xem Quầy Thuốc",
                    "admin.drugStore.create":"Tạo Quầy Thuốc",
                    "admin.drugStore.update":"Sửa Quầy Thuốc",
                    "admin.drugStore.delete":"Xóa Quầy Thuốc",

                    /* Tổng Kho */
                    "admin.stock":"Màn Hình Quản Lý Tổng Kho",
                    "admin.stock.read":"Xem Tổng Kho",
                    "admin.stock.create":"Tạo Tổng Kho",
                    "admin.stock.update":"Sửa Tổng Kho",
                    "admin.stock.delete":"Xóa Tổng Kho",
                    "admin.stock.checkAndUpdate":"Kiểm Kho Và Cập Nhật",
                    "admin.stock.validate": "Duyệt Nhập / Xuất Kho",

                    /* Cảnh Báo Hết Thuốc */
                    "admin.alertStock":"Màn Hình Quản Lý Cảnh Báo Hết Thuốc",
                    "admin.alertStock.read":"Xem Cảnh Báo Hết Thuốc",
                    "admin.alertStock.create":"Tạo Cảnh Báo Hết Thuốc",
                    "admin.alertStock.update":"Sửa Cảnh Báo Hết Thuốc",
                    "admin.alertStock.delete":"Xóa Cảnh Báo Hết Thuốc",

                    /* Danh Sách Phiếu Nhập Kho */
                    "admin.allInputForm":"Màn Hình Quản Lý Danh Sách Phiếu Nhập Kho",
                    "admin.allInputForm.read":"Xem Danh Sách Phiếu Nhập Kho",
                    "admin.allInputForm.create":"Tạo Danh Sách Phiếu Nhập Kho",
                    "admin.allInputForm.update":"Sửa Danh Sách Phiếu Nhập Kho",
                    "admin.allInputForm.delete":"Xóa Danh Sách Phiếu Nhập Kho",
                    "admin.allInputForm.cancelDoneInputForm":"Hủy Phiếu Đã Nhập Kho",

                    /* Danh Sách Phiếu Xuất Kho */
                    "admin.allOutputForm":"Màn Hình Quản Lý Danh Sách Phiếu Xuất Kho",
                    "admin.allOutputForm.read":"Xem Danh Sách Phiếu Xuất Kho",
                    "admin.allOutputForm.create":"Tạo Danh Sách Phiếu Xuất Kho",
                    "admin.allOutputForm.update":"Sửa Danh Sách Phiếu Xuất Kho",
                    "admin.allOutputForm.delete":"Xóa Danh Sách Phiếu Xuất Kho",

                    "admin.allMoveStoreForm":"Màn Hình Quản Lý Chuyển Kho",
                    "admin.allMoveStoreForm.read":"Xem Danh Sách Chuyển Kho",
                    "admin.allMoveStoreForm.create":"Tạo Chuyển Kho",
                    "admin.allMoveStoreForm.update":"Sửa Chuyển Kho",
                    "admin.allMoveStoreForm.delete":"Xóa Chuyển Kho",

                    /* Danh sách Bệnh Nhân */
                    "admin.patient":"Màn Hình Quản Lý Danh sách Bệnh Nhân",
                    "admin.patient.read":"Xem Danh sách Bệnh Nhân",
                    "admin.patient.create":"Tạo Danh sách Bệnh Nhân",
                    "admin.patient.update":"Sửa Danh sách Bệnh Nhân",
                    "admin.patient.delete":"Xóa Danh sách Bệnh Nhân",

                    /* Hàng Đợi Khám */
                    "admin.queue":"Màn Hình Quản Lý Hàng Đợi Khám",
                    "admin.queue.read":"Xem Hàng Đợi Khám",
                    "admin.queue.create":"Tạo Hàng Đợi Khám",
                    "admin.queue.update":"Sửa Hàng Đợi Khám",
                    "admin.queue.delete":"Xóa Hàng Đợi Khám",

                    /* Công Ty Khách Hàng */
                    "admin.company":"Màn Hình Quản Lý Công Ty Khách Hàng",
                    "admin.company.read":"Xem Công Ty Khách Hàng",
                    "admin.company.create":"Tạo Công Ty Khách Hàng",
                    "admin.company.update":"Sửa Công Ty Khách Hàng",
                    "admin.company.delete":"Xóa Công Ty Khách Hàng",

                    /* Khám Theo Nhóm */
                    "admin.bookingGroup":"Màn Hình Quản Lý Khám Theo Nhóm",
                    "admin.bookingGroup.read":"Xem Khám Theo Nhóm",
                    "admin.bookingGroup.create":"Tạo Khám Theo Nhóm",
                    "admin.bookingGroup.update":"Sửa Khám Theo Nhóm",
                    "admin.bookingGroup.delete":"Xóa Khám Theo Nhóm",

                    /* Nhóm Dịch Vụ */
                    "admin.diagnosisGroup":"Màn Hình Quản Lý Nhóm Dịch Vụ",
                    "admin.diagnosisGroup.read":"Xem Nhóm Dịch Vụ",
                    "admin.diagnosisGroup.create":"Tạo Nhóm Dịch Vụ",
                    "admin.diagnosisGroup.update":"Sửa Nhóm Dịch Vụ",
                    "admin.diagnosisGroup.delete":"Xóa Nhóm Dịch Vụ",

                    /* Dịch Vụ Xét Nghiệm */
                    "admin.diagnosisService":"Màn Hình Quản Lý Dịch Vụ Xét Nghiệm",
                    "admin.diagnosisService.read":"Xem Dịch Vụ Xét Nghiệm",
                    "admin.diagnosisService.create":"Tạo Dịch Vụ Xét Nghiệm",
                    "admin.diagnosisService.update":"Sửa Dịch Vụ Xét Nghiệm",
                    "admin.diagnosisService.delete":"Xóa Dịch Vụ Xét Nghiệm",

                    /* Kết quả Xét Nghiệm */
                    "admin.diagnosisReport":"Màn Hình Quản Lý Kết quả Xét Nghiệm",
                    "admin.diagnosisReport.read":"Xem Kết quả Xét Nghiệm",
                    "admin.diagnosisReport.create":"Tạo Kết quả Xét Nghiệm",
                    "admin.diagnosisReport.update":"Sửa Kết quả Xét Nghiệm",
                    "admin.diagnosisReport.delete":"Xóa Kết quả Xét Nghiệm",

                    /* Bệnh Viện */
                    "admin.transferHospital":"Màn Hình Quản Lý Bệnh Viện",
                    "admin.transferHospital.read":"Xem Bệnh Viện",
                    "admin.transferHospital.create":"Tạo Bệnh Viện",
                    "admin.transferHospital.update":"Sửa Bệnh Viện",
                    "admin.transferHospital.delete":"Xóa Bệnh Viện",

                    /* Giấy Chuyển Viện */
                    "admin.transferForm":"Màn Hình Quản Lý Giấy Chuyển Viện",
                    "admin.transferForm.read":"Xem Giấy Chuyển Viện",
                    "admin.transferForm.create":"Tạo Giấy Chuyển Viện",
                    "admin.transferForm.update":"Sửa Giấy Chuyển Viện",
                    "admin.transferForm.delete":"Xóa Giấy Chuyển Viện",

                    /* Khám Bệnh */
                    "admin.prescription":"Màn Hình Quản Lý Khám Bệnh",
                    "admin.prescription.read":"Xem Khám Bệnh",
                    "admin.prescription.create":"Tạo Khám Bệnh",
                    "admin.prescription.update":"Sửa Khám Bệnh",
                    "admin.prescription.reopen":"Mở Lại Phiếu Khám Bệnh",
                    "admin.prescription.delete":"Xóa Khám Bệnh",

                    /* Dịch Vụ Thủ Thuật */
                    "admin.procedureService":"Màn Hình Quản Lý Dịch Vụ Thủ Thuật",
                    "admin.procedureService.read":"Xem Dịch Vụ Thủ Thuật",
                    "admin.procedureService.create":"Tạo Dịch Vụ Thủ Thuật",
                    "admin.procedureService.update":"Sửa Dịch Vụ Thủ Thuật",
                    "admin.procedureService.delete":"Xóa Dịch Vụ Thủ Thuật",

                    /* Thành Viên Tham Gia Thủ Thuật */
                    "admin.procedureMember":"Màn Hình Quản Lý Thành Viên Tham Gia Thủ Thuật",
                    "admin.procedureMember.read":"Xem Thành Viên Tham Gia Thủ Thuật",
                    "admin.procedureMember.create":"Tạo Thành Viên Tham Gia Thủ Thuật",
                    "admin.procedureMember.update":"Sửa Thành Viên Tham Gia Thủ Thuật",
                    "admin.procedureMember.delete":"Xóa Thành Viên Tham Gia Thủ Thuật",

                    /* Ngày Công */
                    "admin.userAttendance":"Màn Hình Quản Lý Ngày Công",
                    "admin.userAttendance.read":"Xem Ngày Công",
                    "admin.userAttendance.create":"Tạo Ngày Công",
                    "admin.userAttendance.update":"Sửa Ngày Công",
                    "admin.userAttendance.delete":"Xóa Ngày Công",

                    /* Báo Cáo Lương */
                    "admin.userSalary":"Màn Hình Quản Lý Báo Cáo Lương",
                    "admin.userSalary.read":"Xem Báo Cáo Lương",
                    "admin.userSalary.create":"Tạo Báo Cáo Lương",
                    "admin.userSalary.update":"Sửa Báo Cáo Lương",
                    "admin.userSalary.delete":"Xóa Báo Cáo Lương",

                    /* Phân Công Chấm Điểm */
                    "admin.prescriptionReview":"Màn Hình Quản Lý Phân Công Chấm Điểm",
                    "admin.prescriptionReview.read":"Xem Phân Công Chấm Điểm",
                    "admin.prescriptionReview.create":"Tạo Phân Công Chấm Điểm",
                    "admin.prescriptionReview.update":"Sửa Phân Công Chấm Điểm",
                    "admin.prescriptionReview.delete":"Xóa Phân Công Chấm Điểm",

                    /* Loại Bảo Hiểm Hỗ Trợ */
                    "admin.insuranceType":"Màn Hình Quản Lý Loại Bảo Hiểm Hỗ Trợ",
                    "admin.insuranceType.read":"Xem Loại Bảo Hiểm Hỗ Trợ",
                    "admin.insuranceType.create":"Tạo Loại Bảo Hiểm Hỗ Trợ",
                    "admin.insuranceType.update":"Sửa Loại Bảo Hiểm Hỗ Trợ",
                    "admin.insuranceType.delete":"Xóa Loại Bảo Hiểm Hỗ Trợ",

                    /* Thẻ Bảo Hiểm Bệnh Nhân */
                    "admin.insuranceCard":"Màn Hình Quản Lý Thẻ Bảo Hiểm Bệnh Nhân",
                    "admin.insuranceCard.read":"Xem Thẻ Bảo Hiểm Bệnh Nhân",
                    "admin.insuranceCard.create":"Tạo Thẻ Bảo Hiểm Bệnh Nhân",
                    "admin.insuranceCard.update":"Sửa Thẻ Bảo Hiểm Bệnh Nhân",
                    "admin.insuranceCard.delete":"Xóa Thẻ Bảo Hiểm Bệnh Nhân",

                    /* Mapping Bảo Hiểm */
                    "admin.insuranceMapping":"Màn Hình Quản Lý Mapping Bảo Hiểm",
                    "admin.insuranceMapping.read":"Xem Mapping Bảo Hiểm",
                    "admin.insuranceMapping.create":"Tạo Mapping Bảo Hiểm",
                    "admin.insuranceMapping.update":"Sửa Mapping Bảo Hiểm",
                    "admin.insuranceMapping.delete":"Xóa Mapping Bảo Hiểm",

                    /* Danh Sách Hóa Đơn */
                    "admin.invoice":"Màn Hình Quản Lý Danh Sách Hóa Đơn",
                    "admin.invoice.read":"Xem Danh Sách Hóa Đơn",
                    "admin.invoice.create":"Tạo Danh Sách Hóa Đơn",
                    "admin.invoice.update":"Sửa Danh Sách Hóa Đơn",
                    "admin.invoice.delete":"Xóa Danh Sách Hóa Đơn",
                    "admin.invoice.cancel":"Hủy Hóa Đơn Đã Bán",

                    /* Hóa Đơn Bảo Hiểm */
                    "admin.insuranceInvoice":"Màn Hình Quản Lý Hóa Đơn Bảo Hiểm",
                    "admin.insuranceInvoice.read":"Xem Hóa Đơn Bảo Hiểm",
                    "admin.insuranceInvoice.create":"Tạo Hóa Đơn Bảo Hiểm",
                    "admin.insuranceInvoice.update":"Sửa Hóa Đơn Bảo Hiểm",
                    "admin.insuranceInvoice.delete":"Xóa Hóa Đơn Bảo Hiểm",

                    /* SideBar */
                    "admin.users.sideBar":"Nhân Sự",
                    "admin.notification.sideBar":"Thông Báo",
                    "admin.paymentManagement.sideBar":"Thanh Toán",
                    "admin.report.sideBar":"Báo Cáo",
                    "admin.system.sideBar":"Hệ Thống",
                    "admin.equipmentManagement.sideBar":"Quản Lý Thiết Bị",
                    "admin.icdManagement.sideBar":"Quản Lý ICD",
                    "admin.drugStoreManagement.sideBar":"Quản Lý Nhà Thuốc",
                    "admin.patientManagement.sideBar":"Quản Lý Bệnh Nhân",
                    "admin.schedule.sideBar":"Lịch Khám",
                    "admin.test.sideBar":"Xét Nghiệm",
                    "admin.medicalExamination.sideBar":"Khám Bệnh",
                    "admin.attendance.sideBar":"Chấm Công",
                    "admin.insurance.sideBar":"Bảo Hiểm",
                    "admin.invoiceManagement.sideBar":"Hóa Đơn",
                    "admin.ticket.sideBar" : "Hỗ trợ",
                    "admin.template.sideBar" : "Mẫu bệnh án",
                    "admin.drugCabinet.sideBar" : "Quản Lý Tủ Thuốc",
                     /* Mẫu bệnh án */
                     "admin.template":"Màn Hình Quản Lý Mẫu bệnh án",
                     "admin.template.read":"Xem Mẫu bệnh án",
                     "admin.template.create":"Tạo Mẫu bệnh án",
                     "admin.template.update":"Sửa Mẫu bệnh án",
                     "admin.template.delete":"Xóa Mẫu bệnh án",
                     /* Hóa Đơn Bảo Hiểm */
                     "admin.ticket":"Màn Hình Quản Lý Hỗ trợ",
                     "admin.ticket.read":"Xem Hỗ trợ",
                     "admin.ticket.create":"Tạo Hỗ trợ",
                     "admin.ticket.update":"Sửa Hỗ trợ",
                     "admin.ticket.delete":"Xóa Hỗ trợ",
                        
                    "admin.drugCabinet" : "Màn Hình Quản Lý Tủ Thuốc",
                    "admin.drugCabinet.read" : "Xem Tủ Thuốc",
                    "admin.drugCabinet.create" : "Thêm Mới Tủ Thuốc",
                    "admin.drugCabinet.update" : "Cập Nhật Tủ Thuốc",
                    "admin.drugCabinet.delete" : "Xóa Tủ Thuốc",

                    "admin.listDrugCabinet" : "Màn Hình Quản Lý Danh Sách Tủ Thuốc",
                    "admin.listDrugCabinet.read" : "Xem Danh Sách Tủ Thuốc",

                    "admin.listInputCabinetForm" : "Màn Hình Quản Lý Phiếu Lĩnh Dược",
                    "admin.listInputCabinetForm.read" : "Xem Phiếu Lĩnh Dược",
                    "admin.listInputCabinetForm.create" : "Thêm Phiếu Lĩnh Dược",
                    "admin.listInputCabinetForm.update" : "Cập Nhật Phiếu Lĩnh Dược",
                    "admin.listInputCabinetForm.delete" : "Xóa Phiếu Lĩnh Dược",

                   
                    "admin.outputCabinet" : "Màn Hình Quản Lý Cấp Thuốc Điều Dưỡng",
                    "admin.outputCabinet.sideBar" : "Menu Quản Lý Cấp Thuốc Điều Dưỡng",
                    "admin.outputCabinet.read" : "Xem Danh Sách",

                    "admin.configTable" : "Màn Hình Quản Lý Phí Khám",
                    "admin.configTable.read" : "Xem Danh Sách Phí Khám",

                    "admin.drugByStore" : "Màn Hình Quản Lý Thuốc Theo Kho",
                    "admin.drugByStore.read" : "Xem Thuốc Theo Kho",

                    "admin.cBKetHopThuoc" : "Màn Hình Thêm Cảnh Báo Kết Hợp Thuốc",
                    "admin.cBKetHopThuoc.create" : "Thêm Cảnh Báo Kết Hợp Thuốc",
                    "admin.cBKetHopThuoc.update" : "Cập Nhật Cảnh Báo Kết Hợp Thuốc",
                    "admin.cBKetHopThuoc.delete" : "Xóa Cảnh Báo Kết Hợp Thuốc",
                    "admin.cBKetHopThuoc.read" : "Xem Cảnh Báo Kết Hợp Thuốc",
                    "admin.kTKhoTongQuat" : "Màn Hình Kiểm Tra Kho Tổng Quát",
                    "admin.kTKhoTongQuat.read" : "Xem Kiểm Tra Kho Tổng Quát",

                    "admin.tdInput" : "Thẻ Nhập Kho",
                    "admin.tdInput.read" : "Xem Thẻ Nhập Kho",
                    "admin.tdOutput" : "Thẻ Xuất Kho",
                    "admin.tdOutput.read" : "Xem Thẻ Xuất Kho",
                    "admin.configDayDrug" : "Cấu Hình Ngày Hạn Thuốc",
                    "admin.configDayDrug.read" : "Xem Cấu Hình Ngày Hạn Thuốc",
                    "admin.dsXuatTraCty" : "Xuất Trả Thuốc Công Ty",
                    "admin.dsXuatTraCty.read" : "Cho Phép Xem",
                    "admin.dsXuatTraCty.create" : "Cho Phép Thao Tác",
                    "admin.uotputDangeDrug" : "Xuất Thuốc Hủy",
                    "admin.uotputDangeDrug.read" : "Cho Phép Xem ",
                    "admin.uotputDangeDrug.create" : "Cho Phép Thao Tác",
                    "admin.cbDayDrug" : "Màn Hình Cảnh Báo Hết Hạn Thuốc",
                    "admin.cbDayDrug.read" : "Cho Phép Xem",

                    "XET_NGHIEM" : "Xét Nghiệm",
                    "CHAN_DOAN_HINH_ANH" : "Chẩn Đoán Hình Ảnh",
                    "THAM_DO_CHUC_NANG" : "Thăm Dò Chức Năng",
                    "THU_THUAT" : "Thủ Thuật - Phẫu Thuật",
                    "admin.reportBHYT" : "Màn hình báo cáo BHYT",
                    "admin.reportBHYT.read" : "Cho phép xem",
                    "admin.reportCheckDrug" : "Màn Hình Danh Sách Kiểm Kho",
                    "admin.reportCheckDrug.read" : "Cho phép xem",
                    "NHAP_KHO" :'Nhập',
                    "XUAT_KHO" : 'Xuất',
                    "KIEM_KHO" : 'Kiểm'
                }
            }
        },
        fallbackLng: 'vi',
        debug: true,

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

        react: {
            wait: true
        }
    });

export default i18n;
