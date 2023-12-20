package com.logsik.timec.dtos;

import java.io.Serializable;

import com.logsik.timec.enums.ServiceType;

public class DiagnosisServiceDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String description;
	private Long diagnosisGroupId;
	private Long price;
	
	private String maDvkt;
	private String maGia;
	private Long donGiaBhyt;
	private String quyetDinh;
	private String congBo;
	private String maCoSoKcb;
	private Integer loaiPttt;
	private boolean isInsurance;
	private ServiceType serviceType;
	private String maVatTu;
	private String maNhom;
	private String donViTinh;
	private String maMayXetNghiem;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getDiagnosisGroupId() {
		return diagnosisGroupId;
	}
	public void setDiagnosisGroupId(Long diagnosisGroupId) {
		this.diagnosisGroupId = diagnosisGroupId;
	}
	public Long getPrice() {
		return price;
	}
	public void setPrice(Long price) {
		this.price = price;
	}
	public String getMaDvkt() {
		return maDvkt;
	}
	public void setMaDvkt(String maDvkt) {
		this.maDvkt = maDvkt;
	}
	public String getMaGia() {
		return maGia;
	}
	public void setMaGia(String maGia) {
		this.maGia = maGia;
	}
	public Long getDonGiaBhyt() {
		return donGiaBhyt;
	}
	public void setDonGiaBhyt(Long donGiaBhyt) {
		this.donGiaBhyt = donGiaBhyt;
	}
	public String getQuyetDinh() {
		return quyetDinh;
	}
	public void setQuyetDinh(String quyetDinh) {
		this.quyetDinh = quyetDinh;
	}
	public String getCongBo() {
		return congBo;
	}
	public void setCongBo(String congBo) {
		this.congBo = congBo;
	}
	public String getMaCoSoKcb() {
		return maCoSoKcb;
	}
	public void setMaCoSoKcb(String maCoSoKcb) {
		this.maCoSoKcb = maCoSoKcb;
	}
	public Integer getLoaiPttt() {
		return loaiPttt;
	}
	public void setLoaiPttt(Integer loaiPttt) {
		this.loaiPttt = loaiPttt;
	}
	public boolean isInsurance() {
		return isInsurance;
	}
	public void setInsurance(boolean isInsurance) {
		this.isInsurance = isInsurance;
	}
	public ServiceType getServiceType() {
		return serviceType;
	}
	public void setServiceType(ServiceType serviceType) {
		this.serviceType = serviceType;
	}
	public String getMaVatTu() {
		return maVatTu;
	}
	public String getMaNhom() {
		return maNhom;
	}
	public String getDonViTinh() {
		return donViTinh;
	}
	public void setMaVatTu(String maVatTu) {
		this.maVatTu = maVatTu;
	}
	public void setMaNhom(String maNhom) {
		this.maNhom = maNhom;
	}
	public void setDonViTinh(String donViTinh) {
		this.donViTinh = donViTinh;
	}
	public String getMaMayXetNghiem() {
		return maMayXetNghiem;
	}
	public void setMaMayXetNghiem(String maMayXetNghiem) {
		this.maMayXetNghiem = maMayXetNghiem;
	}
	
}
