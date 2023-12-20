package com.logsik.timec.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.timec.domain.UserRole;


public interface UserRoleRepository extends BaseRepository<UserRole, Long> {
	Page<UserRole> findAll(Pageable pageable);
	UserRole findById(Long id);
	

}
