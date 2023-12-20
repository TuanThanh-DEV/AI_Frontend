package com.logsik.timec.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.timec.domain.Appointment;
import com.logsik.timec.domain.Company;
import com.logsik.timec.domain.FileUpload;
import com.logsik.timec.domain.HelpComment;
import com.logsik.timec.domain.HelpTicket;
import com.logsik.timec.domain.Patient;
import com.logsik.timec.domain.Role;
import com.logsik.timec.domain.User;
import com.logsik.timec.domain.UserRole;
import com.logsik.timec.dtos.AppointmentDto;
import com.logsik.timec.dtos.CompanyDto;
import com.logsik.timec.dtos.HelpCommentDto;
import com.logsik.timec.dtos.HelpTicketDto;
import com.logsik.timec.dtos.PatientDto;
import com.logsik.timec.dtos.RoleDto;
import com.logsik.timec.dtos.UploadFileResponse;
import com.logsik.timec.dtos.UserDto;
import com.logsik.timec.dtos.UserRoleDto;
import com.logsik.timec.repository.AppointmentRepository;
import com.logsik.timec.repository.CompanyRepository;
import com.logsik.timec.repository.HelpCommentRepository;
import com.logsik.timec.repository.HelpTicketRepository;
import com.logsik.timec.repository.PatientRepository;
import com.logsik.timec.repository.RoleRepository;
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
	public UserDto convertToUserDto(User user, List<FileUpload> profiles, List<FileUpload> imageUpload) {
		UserDto dto = modelMapper.map(user, UserDto.class);
		dto.setImageUpload(
				imageUpload.stream().map(file -> convertToUploadUserImage(file)).collect(Collectors.toList()));
		dto.setProfiles(profiles.stream().map(file -> convertToUploadUserProfile(file)).collect(Collectors.toList()));
		return dto;
	}

	private UploadFileResponse convertToUploadUserProfile(FileUpload file) {
		return new UploadFileResponse(file.getName(), "/api/downloadUserProfile/" + file.getName(), null,
				file.getSize(), file.getUploadBy());
	}

	private UploadFileResponse convertToUploadUserImage(FileUpload file) {
		return new UploadFileResponse(file.getName(), "/api/downloadUserImage/" + file.getName(), null, file.getSize(),
				file.getUploadBy());
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

	@Autowired
	PatientRepository patientRepository;

	public Patient convertToPatient(PatientDto patientDto) {
		Patient patient = null;
		if (patientDto.getId() != null) {
			patient = patientRepository.findById(patientDto.getId());
		} else {
			patient = new Patient();
		}
		modelMapper.map(patientDto, patient);
		return patient;
	}

// - Company
	@Autowired
	CompanyRepository companyRepository;

	public Company convertToCompany(CompanyDto companyDto) {
		Company company = null;
		if (companyDto.getId() != null) {
			company = companyRepository.findById(companyDto.getId());
		} else {
			company = new Company();
		}
		modelMapper.map(companyDto, company);
		return company;
	}


	// - Appointment
	@Autowired
	private AppointmentRepository appointmentRepository;

	public Appointment convertToAppointment(AppointmentDto appointmentDto) {
		Appointment appointment = null;
		if (appointmentDto.getId() != null) {
			appointment = appointmentRepository.findById(appointmentDto.getId());
		} else {
			appointment = new Appointment();
		}
		modelMapper.map(appointmentDto, appointment);
		return appointment;
	}


	// HelpTicket
	@Autowired
	HelpTicketRepository helpTicketRepository;

	public HelpTicket convertToHelpTicket(HelpTicketDto helpTicketDto) {
		HelpTicket helpTicket = null;
		if (helpTicketDto.getId() != null) {
			helpTicket = helpTicketRepository.findById(helpTicketDto.getId());
		} else {
			helpTicket = new HelpTicket();
		}
		modelMapper.map(helpTicketDto, helpTicket);
		return helpTicket;
	}

	// HelpComment
	@Autowired
	HelpCommentRepository helpCommentRepository;

	public HelpComment convertToHelpComment(HelpCommentDto helpCommentDto) {
		HelpComment helpComment = null;
		if (helpCommentDto.getId() != null) {
			helpComment = helpCommentRepository.findById(helpCommentDto.getId());
		} else {
			helpComment = new HelpComment();
		}
		modelMapper.map(helpCommentDto, helpComment);
		return helpComment;
	}
}
