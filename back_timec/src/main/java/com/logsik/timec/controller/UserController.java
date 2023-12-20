package com.logsik.timec.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
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

import com.logsik.timec.domain.User;
import com.logsik.timec.domain.UserConfig;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.dtos.UploadFileResponse;
import com.logsik.timec.dtos.UserDto;
import com.logsik.timec.enums.UserType;
import com.logsik.timec.queries.PersonelSpecification;

import com.logsik.timec.repository.UserConfigRepository;
import com.logsik.timec.repository.UserRepository;
import com.logsik.timec.service.impl.DtoConverter;
import com.logsik.timec.service.impl.UserService;

@RestController
@RequestMapping("/api")
@Transactional
public class UserController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
	private static final String DUPLICATE_EMAIL = "Không Được Trùng Email";
	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserConfigRepository userConfigRepository;

	

	@Autowired
	private DtoConverter dtoConverter;

//	@Autowired
//	private TokenStore tokenStore;

	@Autowired
	private AuthorizationServerConfig authorizationServerConfig;

	@RequestMapping("user/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		checkAuthorization("admin.users.read");
		User user = userRepository.findById(id);
		
		return new RestResult(dtoConverter.convertToUserDto(user));
	}
	
	@RequestMapping("/auth/logout")
	public RestResult logout() {
		User user = getCurrentUser();
		if (user != null) {
			authorizationServerConfig.removeRefreshToken(user.getEmail());
		}
		return new RestResult("Success");
	}

	@RequestMapping(value = "/user/add", method = RequestMethod.POST)
	public RestResult addUser(@RequestBody UserDto userDto) {
		checkAuthorization("admin.users.create");
		try {
			User user = dtoConverter.convertToUser(userDto);
			// TODO: Hash password error
			user.setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
			User newUser = userService.save(user);
		
			return new RestResult(newUser);
		} catch (Exception e) {
			LOGGER.error("Error when adding user.", e);
			return new RestResult(true, DUPLICATE_EMAIL);
		}
	}

	

	

	@RequestMapping(value = "/user/update", method = RequestMethod.POST)
	public RestResult updateUser(@RequestBody UserDto userDto) {
		checkAuthorization("admin.users.update");
		try {
			User userCheckVersion = userRepository.findById(userDto.getId());
			userDto.setId(userCheckVersion.getId());
			
			if (!StringUtils.isEmpty(userDto.getPassword())) {
				authorizationServerConfig.removeRefreshToken(userCheckVersion.getEmail());
			}
			
			if(userDto.getPassword() == null) {			
//				userDto.setPassword(BCrypt.hashpw(userCheckVersion.getPassword(), BCrypt.gensalt()));
				userDto.setPassword(userCheckVersion.getPassword());
			}else {
				userDto.setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
			}
			
			
			User userConvert = dtoConverter.fillUserForm(userCheckVersion, userDto);
			
			
			userConvert.setVersion(userCheckVersion.getVersion() + 1);
			User updatedUser = userService.save(userConvert);
			
			
			return new RestResult(updatedUser);
		} catch (Exception e) {
			LOGGER.error("Error when updating.", e);
			return new RestResult(true, DUPLICATE_EMAIL);
		}
	}
	
	@RequestMapping(value = "/user/changePassword", method = RequestMethod.POST)
	public RestResult changePassword(@RequestBody UserDto userDto) {
		if (!userDto.getId().equals(getCurrentUser().getId())) {
			return new RestResult(true, FORBIDDEN_ACCESS);
		}
		try {	
			User user = userRepository.findById(userDto.getId());
			if (!StringUtils.isEmpty(userDto.getPassword())) {
				user.setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
			}
			User updatedUser = userService.save(user);
//			authorizationServerConfig.removeRefreshToken(user.getEmail());
			return new RestResult(updatedUser);
		} catch (Exception e) {
			LOGGER.error("Error when updating user for taman.", e);
			return new RestResult(true, DUPLICATE_EMAIL);
		}
	}

	// Update labour contract
	private void updateUserProfile(User user, List<UploadFileResponse> newProfiles) {
		
		List<String> newProfilesString = newProfiles.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		
		

	}

	// Update User Image
	

	@DeleteMapping("/user/{id}")
	public RestResult deleteUser(@PathVariable("id") Long id) {
		checkAuthorization("admin.users.delete");
		LOGGER.info("Delete User with ID = " + id);

		try {
			userRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete User.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/user/findByFullNameOrPhoneOrEmail")
	public RestResult listFindByFullNameOrPhoneOrEmail(@RequestParam("fullNameOrPhoneOrEmail") String fullNameOrPhoneOrEmail, Pageable pageable) {
//		checkAuthorization("admin.users.read");
		Page<User> result = userRepository.findAll(new PersonelSpecification(fullNameOrPhoneOrEmail),pageable);
		
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/user/listAll")
	public RestResult listAll() {
		return new RestResult(userRepository.findAll());
	}
	
	@RequestMapping(value = "/user/listAllDoctor")
	public RestResult listAllDoctor() {
		return new RestResult(userRepository.findByUserType(UserType.DOCTOR));
	}
	
	@RequestMapping(value = "/user/findAllActiveNoConfig")
	public RestResult findAllActiveNoConfig() {
		List<User> listUser = userRepository.findByIsActive(true);
		List<UserConfig> listUserConfig =  userConfigRepository.findAll();
			
		for(UserConfig userConfig : listUserConfig) {
			listUser.remove(userConfig.getUser());
		}
		return new RestResult(listUser);
	}
	
	@RequestMapping(value = "/user/listAllDoctor/active")
	public RestResult listAllDoctorActive() {
		return new RestResult(userRepository.findByUserTypeAndIsActive(UserType.DOCTOR, true));
	}

}
