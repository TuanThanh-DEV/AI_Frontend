package com.logsik.timec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.timec.domain.HelpComment;
public interface HelpCommentRepository extends BaseRepository<HelpComment, Long>{
	
	
	@EntityGraph(attributePaths = {"created","helpTicket"})
	HelpComment findById(Long id);

	@EntityGraph(attributePaths = {"created","helpTicket"})
	Page<HelpComment> findAll(Pageable pageable);
	
	@EntityGraph(attributePaths = {"created","helpTicket"})
	Page<HelpComment> findByContentContaining(String content,Pageable pageable);

	@EntityGraph(attributePaths = {"created","helpTicket"})
	List<HelpComment> findAll();
	
	@EntityGraph(attributePaths = {"created","helpTicket"})
	List<HelpComment> findByHelpTicketId(Long helpTicketId);
	
}
