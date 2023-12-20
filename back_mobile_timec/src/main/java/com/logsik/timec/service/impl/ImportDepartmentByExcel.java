package com.logsik.timec.service.impl;

import java.io.IOException;

import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.logsik.timec.controller.AbstractController;
import com.logsik.timec.domain.Department;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.repository.DepartmentRepository;



@RestController
@RequestMapping("/api")
public class ImportDepartmentByExcel extends AbstractController {

	
	@Autowired
	private DepartmentRepository departmentRepository;
	

	private static final Logger logger = LoggerFactory.getLogger(ImportDepartmentByExcel.class);

	private DataFormatter formatter = new DataFormatter();

	@Transactional
	@RequestMapping(value = "/importDepartmentData", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadDetailItemFile(@RequestParam("file") MultipartFile file) throws IOException {
		XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
		XSSFSheet worksheet = workbook.getSheetAt(0);
//		Department currentDepartment  = null;
		try {
			for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
				XSSFRow row = worksheet.getRow(i);
				if (row != null && !StringUtils.isEmpty(formatter.formatCellValue(row.getCell(0)))) {
					importDepartment(row);
						continue;

				} else {
					break;
				}
				}
			return new RestResult("ok");
			} catch (Exception e) {
			throw e;
		} finally {

			workbook.close();

		}
	}

	private Department importDepartment(XSSFRow row) {
		Department tempDepartment = new Department();
		Department currentDepartment;
		tempDepartment.setName(formatter.formatCellValue(row.getCell(0)));
		tempDepartment.setDescription(formatter.formatCellValue(row.getCell(1)));
		tempDepartment.setHospitalId(1L);
		currentDepartment = departmentRepository.save(tempDepartment);
		return currentDepartment;
	}

	

//	private void checkNullEntity(XSSFRow row, DetailItem tempDetailItem) {
//		// Check null for quantity
//		if (!StringUtils.isEmpty(formatter.formatCellValue(row.getCell(5)))) {
//			tempDetailItem.setQuantity(Float.valueOf(formatter.formatCellValue(row.getCell(5))));
//		} else {
//			tempDetailItem.setQuantity(Float.valueOf(0));
//		}
//		// Check null For ProductPriceMain
//		if (!StringUtils.isEmpty(formatter.formatCellValue(row.getCell(6)))) {
//			tempDetailItem.setProductPriceMain(Long.valueOf(formatter.formatCellValue(row.getCell(6))));
//		} else {
//			tempDetailItem.setProductPriceMain(Long.valueOf(0));
//		}
//		// Check null For ProductPriceSupport
//		if (!StringUtils.isEmpty(formatter.formatCellValue(row.getCell(7)))) {
//			tempDetailItem.setProductPriceSupport(Long.valueOf(formatter.formatCellValue(row.getCell(7))));
//
//		} else {
//			tempDetailItem.setProductPriceSupport(Long.valueOf(0));
//		}
//		// Check null for waterProofingPrice
//		if (!StringUtils.isEmpty(formatter.formatCellValue(row.getCell(8)))) {
//			tempDetailItem.setWaterProofingPrice(Long.valueOf(formatter.formatCellValue(row.getCell(8))));
//		} else {
//			tempDetailItem.setWaterProofingPrice(Long.valueOf(0));
//		}
//		// Check null for labourPrice
//		if (!StringUtils.isEmpty(formatter.formatCellValue(row.getCell(9)))) {
//			tempDetailItem.setLabourPrice(Long.valueOf(formatter.formatCellValue(row.getCell(9))));
//		} else {
//			tempDetailItem.setLabourPrice(Long.valueOf(0));
//		}
//		// Check null for TransportFee
//		if (!StringUtils.isEmpty(formatter.formatCellValue(row.getCell(10)))) {
//			tempDetailItem.setAdditionCost(Long.valueOf(formatter.formatCellValue(row.getCell(10))));
//		} else {
//			tempDetailItem.setAdditionCost(Long.valueOf(0));
//		}
//		// Check null for TotalProductPrice
//		if (!StringUtils.isEmpty(formatter.formatCellValue(row.getCell(11)))) {
//			tempDetailItem
//					.setTotalProductPrice(Long.valueOf(formatter.formatCellValue(row.getCell(11)).replace(".", "")));
//		} else {
//			tempDetailItem.setTotalProductPrice(Long.valueOf(0));
//		}
//		// Check null for totalLabourPrice
//		if (!StringUtils.isEmpty(formatter.formatCellValue(row.getCell(12)))) {
//			tempDetailItem
//					.setTotalLabourPrice(Long.valueOf(formatter.formatCellValue(row.getCell(12)).replace(".", "")));
//		} else {
//			tempDetailItem.setTotalLabourPrice(Long.valueOf(0));
//		}
//	}

}
