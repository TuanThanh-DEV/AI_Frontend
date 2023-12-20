package com.logsik.timec.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.timec.domain.Hospital;
import com.logsik.timec.dtos.HospitalDto;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.repository.HospitalRepository;
import com.logsik.timec.service.impl.ActiveHospitalService;
import com.logsik.timec.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class HospitalController extends AbstractController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(HospitalController.class);

	@Autowired
	private HospitalRepository hospitalRepository;

	@Autowired
	private DtoConverter dtoConverter; 
	
	@Autowired
	private ActiveHospitalService activeHospitalService; 
	
	@RequestMapping("/hospital/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(hospitalRepository.findById(id));
	}

	@RequestMapping(value = "/hospital/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if (search.isEmpty()) {
			result = hospitalRepository.findAll(pageable);
		}else {
			result = hospitalRepository.findByNameContaining(search,pageable);
		}
	
		return new RestResult(result);
	}

	@RequestMapping(value = "/hospital/listAll")
	public RestResult listAll() {
		return new RestResult(hospitalRepository.findAllByHasActive(true));

	}

}
