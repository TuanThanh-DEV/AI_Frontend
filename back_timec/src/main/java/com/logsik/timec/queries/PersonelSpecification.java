package com.logsik.timec.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.timec.domain.User;

public class PersonelSpecification implements Specification<User> {
	private String fullNameOrPhoneOrEmail;

	public PersonelSpecification(String fullNameOrPhoneOrEmail) {
		this.fullNameOrPhoneOrEmail = fullNameOrPhoneOrEmail;

	}
	@Override
	public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(fullNameOrPhoneOrEmail)) {
			predicates.add(builder.or(builder.like(builder.lower(root.get("fullName")), "%" + fullNameOrPhoneOrEmail.toLowerCase() + "%"),
					builder.like(root.get("phone"), "%" + fullNameOrPhoneOrEmail + "%"),
					builder.like(root.get("email"), "%" + fullNameOrPhoneOrEmail + "%")));
		}
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));
//		  Join<Pet, Owner> owners = root.join("owners");
//        criteriaQuery.orderBy(criteriaBuilder.desc(root.get("id")));
//        return criteriaBuilder.equal(owners.get("name"), ownerName);
	}

}
