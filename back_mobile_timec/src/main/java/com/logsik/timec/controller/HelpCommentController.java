package com.logsik.timec.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.timec.domain.HelpComment;
import com.logsik.timec.dtos.HelpCommentDto;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.repository.HelpCommentRepository;
import com.logsik.timec.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class HelpCommentController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(HelpComment.class);

	@Autowired
	private HelpCommentRepository helpCommentRepository;

	@Autowired
	private DtoConverter dtoConverter;
	
	@RequestMapping("helpComment/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(helpCommentRepository.findById(id));
	}

	@RequestMapping(value = "/helpComment/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody HelpCommentDto helpCommentDto) {
		try {
			HelpComment newhelpComment = helpCommentRepository.save(dtoConverter.convertToHelpComment(helpCommentDto));
			return new RestResult(newhelpComment);
		} catch (Exception e) {
			LOGGER.error("Error when adding HelpComment.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/helpComment/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody HelpCommentDto helpCommentDto) {
		try {
			HelpComment updated = helpCommentRepository.save(dtoConverter.convertToHelpComment(helpCommentDto));
			return new RestResult(updated);
		} catch (Exception e) {
			LOGGER.error("Error when updating helpComment.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/helpComment/{id}")
	public RestResult delete(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete helpComment with ID = " + id + "...");

		try {
			helpCommentRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete helpComment.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}
		return new RestResult("ok");
	}

	@RequestMapping(value = "/helpComment/list")
	public RestResult list(@RequestParam("search") String search,Pageable pageable) {
		Object result;
		if (search.isEmpty()) {
			result = helpCommentRepository.findAll(pageable);
		}
		else {
			result = helpCommentRepository.findByContentContaining(search, pageable);
		}
		return new RestResult(result);
	}

	@RequestMapping(value = "/helpComment/listAll")
	public RestResult listAll() {
		return new RestResult(helpCommentRepository.findAll());

	}

	@RequestMapping(value = "/helpComment/listAllByHelpTicketId")
	public RestResult listAllByHelpTicketId(@RequestParam("helpTicketId") long helpTicketId) {
		return new RestResult(helpCommentRepository.findByHelpTicketId(helpTicketId));

	}
}