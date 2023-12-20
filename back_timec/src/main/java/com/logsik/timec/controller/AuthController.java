package com.logsik.timec.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.timec.domain.User;

import com.logsik.timec.repository.UserRepository;
import com.logsik.timec.service.impl.DtoConverter;
import com.logsik.timec.service.impl.UserService;

/**
 * Created by phamcongbang on 13/03/2018.
 */
//@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class AuthController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DtoConverter dtoConverter;

//    @RequestMapping(value ="/users", method = RequestMethod.GET)
//    @PreAuthorize("hasAuthority('ADMIN_USER')")
//    public List<User> getUsers(){
//        return userService.findAllUsers();
//    }

//    public static void main(String[] args) {
//    	System.out.println("Print pass 123456:");
//    	System.out.println(BCrypt.hashpw("123456", BCrypt.gensalt()));
//    }

	@RequestMapping(value = "/auth/getCurrentUser")
	public User getCurrentUser() {
		return super.getCurrentUser();
	}
	
	
	

//    @RequestMapping(value ="/user/checkActivation")
//    public String checkActivation(@RequestParam String email) {
//        User user = userService.findByEmail(email);
//        if (user != null) {
//           if (!user.isActive()) {
//               return "not_active";
//           } else if (user.isLock()) {
//               return "locked";
//           }
//        } else {
//            return "not_exist";
//        }
//        return "ok";
//    }
//
//    @RequestMapping(value ="/user/checkEmailExist")
//    public Boolean checkEmailExist(@RequestParam String email) {
//        User user = userService.findByEmail(email);
//        if (user != null) {
//            return true;
//        } else {
//            return false;
//        }
//    }
//
//
//    @RequestMapping(value ="/auth/sendForgetPasswordMail")
//    public Boolean sendForgetPasswordMail(@RequestParam String email) {
//        User user = userService.findByEmail(email);
//        if (user != null) {
//            mailClient.sendForgetPasswordMail(user);
//            return true;
//        } else {
//            return false;
//        }
//    }

//    @RequestMapping(value ="/auth/updatePasswordByToken", method = RequestMethod.POST)
//    public Boolean updatePasswordByToken(@RequestBody TokenAndPasswordDto tokenAndPasswordDto) {
//        long[] userAndToken = HashUtils.decodeUserTokenId(tokenAndPasswordDto.getToken());
//        long userId = userAndToken[0];
//        long tokenId = userAndToken[1];
//        UserToken userToken = userTokenRepository.findOne(tokenId);
//        if (userToken.getUserId() != userId || userToken.getExpiredDate().before(new Date())) {
//            return false;
//        } else {
//            User user = userRepository.findOne(userId);
//            user.setPassword(BCrypt.hashpw(tokenAndPasswordDto.getPassword(), BCrypt.gensalt()));
//            userRepository.save(user);
//            userTokenRepository.delete(tokenId); // token can be used only 1 time.
//            return true;
//        }
//    }

//    @RequestMapping(value ="/user/resendActivationMail")
//    public Boolean resendActivationMail(@RequestParam String email) {
//        User user = userService.findByEmail(email);
//        if (user != null) {
//            mailClient.sendActivationMail(user);
//            return true;
//        } else {
//            return false;
//        }
//    }
//    @RequestMapping(value ="/auth/activateAccount")
//    public Boolean activateAccount(@RequestParam String token) {
//        Long userId = HashUtils.decodeUserId(token);
//        if (userId != null) {
//            User user = userRepository.findOne(userId);
//            user.setActive(true);
//            userRepository.save(user);
//            return true;
//        } else {
//            return false; // token khong hop le
//        }
//    }
//
//    @RequestMapping(value = "/user/registration", method = RequestMethod.POST)
//    public Boolean registerAccount(@RequestBody UserDto userDto) {
//        try {
//            User user = dtoConverter.convertToUser(userDto);
//            if (userDto.getAgencyId() != null) {
//                User supervisor = userRepository.findByAgencyIdAndRole(userDto.getAgencyId(), UserRole.AGENCY).get(0);
//                user.setSaleId(supervisor.getSaleId());
//                user.setAgencyId(supervisor.getAgencyId());
//            } else if (!StringUtils.isEmpty(userDto.getAgencyRefCode())) {
//                User supervisor = userService.findByRefCode(userDto.getAgencyRefCode());
//                if (supervisor != null) {
//                    if (supervisor.getRole() == UserRole.SALE || supervisor.getRole() == UserRole.SALELEADER) {
//                        user.setSaleId(supervisor.getId());
//                    } else if (supervisor.getRole() == UserRole.AGENCY) {
//                        Agency agency = agencyRepository.findOne(supervisor.getAgencyId());
//
////                        Chi ho tro dai ly thuong hieu tadu su dung refCode
//                        if (agency != null && !agency.isHasCustomBrand()) {
//                            user.setSaleId(supervisor.getSaleId());
//                            user.setAgencyId(supervisor.getAgencyId());
//                        }
//                    } else if (supervisor.getRole() == UserRole.CUSTOMER) {
////                        TODO: Handle refCode of affiliate
//                    }
//                }
//            } else {
//                // SaleId and AgencyId is not set by default.
//            }
//
//            fillDefaultValuesAndFinish(userDto, user);
//            return true;
//        } catch (Exception e) {
//            LOGGER.error("Error when registering account email=" + userDto.getEmail(), e);
//            return false;
//        }
//    }
//
//    private User fillDefaultValuesAndFinish(UserDto userDto, User user) {
//        user.setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
//        user.setRole(UserRole.CUSTOMER);
//        user.setRegistered(new Date());
//        user.setLastLogin(new Date());
//        user.setLastOrder(new Date());
//        User newUser = userService.save(user);
//        String refCode = HashUtils.hashNumber(newUser.getId());
//        newUser.setRefCode(refCode);
//        userService.save(newUser);
//
//        billingService.createInitBillings(newUser);
//        mailClient.sendActivationMail(newUser);
//        return newUser;
//    }

//    @RequestMapping(value = "/user/addCustomer", method = RequestMethod.POST)
//    @PreAuthorize("hasAuthority('AGENCY')")
//    public Map<String, Object> addCustomer(@RequestBody UserDto userDto) {
//        User agencyUser = super.getCurrentUser();
//        try {
//            if (agencyUser.getAgencyId() == null || agencyUser.getRole() != UserRole.AGENCY) {
//                throw new ForbiddenException("User is not allowed to add customer!");
//            }
//            User user = dtoConverter.convertToUser(userDto);
//            user.setAgencyId(agencyUser.getAgencyId());
//            user.setSaleId(agencyUser.getSaleId());
//
////            TODO: agency is saved unexpectedly
//            User savedUser = fillDefaultValuesAndFinish(userDto, user);
//            return ImmutableMap.<String, Object>builder().put("id", savedUser.getId()).build();
//        } catch (Exception e) {
//            LOGGER.error("Error when adding customer for agencyId=" + agencyUser.getAgencyId(), e);
//            return ImmutableMap.<String, Object>builder().put("isError", true).build();
//        }
//    }

//    @RequestMapping(value = "/user/getCustomersOfAgency")
//    @PreAuthorize("hasAuthority('AGENCY')")
//    public List<User> getCustomersOfAgency() {
//        User agencyUser = super.getCurrentUser();
//        if (agencyUser.getAgencyId() == null || agencyUser.getRole() != UserRole.AGENCY) {
//            throw new ForbiddenException("User is not allowed to add customer!");
//        }
//        return userRepository.findByAgencyIdAndRole(agencyUser.getAgencyId(), UserRole.CUSTOMER);
//    }
}
