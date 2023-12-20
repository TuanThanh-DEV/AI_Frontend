package com.logsik.timec.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;

/**
 * Created by phamcongbang on 13/03/2018.
 */
@Configuration
public class AdditionalWebConfig {
	@Bean
	public Module datatypeHibernateModule() {
		return new Hibernate5Module().disable(Hibernate5Module.Feature.USE_TRANSIENT_ANNOTATION);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
