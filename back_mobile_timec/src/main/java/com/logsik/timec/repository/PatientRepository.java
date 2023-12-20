package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.timec.domain.Patient;

public interface PatientRepository extends BaseRepository<Patient, Long> {

	Patient findById(Long id);

	Page<Patient> findAll(Pageable pageable);

	Page<Patient> findByFullNameContainingIgnoreCaseOrCodeOrPhoneOrEmail(String fullName, String code, String phone,
			String email, Pageable pageable);

	List<Patient> findAll();

	Patient findByPhone(String phone);
}
