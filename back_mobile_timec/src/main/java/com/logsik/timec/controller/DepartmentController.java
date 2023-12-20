package com.logsik.timec.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.repository.DepartmentRepository;
import com.logsik.timec.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class DepartmentController extends AbstractController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DepartmentController.class);

	@Autowired
	private DepartmentRepository departmentRepository;
	
	@Autowired
	private DtoConverter dtoConverter;
	
	@RequestMapping("department/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(departmentRepository.findById(id));
	}


	@DeleteMapping("/department/{id}")
	public RestResult delete(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete Department with ID = " + id + "...");

		try {
			departmentRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete Department.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}
		return new RestResult("ok");
	}

	@RequestMapping(value = "/department/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if (search.isEmpty()) {
			result = departmentRepository.findAll(pageable);
		}else {
			result = departmentRepository.findByNameContaining(search,pageable);
		}
	
		return new RestResult(result);
	}

	@RequestMapping(value = "/department/listAll")
	public RestResult listAll() {
		return new RestResult(departmentRepository.findAllByHasActive(true));

	}
	
	@RequestMapping(value = "/department/listAllByHospitalId")
	public RestResult listAllByHospitalId(@RequestParam("hospitalId") long hospitalId) {
		return new RestResult(departmentRepository.findByHospitalId(hospitalId));

	}

}
