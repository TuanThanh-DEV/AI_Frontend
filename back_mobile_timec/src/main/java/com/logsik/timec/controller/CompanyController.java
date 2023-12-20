package com.logsik.timec.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.timec.domain.Company;
import com.logsik.timec.dtos.CompanyDto;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.repository.CompanyRepository;
import com.logsik.timec.service.impl.DtoConverter;


@RestController
@RequestMapping("/api")
public class CompanyController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(Company.class);

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("company/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(companyRepository.findById(id));
	}

	@RequestMapping(value = "/company/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody CompanyDto companyDto) {
		try {
			Company newCompany = companyRepository.save(dtoConverter.convertToCompany(companyDto));

			return new RestResult(newCompany);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/company/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody CompanyDto companyDto) {
		try {
			Company updatedCompany = companyRepository.save(dtoConverter.convertToCompany(companyDto));
			return new RestResult(updatedCompany);
		} catch (Exception e) {
			LOGGER.error("Error when updating company.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/company/{id}")
	public RestResult deleteCompany(@PathVariable("id") Long id) {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			companyRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete company.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/company/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if (StringUtils.isEmpty(search)) {
			result = companyRepository.findAll(pageable);
		}else {
			result = companyRepository.findByNameContaining(search,pageable);
		}
	
		return new RestResult(result);
	}

	@RequestMapping(value = "/company/listAll")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult listAll() {
		return new RestResult(companyRepository.findAll());

	}

}
