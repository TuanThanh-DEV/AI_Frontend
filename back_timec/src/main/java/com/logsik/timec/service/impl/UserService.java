package com.logsik.timec.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.timec.domain.User;
import com.logsik.timec.domain.UserDepartment;
import com.logsik.timec.repository.UserDepartmentRepository;
import com.logsik.timec.repository.UserRepository;

/**
 * Created by phamcongbang on 14/05/2018.
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserDepartmentRepository userDepartmentRepository;

//    TODO: Need to find a solution to update cache when neccessary
//    @Cacheable("users")
    public User findByEmail(String email) {
        List<User> users = userRepository.findByEmail(email);
        if (!users.isEmpty()) {
            return users.get(0);
        } else {
            return null;
        }
    }
    
//    public Patient findByPhone(String email) {
//        List<User> users = userRepository.findByEmail(email);
//        if (!users.isEmpty()) {
//            return users.get(0);
//        } else {
//            return null;
//        }
//    }

    public User save(User user) {
        return userRepository.save(user);
    }
    
    public List<UserDepartment> getListDepartmentByUserId(Long userId) {
    	return userDepartmentRepository.findByUserId(userId);
    }
}
