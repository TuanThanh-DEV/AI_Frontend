package com.logsik.timec.dtos;

import java.util.ArrayList;
import java.util.List;

public class ListOutputStockDto {
	
	private List<OutputStockDto> listOutputStockDto = new ArrayList<OutputStockDto>();

	public List<OutputStockDto> getListOutputStockDto() {
		return listOutputStockDto;
	}

	public void setListOutputStockDto(List<OutputStockDto> listOutputStockDto) {
		this.listOutputStockDto = listOutputStockDto;
	}

}
