package com.logsik.timec.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.timec.config.AuthorizationServerConfig;
import com.logsik.timec.config.BCrypt;
import com.logsik.timec.domain.InsuranceCard;
import com.logsik.timec.domain.Patient;
import com.logsik.timec.domain.User;
import com.logsik.timec.dtos.PatientDto;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.repository.InsuranceCardRepository;
import com.logsik.timec.repository.PatientRepository;
import com.logsik.timec.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class PatientController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(PatientController.class);

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private InsuranceCardRepository insuranceCardRepository;

	@Autowired
	private DtoConverter dtoConverter;

	private AuthorizationServerConfig authorizationServerConfig;
	
	@RequestMapping("patient/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(patientRepository.findById(id));
	}

	@RequestMapping(value = "/patient/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if (search == null) {
			result = patientRepository.findAll(pageable);
		} else {
			result = patientRepository.findByFullNameContainingIgnoreCaseOrCodeOrPhoneOrEmail(search, search, search,
					search, pageable);

		}
		return new RestResult(result);
	}

	@RequestMapping(value = "/patient/listAll")
	public RestResult listAll() {
		return new RestResult(patientRepository.findAll());

	}
	
//	@RequestMapping(value = "/patient/login")
//	public RestResult login(@RequestParam("phone") Long phone , @RequestParam("password") String password ) {
//		
//		List<Patient> listPatient = new ArrayList<Patient>();
//		String token = "";
//		for (Patient patient : listPatient) {
//			if(phone.equals(patient.getPhone()) ) {
//				token = "success" ;
//				return new RestResult(token);
//			}else {
//				token = "fail" ;
//				return new RestResult(token);
//			}
//		}
//		
//		return new RestResult(token);
//		
//	}

	@RequestMapping(value = "/patient/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody PatientDto patientDto) {
		try {
			Patient newPatient = patientRepository.save(dtoConverter.convertToPatient(patientDto));
			InsuranceCard newInsuranceCard = new InsuranceCard();
			Patient patient = null;
			patient = patientRepository.save(newPatient);
			patient.setPassword(BCrypt.hashpw(patientDto.getPassword(), BCrypt.gensalt()));
			if (patient.getCode() == null) {
				Integer checkCode;
				Integer numberRandomRange = 8;
				checkCode = patient.getId().toString().length();
				Integer totalRange = numberRandomRange - checkCode;
				String title = "BN";
				String codeNumber = "";
				for (Integer i = 0; i < totalRange; i++) {
					codeNumber += "0";
				}
				String patientCode = title + codeNumber + patient.getId().toString();
				patient.setCode(patientCode);
				patientRepository.save(patient);
			}
			if (!StringUtils.isEmpty(patientDto.getInsuranceCode())) {
				newInsuranceCard.setPatientId(patient.getId());
				newInsuranceCard.setInsuranceCode(patientDto.getInsuranceCode());
				newInsuranceCard.setFromDate(patientDto.getFromDate());
				newInsuranceCard.setToDate(patientDto.getToDate());
				newInsuranceCard.setInsuranceTypeId(patientDto.getInsuranceTypeId());

				insuranceCardRepository.save(newInsuranceCard);
			}
			return new RestResult(patient);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/patient/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody PatientDto patientDto) {
		try {
			Patient updatedcontract = patientRepository.save(dtoConverter.convertToPatient(patientDto));
			
			Patient userCheckVersion = patientRepository.findById(patientDto.getId());
			patientDto.setId(userCheckVersion.getId());
			
			if (updatedcontract.getCode() == null) {
				Integer checkCode;
				Integer numberRandomRange = 8;
				checkCode = updatedcontract.getId().toString().length();
				Integer totalRange = numberRandomRange - checkCode;
				String title = "BN";
				String codeNumber = "";
				for (Integer i = 0; i < totalRange; i++) {
					codeNumber += "0";
				}
				String patientCode = title + codeNumber + updatedcontract.getId().toString();
				updatedcontract.setCode(patientCode);
				patientRepository.save(updatedcontract);
			}
			
			if (!StringUtils.isEmpty(patientDto.getPassword())) {
				authorizationServerConfig.removeRefreshToken(userCheckVersion.getEmail());
			}
			
			if(patientDto.getPassword() == null) {			
//				patientDto.setPassword(BCrypt.hashpw(userCheckVersion.getPassword(), BCrypt.gensalt()));
				patientDto.setPassword(userCheckVersion.getPassword());
			}else {
				patientDto.setPassword(BCrypt.hashpw(patientDto.getPassword(), BCrypt.gensalt()));
			}
			
			return new RestResult(updatedcontract);
		} catch (Exception e) {
			LOGGER.error("Error when updating patient.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/patient/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			patientRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete patient.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

}
