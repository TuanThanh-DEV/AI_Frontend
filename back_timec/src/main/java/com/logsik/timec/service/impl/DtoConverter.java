package com.logsik.timec.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
















//import com.logsik.timec.domain.InsuranceCompany;






















import com.logsik.timec.domain.Role;






import com.logsik.timec.domain.User;

import com.logsik.timec.domain.UserConfig;

import com.logsik.timec.domain.UserDepartment;

import com.logsik.timec.domain.UserRole;


import com.logsik.timec.dtos.AccountCodeDto;
import com.logsik.timec.dtos.AddSalaryDto;
import com.logsik.timec.dtos.AppointmentDto;
import com.logsik.timec.dtos.BillingDto;
import com.logsik.timec.dtos.BookingGroupDto;
import com.logsik.timec.dtos.CashDeskDto;
import com.logsik.timec.dtos.CashWidrawalDto;
import com.logsik.timec.dtos.CompanyDto;
import com.logsik.timec.dtos.ConfigDayDrugDTO;
import com.logsik.timec.dtos.ConfigTableDTO;
import com.logsik.timec.dtos.ConfigWarningDrugDTO;
import com.logsik.timec.dtos.CouponDto;
import com.logsik.timec.dtos.DashboardNotificationDto;
import com.logsik.timec.dtos.DayRevenueDto;
import com.logsik.timec.dtos.DepartmentDto;
import com.logsik.timec.dtos.DeviceDto;
import com.logsik.timec.dtos.DeviceMaintenanceDto;
import com.logsik.timec.dtos.DiagnosisGroupDto;

import com.logsik.timec.dtos.DiagnosisServiceDto;
import com.logsik.timec.dtos.DrugCabinetDTO;
import com.logsik.timec.dtos.DrugCategoryDto;
import com.logsik.timec.dtos.DrugDto;
import com.logsik.timec.dtos.DrugStoreDto;
import com.logsik.timec.dtos.HelpCommentDto;
import com.logsik.timec.dtos.HelpTicketDto;
import com.logsik.timec.dtos.HospitalDto;
import com.logsik.timec.dtos.IcdDto;
import com.logsik.timec.dtos.InputCabinetDTO;
import com.logsik.timec.dtos.InputCabinetFormDTO;
import com.logsik.timec.dtos.InputFormDto;
import com.logsik.timec.dtos.InputStockDto;
import com.logsik.timec.dtos.InsuranceCardDto;
import com.logsik.timec.dtos.InsuranceCompanyDto;
import com.logsik.timec.dtos.InsuranceInvoiceDto;
import com.logsik.timec.dtos.InsuranceInvoiceItemDto;
import com.logsik.timec.dtos.InsuranceMappingDto;
import com.logsik.timec.dtos.InsuranceTypeDto;
import com.logsik.timec.dtos.InvoiceDto;
import com.logsik.timec.dtos.InvoiceItemDto;

import com.logsik.timec.dtos.LedgerDto;
import com.logsik.timec.dtos.MaintenancePlanDto;
import com.logsik.timec.dtos.MinusSalaryDto;
import com.logsik.timec.dtos.MonthRevenueDto;
import com.logsik.timec.dtos.OutputCabinetDTO;
import com.logsik.timec.dtos.OutputFormDto;
import com.logsik.timec.dtos.OutputStockDto;
import com.logsik.timec.dtos.PackageDto;
import com.logsik.timec.dtos.PackageItemDto;
import com.logsik.timec.dtos.PatientBookingGroupDto;
import com.logsik.timec.dtos.PatientDto;
import com.logsik.timec.dtos.PaymentDto;
import com.logsik.timec.dtos.PreTemplateDto;
import com.logsik.timec.dtos.PreTemplateFieldDto;
import com.logsik.timec.dtos.PreTemplateItemDto;

import com.logsik.timec.dtos.PrescriptionFormDto;
import com.logsik.timec.dtos.PrescriptionFormItemDto;
import com.logsik.timec.dtos.PrescriptionItemDto;
import com.logsik.timec.dtos.PrescriptionReviewDto;
import com.logsik.timec.dtos.ProcedureMemberDto;
import com.logsik.timec.dtos.ProcedureReportDto;
import com.logsik.timec.dtos.ProcedureServiceDto;
import com.logsik.timec.dtos.QueueDto;
import com.logsik.timec.dtos.QueueNumberDto;
import com.logsik.timec.dtos.QueuePatientDto;
import com.logsik.timec.dtos.RoleDto;
import com.logsik.timec.dtos.ShortCodeDto;
import com.logsik.timec.dtos.StockCabinetDTO;

import com.logsik.timec.dtos.SupplierDto;
import com.logsik.timec.dtos.TransferFormDto;
import com.logsik.timec.dtos.TransferHospitalDto;
import com.logsik.timec.dtos.TrialBalanceDto;
import com.logsik.timec.dtos.UomDto;
import com.logsik.timec.dtos.UploadFileResponse;
import com.logsik.timec.dtos.UserAttendanceDto;
import com.logsik.timec.dtos.UserConfigDto;
import com.logsik.timec.dtos.UserContextDto;
import com.logsik.timec.dtos.UserDepartmentDto;
import com.logsik.timec.dtos.UserDto;

import com.logsik.timec.dtos.UserRoleDto;
import com.logsik.timec.dtos.UserSalaryDto;
import com.logsik.timec.dtos.YearBalanceDto;
import com.logsik.timec.enums.DrugType;



































import com.logsik.timec.repository.RoleRepository;





import com.logsik.timec.repository.UserConfigRepository;

import com.logsik.timec.repository.UserDepartmentRepository;
import com.logsik.timec.repository.UserRoleRepository;



/**
 * Created by phamcongbang on 10/04/2018.
 */
@Service
public class DtoConverter {
	@Autowired
	private ModelMapper modelMapper;

	// Never map to Hibernate entity with modelMapper, map wrong id to any field
	// xxxId, password is empty
	@PostConstruct
	private void postConstruct() {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
	}

	public User convertToUser(UserDto userDto) {
		User user = new User();
		return fillUserForm(user, userDto);
	}
	
	

	public User fillUserForm(User user, UserDto userDto) {
		modelMapper.map(userDto, user);
		if (user.getRoles() != null) {
			user.getRoles().clear();
			for (Role role : userDto.getRoles()) {
				user.getRoles().add(role);
			}
		} else {
			user.setRoles(userDto.getRoles());
		}
	

		return user;
	}
	
	

//****************************User File & Image******************************
	public UserDto convertToUserDto(User user) {
		UserDto dto = modelMapper.map(user, UserDto.class);
		
		return dto;
	}



	

//******************************End User File & Image******************************

	// - Role
	@Autowired
	RoleRepository roleRepository;

	public Role convertToRole(RoleDto roleDto) {
		Role role = null;
		if (roleDto.getId() != null) {
			role = roleRepository.findById(roleDto.getId());
		} else {
			role = new Role();
		}
		modelMapper.map(roleDto, role);
		return role;
	}

// - Supplier
	@Autowired
	UserRoleRepository userRoleRepository;

	public UserRole convertToUserRole(UserRoleDto userRoleDto) {
		UserRole userRole = null;
		if (userRoleDto.getId() != null) {
			userRole = userRoleRepository.findById(userRoleDto.getId());
		} else {
			userRole = new UserRole();
		}
		modelMapper.map(userRoleDto, userRole);
		return userRole;
	}

// - Supplier


// 

	// - DayRevenue
	

	// - MonthRevenue
	
// - Icd
	

// - Patient
	
	
	

// - Uom
	
// - Queue


// - UserAttendance
	

// - DrugCategory
	
// - DrugCategory
	

// - Drug
	
	
// -- StockCabinet
	

// - MedicalSupplies
	
	// - Group
	

// - ShortCode
	

// - DiagnosisService
	

// - TransferHospital
	

// - TransferForm
	

// - DiagnosisGroup
	

// - UserSalary


// - DashboardNotification
	

// - Hospital
	

// - Department


// - Stock


	
// - DrugStore
	

// - CashDesk
	
// - CashWidrawal
	

// - UserDepartment
	@Autowired
	UserDepartmentRepository userDepartmentRepository;

	public UserDepartment convertToUserDepartment(UserDepartmentDto userDepartmentDto) {
		UserDepartment userDepartment = null;
		if (userDepartmentDto.getId() != null) {
			userDepartment = userDepartmentRepository.findById(userDepartmentDto.getId());
		} else {
			userDepartment = new UserDepartment();
		}
		modelMapper.map(userDepartmentDto, userDepartment);
		return userDepartment;
	}

// - Prescription
	
	
	

	

//	public Prescription fillPrescriptionForm(Prescription destination, Prescription form) {
//			if(form.getUser().equals(destination.getUser()) == false) {
//				destination.setUser(form.getUser());
//			}
//			if(form.getCls() != null && form.getCls().equals(destination.getCls())== false) {
//				destination.setCls(form.getCls());
//			}
//			if(form.getAnalysis() != null && form.getAnalysis().equals(destination.getAnalysis()) == false) {
//				destination.setAnalysis(form.getAnalysis());
//			}
//			if(form.getIcd() != null && form.getIcd().equals(destination.getIcd())== false ) {
//				destination.setIcd(form.getIcd());
//			}
//			if(form.getSubIcd() != null && form.getSubIcd().equals(destination.getSubIcd()) == false) {
//				destination.setSubIcd(form.getSubIcd());
//			}
//			if(form.getSolution() != null && form.getSolution().equals(destination.getSolution()) == false) {
//				destination.setSolution(form.getSolution());
//			}
//			if(form.getNumberDayOff() != null && form.getNumberDayOff().equals(destination.getNumberDayOff()) == false) {
//				destination.setNumberDayOff(form.getNumberDayOff());
//			}
//			if(form.getNumberDayOff() != null && form.getFromDayOff().equals(destination.getFromDayOff()) == false) {
//				destination.setFromDayOff(form.getFromDayOff());
//			}
//			if(form.getMach() != null && form.getMach().equals(destination.getMach()) == false) {
//				destination.setMach(form.getMach());
//			}
//			if(form.getNhipTho() != null && form.getNhipTho().equals(destination.getNhipTho()) == false) {
//				destination.setNhipTho(form.getNhipTho());
//			}
//			if(form.getNhietDo() != null && form.getNhietDo().equals(destination.getNhietDo()) == false) {
//				destination.setNhietDo(form.getNhietDo());
//			}
//			if(form.getHuyetAp() != null && form.getHuyetAp().equals(destination.getHuyetAp()) ==  false) {
//				destination.setHuyetAp(form.getHuyetAp());
//			}
//			if(form.getHeight() != null && form.getHeight().equals(destination.getHeight()) == false) {
//				destination.setHeight(form.getHeight());
//			}
//			if(form.getWeight() != null && form.getWeight().equals(destination.getWeight()) == false) {
//				destination.setWeight(form.getWeight());
//			}
//			if(form.getInsuranceType() == null) {
//				destination.setInsuranceType(null);
//			}else if(form.getInsuranceType() != null && form.getInsuranceType().equals(destination.getInsuranceType()) == false) {
//				destination.setInsuranceType(form.getInsuranceType());
//			}
//		return destination;
//	}

// - InsuranceType
	

// - InsuranceCard
	

// - UserConfig
	@Autowired
	UserConfigRepository userConfigRepository;

	public UserConfig convertToUserConfig(UserConfigDto userConfigDto) {
		UserConfig userConfig = null;
		if (userConfigDto.getId() != null) {
			userConfig = userConfigRepository.findById(userConfigDto.getId());
		} else {
			userConfig = new UserConfig();
		}
		modelMapper.map(userConfigDto, userConfig);
		return userConfig;
	}

// - ProcedureService
	

// - ProcedureReport
	

// - ProcedureMember
	

// - Payment

// - QueueNumber
	

// - PatientBookingGroup
	

// - InputStock
	

// - OutputStock
	
	
// - OutputForm
	
	
// - InputForm
	

// - InsuranceMapping
	

// - InsuranceInvoice
	

// - InsuranceInvoiceItem
	
// - InvoiceItem
	

// - Invoice
	

// - PrescriptionItem
	

// - InsuranceCompany


// 

// 

// - Company
	
// - BookingGroup
	

// - PrescriptionReview
	

	// -- upload File DiagnosisReport

	
	// - DiagnosisReport
	
	// - Appointment
	

	// - UserContext
	

	// - AddSalary


	// - MinusSalary
	

	// HelpTicket
	

	// HelpComment
	

	
	// Billing
	

	// Journal
	
	// Journal
	
	// TrialBalance
	
	
	// TrialBalance
		
		
		
		
		
		
		
		
		
		
		
		
	
		
//		
		
	// - DrugCabinet
	
	
	// - InputCabinetForm
	
	
	// - InputCabinet
		
		
	// - InputCabinet
			
			
// - InputCabinet
			
			
	// - ConfigWarningDrug
	
	
	// - UserContext
	
}
