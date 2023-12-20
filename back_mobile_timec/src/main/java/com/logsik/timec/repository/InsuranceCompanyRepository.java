package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.timec.domain.InsuranceCompany;

public interface InsuranceCompanyRepository extends BaseRepository<InsuranceCompany, Long>{
	
	Page<InsuranceCompany> findAll (Pageable pageable);
	
	List<InsuranceCompany> findAll();
	
	InsuranceCompany findById(Long id);
	
	Page<InsuranceCompany> findByNameContaining(String name, Pageable pageable);
	
}
