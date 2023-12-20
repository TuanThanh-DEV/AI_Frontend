package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.logsik.timec.domain.User;
import com.logsik.timec.enums.UserRole;
import com.logsik.timec.enums.UserType;

public interface UserRepository extends BaseRepository<User, Long>, JpaSpecificationExecutor<User> {
	@EntityGraph(attributePaths = { "roles", "departments" })
	List<User> findByEmail(String email);

	@EntityGraph(attributePaths = { "roles", "departments" })
	Page<User> findByEmailContaining(String email, Pageable pageable);

	@EntityGraph(attributePaths = { "roles", "departments" })
	Page<User> findByFullNameContainingOrEmailContainingOrPhoneContainingOrAddressContaining(String fullName,
			String email, String phone, String address, Pageable pageable);

	@EntityGraph(attributePaths = { "roles", "departments" })
	Page<User> findByRole(UserRole role, Pageable pageable);

	@EntityGraph(attributePaths = { "roles", "departments" })
	List<User> findByFullName(String fullName);

	@EntityGraph(attributePaths = { "roles", "departments" })
	Page<User> findByRoleAndEmailContaining(UserRole role, String email, Pageable pageable);

	@EntityGraph(attributePaths = { "roles", "departments" })
	Page<User> findAll(Specification<User> spec, Pageable pageable);

	@EntityGraph(attributePaths = { "roles", "departments" })
	List<User> findAll();

	// Load Data on form
	@EntityGraph(attributePaths = { "roles", "departments" })
	User findById(Long id);

	@EntityGraph(attributePaths = { "roles", "departments" })
	List<User> findByIsActive(boolean active);
	
	@EntityGraph(attributePaths = { "roles", "departments" })
	List<User> findByUserType(UserType userType);
}
