package com.logsik.timec.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.logsik.timec.domain.Patient;
import com.logsik.timec.repository.UserRepository;

/**
 * Created by phamcongbang on 13/03/2018.
 */
@Component
public class AppUserDetailsService implements UserDetailsService {
	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

//    TODO: Implement limit login attemps (locked 10 minutes) to avoid brute-force attack.
	@Override
	public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
		Patient user = userService.findByPhone(s);

		if (user == null) {
			throw new UsernameNotFoundException(String.format("The username %s doesn't exist", s));
		}

		List<GrantedAuthority> authorities = new ArrayList<>();
//        user.getRoles().forEach(role -> {
//            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
//        });
		authorities.add(new SimpleGrantedAuthority("ADMIN"));

		UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getPhone(),
				user.getPassword(), true, true, true, true, authorities);

		return userDetails;
	}
}
