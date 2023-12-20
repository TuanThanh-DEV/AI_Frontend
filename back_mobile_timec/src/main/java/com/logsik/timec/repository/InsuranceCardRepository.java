package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.timec.domain.InsuranceCard;

public interface InsuranceCardRepository extends BaseRepository<InsuranceCard, Long>{
	
	@EntityGraph(attributePaths = {"patient", "insuranceType"})
	Page<InsuranceCard> findAll (Pageable pageable);
	
	@EntityGraph(attributePaths = {"patient", "insuranceType"})
	List<InsuranceCard> findAll();
	
	@EntityGraph(attributePaths = {"patient", "insuranceType"})
	InsuranceCard findById(Long id);
	
	@EntityGraph(attributePaths = {"patient", "insuranceType"})
	Page<InsuranceCard> findByInsuranceCodeOrPatientFullNameContaining(String insuranceCode, String patientFullName, Pageable pageable);
	
	@EntityGraph(attributePaths = {"patient", "insuranceType"})
	List<InsuranceCard> findByPatientId(Long patientId);
	
	@EntityGraph(attributePaths = {"patient", "insuranceType"})
	List<InsuranceCard> findByPatientIdAndInsuranceTypeId(Long patientId, Long insuranceTypeId);
}
