package com.logsik.timec.queries;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.timec.domain.Appointment;

public class AppointmentSpecification implements Specification<Appointment> {

	private Date fromDate;
	private Date toDate;
	private String doctorNameOrPatientName;


	public AppointmentSpecification(Date fromDate, Date toDate, String doctorNameOrPaitentName) {
		super();
		this.fromDate = fromDate;
		this.toDate = toDate;
		this.doctorNameOrPatientName = doctorNameOrPaitentName;
	}

	@Override
	public Predicate toPredicate(Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		
		if(fromDate !=null && toDate !=null ) {
			predicates.add(builder.between(root.get("appointDate"),fromDate,toDate ));
		}
		if (!StringUtils.isEmpty(doctorNameOrPatientName)) {
			predicates.add(builder.or(builder.like(builder.lower(root.get("user").get("fullName")), "%" + doctorNameOrPatientName.toLowerCase() + "%"),
					builder.like(builder.lower(root.get("patient").get("fullName")), "%" + doctorNameOrPatientName.toLowerCase() + "%")));
		}
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}
}
