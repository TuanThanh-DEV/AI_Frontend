package com.logsik.timec.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.timec.domain.Company;


public interface CompanyRepository extends BaseRepository<Company, Long> {
	
	Page<Company> findAll(Pageable pageable);
	
	Page<Company> findByNameContaining(String name,Pageable pageable);
	
	Company findById(Long id);

}
