//package com.logsik.timec.repository;
//
//import java.util.List;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.EntityGraph;
//
//import com.logsik.timec.domain.UserSalary;
//import com.logsik.timec.dtos.RevenueDto;
//
////public interface UserSalaryRepository extends BaseRepository<UserSalary, Long>, JpaSpecificationExecutor<UserSalary>{
//public interface RevenueRepository extends BaseRepository<RevenueDto, Long>{
//	
//	@EntityGraph(attributePaths = { "drug", "outputStock"})
//	List<UserSalary> findByUserIdAndMonthAndYear(long user, int month, int year);
//	
//	@EntityGraph(attributePaths = { "drug", "outputStock"})
//	List<UserSalary> findByMonthAndYear(Integer month, Integer year);
//	
//	int countOutputDate();
//	
//}
//
