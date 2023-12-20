package com.logsik.timec.dtos;

import java.io.Serializable;

public class IcdDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private String code;
	private String name;
	private String codeBhyt;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCodeBhyt() {
		return codeBhyt;
	}
	public void setCodeBhyt(String codeBhyt) {
		this.codeBhyt = codeBhyt;
	}

}
