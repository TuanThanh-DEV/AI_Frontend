package com.logsik.timec.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.timec.domain.Role;


public interface RoleRepository extends BaseRepository<Role, Long> {
	Page<Role> findAll(Pageable pageable);
	Role findById(Long id);
	

}
