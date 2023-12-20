package com.logsik.timec.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.timec.domain.InsuranceCompany;
import com.logsik.timec.dtos.InsuranceCompanyDto;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.repository.InsuranceCompanyRepository;
import com.logsik.timec.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class InsuranceCompanyController extends AbstractController {

	private static final Logger LOGGER = LoggerFactory.getLogger(InsuranceCompany.class);

	@Autowired 
	private InsuranceCompanyRepository insuranceCompanyRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("insuranceCompany/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(insuranceCompanyRepository.findById(id));
	}


	@DeleteMapping("/insuranceCompany/{id}")
	public RestResult deleteInsuranceCompany(@PathVariable("id") Long id) {
		System.out.println("Delete InsuranceCompany with ID = " + id + "...");

		try {
			insuranceCompanyRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete InsuranceCompany.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/insuranceCompany/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if(search != null) {
			result = insuranceCompanyRepository.findByNameContaining(search, pageable);
		}else {
			result = insuranceCompanyRepository.findAll(pageable);
		}
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/insuranceCompany/listAll")
	public RestResult listAll() {
		return new RestResult (insuranceCompanyRepository.findAll());
	}
	
}
