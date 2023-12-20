import { SecurityUtils } from "../../utils/javascriptUtils";

export const LOAD_UPDATING_PERSONEL = 'LOAD_UPDATING_PERSONEL';
export const LOAD_UPDATING_ROLE = 'LOAD_UPDATING_ROLE';

export const ALL_ROLES = [
    {
        moduleName: "Quản Lý Nhân Sự",
        entities: [
            {

                keys: [
                    "admin.users.sideBar",
                ]
            },
            {
                entityName: "admin.users",
                keys: [
                    "admin.users.read",
                    "admin.users.create",
                    "admin.users.update",
                    "admin.users.delete"
                ]
            },
            {
                entityName: "admin.roles",
                keys: [
                    "admin.roles.read",
                    "admin.roles.create",
                    "admin.roles.update",
                    "admin.roles.delete"
                ]
            },
            {
                entityName: "admin.userConfig",
                keys: [
                    "admin.userConfig.read",
                    "admin.userConfig.create",
                    "admin.userConfig.update",
                    "admin.userConfig.delete"
                ]
            }
        ]
    },


    {
        moduleName: "Thông Báo",
        entities: [
            {
                keys: [
                    "admin.notification.sideBar",
                ]
            },
            {
                entityName: "admin.dashboardNotification",
                keys: [
                    "admin.dashboardNotification.sideBar",
                    "admin.dashboardNotification.read",
                    "admin.dashboardNotification.create",
                    "admin.dashboardNotification.update",
                    "admin.dashboardNotification.delete"
                ]
            },
            {
                entityName: "admin.appointment",
                keys: [
                    "admin.appointment.read",
                    "admin.appointment.create",
                    "admin.appointment.update",
                    "admin.appointment.delete"
                ]
            }
        ]
    },

    {
        moduleName: "Kế Toán",
        entities: [
            {
                entityName: "admin.accountCode",
                keys: [
                    "admin.accountCode.sideBar",
                    "admin.accountCode.read",
                    "admin.accountCode.create",
                    "admin.accountCode.update",
                    "admin.accountCode.delete"
                ]
            },
            {
                entityName: "admin.journal",
                keys: [
                    "admin.journal.sideBar",
                    "admin.journal.read",
                    "admin.journal.create",
                    "admin.journal.update",
                    "admin.journal.delete"
                ]
            },
            {
                entityName: "admin.ledger",
                keys: [
                    "admin.ledger.sideBar",
                    "admin.ledger.read",
                    "admin.ledger.create",
                    "admin.ledger.update",
                    "admin.ledger.delete"
                ]
            },
            {
                entityName: "admin.yearBalance",
                keys: [
                    "admin.yearBalance.sideBar",
                    "admin.yearBalance.read",
                    "admin.yearBalance.create",
                    "admin.yearBalance.update",
                    "admin.yearBalance.goToDetail",
                    "admin.yearBalance.delete"
                ]
            },
            {
                entityName: "admin.trialBalance",
                keys: [
                    "admin.trialBalance.sideBar",
                    "admin.trialBalance.read",
                    "admin.trialBalance.create",
                    "admin.trialBalance.update",
                    "admin.trialBalance.delete"
                ]
            },
            // {
            //     entityName: "admin.appointment",
            //     keys: [
            //         "admin.appointment.read",
            //         "admin.appointment.create",
            //         "admin.appointment.update",
            //         "admin.appointment.delete"
            //     ]
            // }
        ]
    },


    {
        moduleName: "Quản Lý Thanh Toán",
        entities: [
            {
                keys: [
                    "admin.paymentManagement.sideBar",
                ]
            },
            {
                entityName: "admin.myCashDesk",
                keys: [
                    "admin.myCashDesk.read",
                    "admin.myCashDesk.create",
                    "admin.myCashDesk.update",
                    "admin.myCashDesk.delete"
                ]
            },
            {
                entityName: "admin.cashDesk",
                keys: [
                    "admin.cashDesk.read",
                    "admin.cashDesk.create",
                    "admin.cashDesk.update",
                    "admin.cashDesk.delete"
                ]
            },
            {
                entityName: "admin.myPrescriptionReview",
                keys: [
                    "admin.myPrescriptionReview.read",
                    "admin.myPrescriptionReview.create",
                    "admin.myPrescriptionReview.update",
                    "admin.myPrescriptionReview.delete"
                ]
            },
            {
                entityName: "admin.cashWidrawal",
                keys: [
                    "admin.cashWidrawal.read",
                    "admin.cashWidrawal.create",
                    "admin.cashWidrawal.update",
                    "admin.cashWidrawal.delete"
                ]
            },
            {
                entityName: "admin.payment",
                keys: [
                    "admin.payment.read",
                    "admin.payment.create",
                    "admin.payment.update",
                    "admin.payment.delete",
                    "admin.pagePaymentInvoice.read",
                    "admin.pagePaymentGroup.read"
                ]
            },
            {
                entityName: "admin.billing",
                keys: [
                    "admin.billing.read",
                    "admin.billing.create",
                    "admin.billing.update",
                    "admin.billing.delete"
                ]
            }
        ]
    },
    {
        moduleName: "Báo Cáo",
        entities: [
            {
                keys: [
                    "admin.report.sideBar",
                ]
            },
            {
                entityName: "admin.dayRevenue",
                keys: [
                    "admin.dayRevenue.read",
                    "admin.dayRevenue.create",
                    "admin.dayRevenue.update",
                    "admin.dayRevenue.delete"
                ]
            },
            {
                entityName: "admin.monthRevenue",
                keys: [
                    "admin.monthRevenue.read",
                    "admin.monthRevenue.create",
                    "admin.monthRevenue.update",
                    "admin.monthRevenue.delete"
                ]
            },
            {
                entityName: "admin.reportBHYT",
                keys: [
                    "admin.reportBHYT.read",
                ]
            },
            {
                entityName: "admin.reportCheckDrug",
                keys: [
                    "admin.reportCheckDrug.read",
                ]
            }

        ]
    },
    {
        moduleName: "Hệ Thống",
        entities: [
            {
                keys: [
                    "admin.system.sideBar",
                ]
            },
            {
                entityName: "admin.hospital",
                keys: [
                    "admin.appointment.sideBar",

                    "admin.hospital.read",
                    "admin.hospital.create",
                    "admin.hospital.update",
                    "admin.hospital.delete"
                ]
            },
            {
                entityName: "admin.department",
                keys: [
                    "admin.department.read",
                    "admin.department.create",
                    "admin.department.update",
                    "admin.department.delete"
                ]
            },
            {
                entityName: "admin.shortCode",
                keys: [
                    "admin.shortCode.read",
                    "admin.shortCode.create",
                    "admin.shortCode.update",
                    "admin.shortCode.delete"
                ]
            },
            {
                entityName: "admin.userContext",
                keys: [
                    "admin.userContext.read",
                    "admin.userContext.create",
                    "admin.userContext.update",
                    "admin.userContext.delete"
                ]
            },


        ]
    },
    {
        moduleName: "Quản Lý Thiết Bị",
        entities: [
            {
                keys: [
                    "admin.equipmentManagement.sideBar",
                ]
            },
            {
                entityName: "admin.supplier",
                keys: [
                    "admin.supplier.read",
                    "admin.supplier.create",
                    "admin.supplier.update",
                    "admin.supplier.delete"
                ]
            },
            {
                entityName: "admin.device",
                keys: [
                    "admin.device.read",
                    "admin.device.create",
                    "admin.device.update",
                    "admin.device.delete"
                ]
            },
            {
                entityName: "admin.deviceMaintenance",
                keys: [
                    "admin.deviceMaintenance.read",
                    "admin.deviceMaintenance.create",
                    "admin.deviceMaintenance.update",
                    "admin.deviceMaintenance.delete"
                ]
            },
            {
                entityName: "admin.maintenancePlan",
                keys: [
                    "admin.maintenancePlan.read",
                    "admin.maintenancePlan.create",
                    "admin.maintenancePlan.update",
                    "admin.maintenancePlan.delete"
                ]
            },


        ]
    },
    {
        moduleName: "Quản Lý ICD",
        entities: [
            {
                keys: [
                    "admin.icdManagement.sideBar",
                ]
            },
            {
                entityName: "admin.icd",
                keys: [
                    "admin.icd.read",
                    "admin.icd.create",
                    "admin.icd.update",
                    "admin.icd.delete"
                ]
            },
            {
                entityName: "admin.icdCategory",
                keys: [
                    "admin.icdCategory.read",
                    "admin.icdCategory.create",
                    "admin.icdCategory.update",
                    "admin.icdCategory.delete"
                ]
            },
        ]
    },
    {
        moduleName: "Quản Lý Nhà Thuốc",
        entities: [
            {
                keys: [
                    "admin.drugStoreManagement.sideBar",
                ]
            },
            {
                entityName: "admin.uom",
                keys: [
                    "admin.uom.read",
                    "admin.uom.create",
                    "admin.uom.update",
                    "admin.uom.delete"
                ]
            },
            {
                entityName: "admin.drugCategory",
                keys: [
                    "admin.drugCategory.read",
                    "admin.drugCategory.create",
                    "admin.drugCategory.update",
                    "admin.drugCategory.delete"
                ]
            },
            {
                entityName: "admin.group",
                keys: [
                    "admin.group.read",
                    "admin.group.create",
                    "admin.group.update",
                    "admin.group.delete"
                ]
            },
            {
                entityName: "admin.drug",
                keys: [
                    "admin.drug.read",
                    "admin.drug.create",
                    "admin.drug.update",
                    "admin.drug.delete"
                ]
            },
            {
                entityName: "admin.cBKetHopThuoc",
                keys: [
                    "admin.cBKetHopThuoc.read",
                    "admin.cBKetHopThuoc.create",
                    "admin.cBKetHopThuoc.update",
                    "admin.cBKetHopThuoc.delete"
                ]
            },
            {
                entityName: "admin.supplierDrug",
                keys: [
                    "admin.supplierDrug.read",
                    "admin.supplierDrug.create",
                    "admin.supplierDrug.update",
                    "admin.supplierDrug.delete"
                ]
            },
            {
                entityName: "admin.medicalSuppliesCategory",
                keys: [
                    "admin.medicalSuppliesCategory.read",
                    "admin.medicalSuppliesCategory.create",
                    "admin.medicalSuppliesCategory.update",
                    "admin.medicalSuppliesCategory.delete"
                ]
            },
            {
                entityName: "admin.medicalSupplies",
                keys: [
                    "admin.medicalSupplies.read",
                    "admin.medicalSupplies.create",
                    "admin.medicalSupplies.update",
                    "admin.medicalSupplies.delete"
                ]
            },
            {
                entityName: "admin.drugStore",
                keys: [
                    "admin.drugStore.read",
                    "admin.drugStore.create",
                    "admin.drugStore.update",
                    "admin.drugStore.delete"
                ]
            },
            {
                entityName: "admin.stock",
                keys: [
                    "admin.stock.read",
                    "admin.stock.create",
                    "admin.stock.validate",
                    "admin.stock.update",
                    "admin.stock.delete",
                    "admin.stock.checkAndUpdate",
                ]
            },
            {
                entityName: "admin.kTKhoTongQuat",
                keys: [
                    "admin.kTKhoTongQuat.read",
                ]
            },
            {
                entityName: "admin.tdInput",
                keys: [
                    "admin.tdInput.read",
                ]
            },
            {
                entityName: "admin.tdOutput",
                keys: [
                    "admin.tdOutput.read",
                ]
            },
            {
                entityName: "admin.dsXuatTraCty",
                keys: [
                    "admin.dsXuatTraCty.read",
                    "admin.dsXuatTraCty.create",
                ]
            },
            {
                entityName: "admin.uotputDangeDrug",
                keys: [
                    "admin.uotputDangeDrug.read",
                    "admin.uotputDangeDrug.create",
                ]
            },
            {
                entityName: "admin.configDayDrug",
                keys: [
                    "admin.configDayDrug.read",
                ]
            },
            {
                entityName: "admin.cbDayDrug",
                keys: [
                    "admin.cbDayDrug.read",
                ]
            },
            {
                entityName: "admin.alertStock",
                keys: [
                    "admin.alertStock.read",
                    "admin.alertStock.create",
                    "admin.alertStock.update",
                    "admin.alertStock.delete"
                ]
            },
            {
                entityName: "admin.allInputForm",
                keys: [
                    "admin.allInputForm.read",
                    "admin.allInputForm.create",
                    "admin.allInputForm.update",
                    "admin.allInputForm.delete",
                    "admin.allInputForm.cancelDoneInputForm"
                ]
            },
            {
                entityName: "admin.allOutputForm",
                keys: [
                    "admin.allOutputForm.read",
                    "admin.allOutputForm.create",
                    "admin.allOutputForm.update",
                    "admin.allOutputForm.delete"
                ]
            },
            {
                entityName: "admin.allMoveStoreForm",
                keys: [
                    "admin.allMoveStoreForm.read",
                    "admin.allMoveStoreForm.create",
                    "admin.allMoveStoreForm.update",
                    "admin.allMoveStoreForm.delete"
                ]
            },

        ]
    },
    {
        moduleName: "Quản Lý Bệnh Nhân",
        entities: [
            {
                entityName: "admin.patient",
                keys: [
                    "admin.patientManagement.sideBar",
                    "admin.patient.read",
                    "admin.patient.create",
                    "admin.patient.update",
                    "admin.patient.delete"
                ]
            },

        ]
    },
    {
        moduleName: "Quản Lý Lịch Khám",
        entities: [
            {
                keys: [
                    "admin.schedule.sideBar",
                ]
            },
            {
                entityName: "admin.queue",
                keys: [
                    "admin.queue.read",
                    "admin.queue.create",
                    "admin.queue.update",
                    "admin.queue.delete"
                ]
            },
            {
                entityName: "admin.company",
                keys: [
                    "admin.company.read",
                    "admin.company.create",
                    "admin.company.update",
                    "admin.company.delete"
                ]
            },
            {
                entityName: "admin.bookingGroup",
                keys: [
                    "admin.bookingGroup.read",
                    "admin.bookingGroup.create",
                    "admin.bookingGroup.update",
                    "admin.bookingGroup.delete"
                ]
            },

        ]
    },
    {
        moduleName: "Dịch Vụ Chỉ Định",
        entities: [
            {
                keys: [
                    "admin.test.sideBar",
                ]
            },
            {
                entityName: "admin.diagnosisGroup",
                keys: [
                    "admin.diagnosisGroup.read",
                    "admin.diagnosisGroup.create",
                    "admin.diagnosisGroup.update",
                    "admin.diagnosisGroup.delete"
                ]
            },
            {
                entityName: "admin.diagnosisService",
                keys: [
                    "admin.diagnosisService.read",
                    "admin.diagnosisService.create",
                    "admin.diagnosisService.update",
                    "admin.diagnosisService.delete"
                ]
            },
            {
                entityName: "admin.diagnosisReport",
                keys: [
                    "admin.diagnosisReport.read",
                    "admin.diagnosisReport.create",
                    "admin.diagnosisReport.update",
                    "admin.diagnosisReport.delete"
                ]
            },

        ]
    },

    {
        moduleName: "Khám Bệnh",
        entities: [
            {
                keys: [
                    "admin.medicalExamination.sideBar",
                ]
            },
            {
                entityName: "admin.transferHospital",
                keys: [
                    "admin.transferHospital.read",
                    "admin.transferHospital.create",
                    "admin.transferHospital.update",
                    "admin.transferHospital.delete"
                ]
            },
            {
                entityName: "admin.transferForm",
                keys: [
                    "admin.transferForm.read",
                    "admin.transferForm.create",
                    "admin.transferForm.update",
                    "admin.transferForm.delete"
                ]
            },
            {
                entityName: "admin.prescription",
                keys: [
                    "admin.prescription.read",
                    "admin.prescription.create",
                    "admin.prescription.update",
                    "admin.prescription.reopen",
                    "admin.prescription.delete"
                ]
            },
            {
                entityName: "admin.procedureService",
                keys: [
                    "admin.procedureService.read",
                    "admin.procedureService.create",
                    "admin.procedureService.update",
                    "admin.procedureService.delete"
                ]
            },
            {
                entityName: "admin.procedureMember",
                keys: [
                    "admin.procedureMember.read",
                    "admin.procedureMember.create",
                    "admin.procedureMember.update",
                    "admin.procedureMember.delete"
                ]
            },

        ]
    },
    {
        moduleName: "Chấm Công",
        entities: [
            {
                keys: [
                    "admin.attendance.sideBar",
                ]
            },
            {
                entityName: "admin.userAttendance",
                keys: [
                    "admin.userAttendance.read",
                    "admin.userAttendance.create",
                    "admin.userAttendance.update",
                    "admin.userAttendance.delete"
                ]
            },
            {
                entityName: "admin.userSalary",
                keys: [
                    "admin.userSalary.read",
                    "admin.userSalary.create",
                    "admin.userSalary.update",
                    "admin.userSalary.delete"
                ]
            },
            {
                entityName: "admin.prescriptionReview",
                keys: [
                    "admin.prescriptionReview.read",
                    "admin.prescriptionReview.create",
                    "admin.prescriptionReview.update",
                    "admin.prescriptionReview.delete"
                ]
            },

        ]
    },
    {
        moduleName: "Bảo Hiểm Y Tế",
        entities: [
            {
                keys: [
                    "admin.insurance.sideBar",
                ]
            },
            {
                entityName: "admin.insuranceType",
                keys: [
                    "admin.insuranceType.read",
                    "admin.insuranceType.create",
                    "admin.insuranceType.update",
                    "admin.insuranceType.delete"
                ]
            },
            {
                entityName: "admin.insuranceCard",
                keys: [
                    "admin.insuranceCard.read",
                    "admin.insuranceCard.create",
                    "admin.insuranceCard.update",
                    "admin.insuranceCard.delete"
                ]
            },
            {
                entityName: "admin.insuranceMapping",
                keys: [
                    "admin.insuranceMapping.read",
                    "admin.insuranceMapping.create",
                    "admin.insuranceMapping.update",
                    "admin.insuranceMapping.delete"
                ]
            },

        ]
    },
    {
        moduleName: "Quản Lý Hoá Đơn",
        entities: [
            {
                keys: [
                    "admin.invoiceManagement.sideBar",
                ]
            },
            {
                entityName: "admin.invoice",
                keys: [
                    "admin.invoice.read",
                    "admin.invoice.create",
                    "admin.invoice.update",
                    "admin.invoice.delete",
                    "admin.invoice.cancel"
                ]
            },
            {
                entityName: "admin.insuranceInvoice",
                keys: [
                    "admin.insuranceInvoice.read",
                    "admin.insuranceInvoice.create",
                    "admin.insuranceInvoice.update",
                    "admin.insuranceInvoice.delete"
                ]
            },


        ]
    },
    {
        moduleName: "Hỗ trợ",
        entities: [
            {
                keys: [
                    "admin.ticket.sideBar",
                ]
            },
            {
                entityName: "admin.ticket",
                keys: [
                    "admin.ticket.read",
                    "admin.ticket.create",
                    "admin.ticket.update",
                    "admin.ticket.delete"
                ]
            },
        ]
    },
    {
        moduleName: "Mẫu bệnh án",
        entities: [
            {
                keys: [
                    "admin.template.sideBar",
                ]
            },
            {
                entityName: "admin.template",
                keys: [
                    "admin.template.read",
                    "admin.template.create",
                    "admin.template.update",
                    "admin.template.delete"
                ]
            },
        ]
    },
    {
        moduleName: "Quản Lý Tủ Thuốc",
        entities: [
            {
                keys: [
                    "admin.drugCabinet.sideBar",
                ]
            },
            {
                entityName: "admin.drugCabinet",
                keys: [
                    "admin.drugCabinet.read",
                    "admin.drugCabinet.create",
                    "admin.drugCabinet.update",
                    "admin.drugCabinet.delete"
                ]
            },
            {
                entityName: "admin.listDrugCabinet",
                keys: [
                    "admin.listDrugCabinet.read"
                ]
            },
            {
                entityName: "admin.listInputCabinetForm",
                keys: [
                    "admin.listInputCabinetForm.read",
                    "admin.listInputCabinetForm.create",
                    "admin.listInputCabinetForm.update",
                    "admin.listInputCabinetForm.delete"
                ]
            },
        ]
    },
    {
        moduleName: "Quản Lý Điều Dưỡng",
        entities: [
            {
                keys: [
                    "admin.outputCabinet.sideBar",
                ]
            },
            {
                entityName: "admin.outputCabinet",
                keys: [
                    "admin.outputCabinet.read",
                ]
            },
        ]
    },
    {
        moduleName: "Quản Lý Phí Khám",
        entities: [
            {
                entityName: "admin.configTable",
                keys: [
                    "admin.configTable.read",
                ]
            },
        ]
    },
    {
        moduleName: "Quản Lý Thuốc Theo Kho",
        entities: [
            {
                entityName: "admin.drugByStore",
                keys: [
                    "admin.drugByStore.read",
                ]
            },
        ]
    },
]

