package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.timec.domain.InsuranceType;

public interface InsuranceTypeRepository extends BaseRepository<InsuranceType, Long>{
	
	Page<InsuranceType> findAll (Pageable pageable);
	
	Page<InsuranceType> findByNameContainingOrCodeContaining (String name, String code,Pageable pageable);
	
	List<InsuranceType> findAll();

	InsuranceType findById(Long id);
}
