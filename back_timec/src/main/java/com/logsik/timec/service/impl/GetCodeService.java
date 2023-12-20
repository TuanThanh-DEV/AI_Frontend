package com.logsik.timec.service.impl;

import org.springframework.stereotype.Service;

import com.logsik.timec.enums.ServiceBarCodeType;

@Service
public class GetCodeService {
	
	public long getcode(String barCode, ServiceBarCodeType sbt) {
		long code = 0;
		if(!barCode.isEmpty()) {
			if(barCode.startsWith("PXN")  == true ||  barCode.startsWith("pxn")  == true && sbt.equals(ServiceBarCodeType.PXN)) {
				code =  Long.parseLong(barCode.substring(3));
			}else if(barCode.startsWith("PTT") == true || barCode.startsWith("ptt")  == true && sbt.equals(ServiceBarCodeType.PTT)) {
				code =  Long.parseLong(barCode.substring(3));
			}else if(barCode.startsWith("PK") == true || barCode.startsWith("pk")  == true && sbt.equals(ServiceBarCodeType.PK)) {
				code =  Long.parseLong(barCode.substring(2));
			}else if(barCode.startsWith("KB") == true || barCode.startsWith("kb")  == true && sbt.equals(ServiceBarCodeType.KB)) {
				code =  Long.parseLong(barCode.substring(2));
			}else {
				code = 0;
			}
		}
		return code;
	}

}
