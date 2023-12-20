package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.timec.domain.HelpTicket;
public interface HelpTicketRepository extends BaseRepository<HelpTicket, Long>{
	
	
	@EntityGraph(attributePaths = {"reporter","assignee"})
	HelpTicket findById(Long id);

	@EntityGraph(attributePaths = {"reporter","assignee"})
	Page<HelpTicket> findAll(Pageable pageable);
	
	@EntityGraph(attributePaths = {"reporter","assignee"})
	Page<HelpTicket> findByQuestionContaining(String question,Pageable pageable);

	@EntityGraph(attributePaths = {"reporter","assignee"})
	List<HelpTicket> findAll();
	
}
