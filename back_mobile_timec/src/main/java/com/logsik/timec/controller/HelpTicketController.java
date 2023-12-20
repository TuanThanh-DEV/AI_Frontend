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

import com.logsik.timec.domain.HelpTicket;
import com.logsik.timec.dtos.HelpTicketDto;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.repository.HelpTicketRepository;
import com.logsik.timec.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class HelpTicketController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(HelpTicket.class);

	@Autowired
	private HelpTicketRepository helpTicketRepository;

	@Autowired
	private DtoConverter dtoConverter;
	
	@RequestMapping("helpTicket/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(helpTicketRepository.findById(id));
	}

	@RequestMapping(value = "/helpTicket/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody HelpTicketDto helpTicketDto) {
		try {
			HelpTicket newhelpTicket = helpTicketRepository.save(dtoConverter.convertToHelpTicket(helpTicketDto));
			return new RestResult(newhelpTicket);
		} catch (Exception e) {
			LOGGER.error("Error when adding HelpTicket.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/helpTicket/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody HelpTicketDto helpTicketDto) {
		try {
			HelpTicket updated = helpTicketRepository.save(dtoConverter.convertToHelpTicket(helpTicketDto));
			return new RestResult(updated);
		} catch (Exception e) {
			LOGGER.error("Error when updating helpTicket.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/helpTicket/{id}")
	public RestResult delete(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete helpTicket with ID = " + id + "...");

		try {
			helpTicketRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete helpTicket.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}
		return new RestResult("ok");
	}

	@RequestMapping(value = "/helpTicket/list")
	public RestResult list(@RequestParam("search") String search,Pageable pageable) {
		Object result;
		if (search.isEmpty()) {
			result = helpTicketRepository.findAll(pageable);
		}
		else {
			result = helpTicketRepository.findByQuestionContaining(search, pageable);
		}
		return new RestResult(result);
	}

	@RequestMapping(value = "/helpTicket/listAll")
	public RestResult listAll() {
		return new RestResult(helpTicketRepository.findAll());

	}


}