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

import com.logsik.timec.domain.UserConfig;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.dtos.UserConfigDto;
import com.logsik.timec.repository.UserConfigRepository;
import com.logsik.timec.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class UserConfigController extends AbstractController {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserConfig.class);

	@Autowired
	private UserConfigRepository userConfigRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("userConfig/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(userConfigRepository.findById(id));
	}

	@RequestMapping(value = "/userConfig/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody UserConfigDto userConfigDto) {
		try {
			UserConfig newUserConfig= userConfigRepository.save(dtoConverter.convertToUserConfig(userConfigDto));
			return new RestResult(newUserConfig);
		} catch (Exception e) {
			LOGGER.error("Error when adding UserConfig.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/userConfig/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody UserConfigDto userConfigDto) {
		try {
			UserConfig updatedUserConfig= userConfigRepository.save(dtoConverter.convertToUserConfig(userConfigDto));
			return new RestResult(updatedUserConfig);
		} catch (Exception e) {
			LOGGER.error("Error when updating UserConfig.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/userConfig/{id}")
	public RestResult deleteUserConfig(@PathVariable("id") Long id) {
		System.out.println("Delete UserConfig with ID = " + id + "...");

		try {
			userConfigRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete UserConfig.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/userConfig/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if(search != null) {
			result = userConfigRepository.findByUserFullNameContaining(search ,pageable);
		}else {
			result = userConfigRepository.findAll(pageable);
		}
			
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/userConfig/listAll")
	public RestResult listAll() {
		return new RestResult (userConfigRepository.findAll());
	}
	
	@RequestMapping(value = "/userConfig/listAllUserAndHass")
	public RestResult listAllUserAndHass() {
		return new RestResult (userConfigRepository.findByHasSalary(true));
	}
	
	

}
