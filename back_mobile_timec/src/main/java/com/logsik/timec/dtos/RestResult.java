package com.logsik.timec.dtos;

import java.io.Serializable;

public class RestResult implements Serializable {
    private static final long serialVersionUID = 1L;
    private boolean isError = false;
    private String errorMessage = null;
    private String successMessage = null;
    private Object resultData = null;
    private int number;
    
    public RestResult() {
    }
   
    
    public RestResult(Object resultData) {
    	this.resultData = resultData;
    }
    
    public RestResult(boolean isError, String errorMessage) {
    	this.isError = isError;
    	this.errorMessage = errorMessage;
    }
    
    public RestResult(boolean isError, String errorMessage, int number) {
    	this.isError = isError;
    	this.errorMessage = errorMessage;
    	this.number = number;
    }
    
	public boolean isError() {
		return isError;
	}
	public RestResult setIsError(boolean isError) {
		this.isError = isError;
		return this;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public RestResult setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
		return this;
	}
	public Object getResultData() {
		return resultData;
	}
	public RestResult setResultData(Object resultData) {
		this.resultData = resultData;
		return this;
	}

	public String getSuccessMessage() {
		return successMessage;
	}

	public void setSuccessMessage(String successMessage) {
		this.successMessage = successMessage;
	}


	public int getNumber() {
		return number;
	}


	public void setNumber(int number) {
		this.number = number;
	}
	
}
