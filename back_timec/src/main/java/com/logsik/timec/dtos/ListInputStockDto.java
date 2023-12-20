package com.logsik.timec.dtos;

import java.util.ArrayList;
import java.util.List;

public class ListInputStockDto {
//	@JsonProperty("parameter")
	private List<InputStockDto> listInputStockDto = new ArrayList<InputStockDto>();

	public List<InputStockDto> getListInputStockDto() {
		return listInputStockDto;
	}

	public void setListInputStockDto(List<InputStockDto> listInputStockDto) {
		this.listInputStockDto = listInputStockDto;
	}

}
