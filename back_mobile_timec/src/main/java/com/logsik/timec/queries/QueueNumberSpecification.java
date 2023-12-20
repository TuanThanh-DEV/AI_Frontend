//package com.logsik.timec.queries;
//
//import java.util.ArrayList;
//import java.util.Calendar;
//import java.util.List;
//
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Predicate;
//import javax.persistence.criteria.Root;
//
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.util.StringUtils;
//
//import com.logsik.timec.domain.User;
//import com.logsik.timec.enums.QueueNumberStatus;
//
//public class QueueNumberSpecification implements Specification<User> {
//	private String status;
//	public QueueNumberSpecification(String status) {
//		this.status = status;
//
//	}
//	@Override
//	public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
//		List<Predicate> predicates = new ArrayList<>();
//		
//		if (!"HOAN_THANH".equals(status) && !"HUY".equals(status)) {
//			predicates.add(builder.equal(root.get("status"),QueueNumberStatus.));
//		}
//		return builder.and(predicates.toArray(new Predicate[predicates.size()]));
////		  Join<Pet, Owner> owners = root.join("owners");
////        criteriaQuery.orderBy(criteriaBuilder.desc(root.get("id")));
////        return criteriaBuilder.equal(owners.get("name"), ownerName);
//	}
//
//}
