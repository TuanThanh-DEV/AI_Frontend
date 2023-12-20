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

import com.logsik.timec.domain.InsuranceType;
import com.logsik.timec.dtos.InsuranceTypeDto;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.repository.InsuranceTypeRepository;
import com.logsik.timec.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class InsuranceTypeController extends AbstractController {

	private static final Logger LOGGER = LoggerFactory.getLogger(InsuranceType.class);

	@Autowired 
	private InsuranceTypeRepository insuranceTypeRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("insuranceType/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(insuranceTypeRepository.findById(id));
	}


	@DeleteMapping("/insuranceType/{id}")
	public RestResult deleteInsuranceType(@PathVariable("id") Long id) {
		System.out.println("Delete InsuranceType with ID = " + id + "...");

		try {
			insuranceTypeRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete InsuranceType.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/insuranceType/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if(search != null) {
			result = insuranceTypeRepository.findByNameContainingOrCodeContaining(search, search, pageable);
		}else {
			result = insuranceTypeRepository.findAll(pageable);
		}
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/insuranceType/listAll")
	public RestResult listAll() {
		return new RestResult (insuranceTypeRepository.findAll());
	}
	
	
	
	
}
