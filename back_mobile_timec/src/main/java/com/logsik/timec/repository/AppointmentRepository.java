package com.logsik.timec.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.timec.domain.Appointment;
public interface AppointmentRepository extends BaseRepository<Appointment, Long>{
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	Appointment findById(Long id);
	
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	Page<Appointment> findAll(Pageable pageable);
	
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	Page<Appointment> findByStatusContaining(String status,Pageable pageable);
	
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	Appointment findOne(Long id);
	
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	List<Appointment> findAll();
	
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	Page<Appointment> findAll(Specification<Appointment> spec,Pageable pageable);
	
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	List<Appointment> findByPrescriptionId(Long prescriptionId);
	
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	List<Appointment> findByPatientId(Long patientId);
	
	
	long count();
	
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	List<Appointment> findByUserIdAndAppointDateGreaterThanAndAppointDateLessThan(Long userId, Date startDate, Date endDate);
	
	@EntityGraph(attributePaths = {"hospital", "user", "patient"})
	List<Appointment> findAllByAppointDateGreaterThanEqualAndAppointDateLessThanEqual(Date startDate, Date endDate);
}
