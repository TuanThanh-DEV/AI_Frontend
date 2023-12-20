package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.logsik.timec.domain.User;
import com.logsik.timec.dtos.lis.DoctorLISDTO;
import com.logsik.timec.dtos.lis.LabouratoritLISDTO;
import com.logsik.timec.enums.UserRole;
import com.logsik.timec.enums.UserType;

public interface UserRepository extends BaseRepository<User, Long>, JpaSpecificationExecutor<User> {
	@EntityGraph(attributePaths = { "roles" })
	List<User> findByEmail(String email);

	@EntityGraph(attributePaths = { "roles" })
	Page<User> findByEmailContaining(String email, Pageable pageable);

	@EntityGraph(attributePaths = { "roles" })
	Page<User> findByFullNameContainingOrEmailContainingOrPhoneContainingOrAddressContaining(String fullName,
			String email, String phone, String address, Pageable pageable);

	@EntityGraph(attributePaths = { "roles" })
	Page<User> findByRole(UserRole role, Pageable pageable);

	@EntityGraph(attributePaths = { "roles"})
	List<User> findByFullName(String fullName);

	@EntityGraph(attributePaths = { "roles"})
	Page<User> findByRoleAndEmailContaining(UserRole role, String email, Pageable pageable);

	@EntityGraph(attributePaths = { "roles" })
	Page<User> findAll(Specification<User> spec, Pageable pageable);

//	@EntityGraph(attributePaths = { "roles", "departments" })
	List<User> findAll();

	// Load Data on form
	@EntityGraph(attributePaths = { "roles" })
	User findById(Long id);

	@EntityGraph(attributePaths = { "roles" })
	List<User> findByIsActive(boolean active);
	
	@EntityGraph(attributePaths = { "roles" })
	List<User> findByUserType(UserType userType);
	
	@EntityGraph(attributePaths = { "roles" })
	List<User> findByUserTypeAndIsActive(UserType userType, boolean active);
	
	@Query("select new com.logsik.timec.dtos.lis.DoctorLISDTO(u.code, u.fullName) "
	+ " from com.logsik.timec.domain.User as u where userType= ?1 ")
	List<DoctorLISDTO> getDocter(UserType userType );
	
	@Query("select new com.logsik.timec.dtos.lis.LabouratoritLISDTO(u.code, u.fullName) "
			+ " from com.logsik.timec.domain.User as u where userType= ?1 ")
	List<LabouratoritLISDTO> getLabouratorit(UserType userType );
	
}
