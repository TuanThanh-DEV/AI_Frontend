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

import com.logsik.timec.domain.User;
import com.logsik.timec.domain.UserDepartment;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.dtos.UserDepartmentDto;
import com.logsik.timec.repository.UserDepartmentRepository;
import com.logsik.timec.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class UserDepartmentController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(User.class);

	@Autowired
	private UserDepartmentRepository userDepartmentRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("userDepartment/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(userDepartmentRepository.findById(id));
	}

	@RequestMapping(value = "/userDepartment/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody UserDepartmentDto userDepartmentDto) {
		try {
			UserDepartment newuserDepartment = userDepartmentRepository.save(dtoConverter.convertToUserDepartment(userDepartmentDto));

			return new RestResult(newuserDepartment);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/userDepartment/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody UserDepartmentDto userDepartmentDto) {
		try {
			UserDepartment updatedcontract = userDepartmentRepository.save(dtoConverter.convertToUserDepartment(userDepartmentDto));

			return new RestResult(updatedcontract);
		} catch (Exception e) {
			LOGGER.error("Error when updating userDepartment.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/userDepartment/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			userDepartmentRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete userDepartment.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/userDepartment/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;
			result = userDepartmentRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/userDepartment/listAll")
	public RestResult listAll() {
		return new RestResult(userDepartmentRepository.findAll());

	}
	
	@RequestMapping(value = "/userDepartment/listByUser")
	public RestResult listByUser(@RequestParam("userId") Long userId) {
		Object result;
			result = userDepartmentRepository.findByUserId(userId);
		return new RestResult(result);
	}

}
