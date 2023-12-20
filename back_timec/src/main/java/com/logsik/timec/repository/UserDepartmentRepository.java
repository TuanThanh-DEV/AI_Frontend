package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.timec.domain.UserDepartment;

public interface UserDepartmentRepository extends BaseRepository<UserDepartment, Long> {
	@EntityGraph(attributePaths = { "department", "user", "user.hospital"})
	Page<UserDepartment> findAll(Pageable pageable);
	
	@EntityGraph(attributePaths = { "department", "user", "user.hospital"})
	List<UserDepartment> findByUserId(Long userId);
	
	@EntityGraph(attributePaths = { "department", "user", "user.hospital"})
	UserDepartment findById(Long id);
	
	@EntityGraph(attributePaths = { "department", "user", "user.hospital"})
	List<UserDepartment> findAll();

}
