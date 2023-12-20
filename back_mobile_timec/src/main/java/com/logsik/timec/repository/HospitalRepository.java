package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.timec.domain.Hospital;

public interface HospitalRepository extends BaseRepository<Hospital, Long>{
	
	Page<Hospital> findAll(Pageable pageable);
	
	Page<Hospital> findByNameContaining(String name,Pageable pageable);

	List<Hospital> findAll();
	
	Hospital findById(Long id);

	List<Hospital> findAllByHasActive(boolean hasActive);
}
