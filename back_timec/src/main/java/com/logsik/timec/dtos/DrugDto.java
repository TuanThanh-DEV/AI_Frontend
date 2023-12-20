package com.logsik.timec.dtos;

import java.io.Serializable;

import com.logsik.timec.enums.DrugType;

public class DrugDto implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String guideline;
	private Long salePrice;
	private Long importPrice;
	private String uom;
	private Long drugCategoryId;
	private Long supplierDrugId;
	private String ingredient;
	private DrugType drugType;
	private String placeCode;
	private String barCode;
	private Boolean hasGroup = false;
	private Boolean hasPrescription = false;
	private Long drugStoreId;
	private String packageUom;
	private Integer numberOfPackageItems;
	private Long packageSalePrice;
	private Long inputFormId;
	private String maHoatChat;
	private String maNhomBHYT;
	private String hamLuongBHYT;
	private String duongDungBHYT;
	private String lieuDungBHYT;
	private String soDangKyBHYT;
	private String thongTinThau;
	private String phamVi;
	private String producerCompany;
	private String producerCountry;
	private String contractorBHYT;
	private String publishedDate;
	
	private boolean sellable;
	private String hamLuong;
	private boolean deleted;
	
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
	public String getGuideline() {
		return guideline;
	}
	public void setGuideline(String guideline) {
		this.guideline = guideline;
	}
	public Long getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Long salePrice) {
		this.salePrice = salePrice;
	}
	public Long getImportPrice() {
		return importPrice;
	}
	public void setImportPrice(Long importPrice) {
		this.importPrice = importPrice;
	}
	public String getUom() {
		return uom;
	}
	public void setUom(String uom) {
		this.uom = uom;
	}
	public Long getDrugCategoryId() {
		return drugCategoryId;
	}
	public void setDrugCategoryId(Long drugCategoryId) {
		this.drugCategoryId = drugCategoryId;
	}
	public Long getSupplierDrugId() {
		return supplierDrugId;
	}
	public void setSupplierDrugId(Long supplierDrugId) {
		this.supplierDrugId = supplierDrugId;
	}
	public String getIngredient() {
		return ingredient;
	}
	public void setIngredient(String ingredient) {
		this.ingredient = ingredient;
	}
	public DrugType getDrugType() {
		return drugType;
	}
	public void setDrugType(DrugType drugType) {
		this.drugType = drugType;
	}
	public String getPlaceCode() {
		return placeCode;
	}
	public void setPlaceCode(String placeCode) {
		this.placeCode = placeCode;
	}
	public String getBarCode() {
		return barCode;
	}
	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}
	public Boolean getHasGroup() {
		return hasGroup;
	}
	public void setHasGroup(Boolean hasGroup) {
		this.hasGroup = hasGroup;
	}
	public Boolean getHasPrescription() {
		return hasPrescription;
	}
	public void setHasPrescription(Boolean hasPrescription) {
		this.hasPrescription = hasPrescription;
	}
	public String getPackageUom() {
		return packageUom;
	}
	public void setPackageUom(String packageUom) {
		this.packageUom = packageUom;
	}
	public Integer getNumberOfPackageItems() {
		return numberOfPackageItems;
	}
	public void setNumberOfPackageItems(Integer numberOfPackageItems) {
		this.numberOfPackageItems = numberOfPackageItems;
	}
	public Long getPackageSalePrice() {
		return packageSalePrice;
	}
	public void setPackageSalePrice(Long packageSalePrice) {
		this.packageSalePrice = packageSalePrice;
	}
	public Long getDrugStoreId() {
		return drugStoreId;
	}
	public Long getInputFormId() {
		return inputFormId;
	}
	public void setDrugStoreId(Long drugStoreId) {
		this.drugStoreId = drugStoreId;
	}
	public void setInputFormId(Long inputFormId) {
		this.inputFormId = inputFormId;
	}
	public String getMaNhomBHYT() {
		return maNhomBHYT;
	}
	public String getHamLuongBHYT() {
		return hamLuongBHYT;
	}
	public String getDuongDungBHYT() {
		return duongDungBHYT;
	}
	public String getLieuDungBHYT() {
		return lieuDungBHYT;
	}
	public String getSoDangKyBHYT() {
		return soDangKyBHYT;
	}
	public void setMaNhomBHYT(String maNhomBHYT) {
		this.maNhomBHYT = maNhomBHYT;
	}
	public void setHamLuongBHYT(String hamLuongBHYT) {
		this.hamLuongBHYT = hamLuongBHYT;
	}
	public void setDuongDungBHYT(String duongDungBHYT) {
		this.duongDungBHYT = duongDungBHYT;
	}
	public void setLieuDungBHYT(String lieuDungBHYT) {
		this.lieuDungBHYT = lieuDungBHYT;
	}
	public void setSoDangKyBHYT(String soDangKyBHYT) {
		this.soDangKyBHYT = soDangKyBHYT;
	}
	public String getThongTinThau() {
		return thongTinThau;
	}
	public void setThongTinThau(String thongTinThau) {
		this.thongTinThau = thongTinThau;
	}
	public String getPhamVi() {
		return phamVi;
	}
	public void setPhamVi(String phamVi) {
		this.phamVi = phamVi;
	}
	public String getMaHoatChat() {
		return maHoatChat;
	}
	public void setMaHoatChat(String maHoatChat) {
		this.maHoatChat = maHoatChat;
	}
	public String getProducerCompany() {
		return producerCompany;
	}
	public void setProducerCompany(String producerCompany) {
		this.producerCompany = producerCompany;
	}
	public String getProducerCountry() {
		return producerCountry;
	}
	public void setProducerCountry(String producerCountry) {
		this.producerCountry = producerCountry;
	}
	public String getContractorBHYT() {
		return contractorBHYT;
	}
	public void setContractorBHYT(String contractorBHYT) {
		this.contractorBHYT = contractorBHYT;
	}
	public String getPublishedDate() {
		return publishedDate;
	}
	public void setPublishedDate(String publishedDate) {
		this.publishedDate = publishedDate;
	}
	public boolean getSellable() {
		return sellable;
	}
	public void setSellable(boolean sellable) {
		this.sellable = sellable;
	}
	public String getHamLuong() {
		return hamLuong;
	}
	public void setHamLuong(String hamLuong) {
		this.hamLuong = hamLuong;
	}
	public boolean getDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
}