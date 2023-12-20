package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.timec.domain.UserConfig;

public interface UserConfigRepository extends BaseRepository<UserConfig, Long> {
	
	@EntityGraph(attributePaths = {"user", "user.hospital"})
	List<UserConfig> findAll();
	
	@EntityGraph(attributePaths = {"user", "user.hospital"})
	List<UserConfig> findByHasSalary(boolean hasSalary);

	@EntityGraph(attributePaths = {"user", "user.hospital"})
	Page<UserConfig> findAll (Pageable pageable);
	
	@EntityGraph(attributePaths = {"user", "user.hospital"})
	Page<UserConfig> findByUserFullNameContaining (String userFullName, Pageable pageable);
	
	@EntityGraph(attributePaths = {"user", "user.hospital"})
	UserConfig findByUserId (Long userId);
	
	@EntityGraph(attributePaths = {"user", "user.hospital"})
	UserConfig findById(Long id);
}
