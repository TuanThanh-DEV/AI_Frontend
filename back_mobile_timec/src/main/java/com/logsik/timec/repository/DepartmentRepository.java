package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.timec.domain.Department;

public interface DepartmentRepository extends BaseRepository<Department, Long>{
	
	@EntityGraph(attributePaths = {  "hospital"})
	Page<Department> findAll(Pageable pageable);
	
	@EntityGraph(attributePaths = {  "hospital"})
	Page<Department> findByNameContaining(String name,Pageable pageable);

	@EntityGraph(attributePaths = {  "hospital"})
	List<Department> findAll();
	
	@EntityGraph(attributePaths = {  "hospital"})
	Department findById(Long id);
	
	@EntityGraph(attributePaths = {  "hospital"})
	List<Department> findByHospitalId(Long hospitalId);

	@EntityGraph(attributePaths = {  "hospital"})
	List<Department> findAllByHasActive(boolean hasActive);
}
