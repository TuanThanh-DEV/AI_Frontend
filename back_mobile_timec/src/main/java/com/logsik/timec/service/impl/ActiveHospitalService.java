package com.logsik.timec.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.timec.domain.Department;
import com.logsik.timec.dtos.HospitalDto;
import com.logsik.timec.repository.DepartmentRepository;

@Service
public class ActiveHospitalService {

	
	@Autowired
	private  DepartmentRepository departmentRepository;
	
	public void changeAllDepartmentByHospitalId(HospitalDto hospitalDto) {
		
		List<Department> listDepartment = departmentRepository.findByHospitalId(hospitalDto.getId());
		for(Department department : listDepartment ) {
			department.setHasActive(hospitalDto.getHasActive());
			departmentRepository.save(department);
		}
		
	}
}
