package com.logsik.timec.service.impl;

import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TimeService {
	public Long getTime(Time referenceTime) {
		return referenceTime.getHours() * 3600l + referenceTime.getMinutes() * 60l + referenceTime.getSeconds();
	}

	private Date getLastDayOfMonth(Date referenceDate) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceDate);

		calendar.add(Calendar.MONTH, 1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.add(Calendar.DATE, -1);
		truncateTime(calendar);

		Date lastDayOfMonth = calendar.getTime();

		return lastDayOfMonth;

	}

	public Date getLastDayOfMonth(Integer month, Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.YEAR, year);
		truncateTime(calendar);
		return getEndOfDay(getLastDayOfMonth(calendar.getTime()));
	}

	public Date getFirstDayOfMonth(Date referenceDate) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceDate);

		calendar.set(Calendar.DAY_OF_MONTH, 1);
		truncateTime(calendar);

		Date firstDayOfMonth = calendar.getTime();

		return firstDayOfMonth;

	}

	public Date getFirstDayOfMonth(Integer month, Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.YEAR, year);
		truncateTime(calendar);
		return getFirstDayOfMonth(calendar.getTime());
	}

	private void truncateTime(Calendar calendar) {
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
	}

	public Integer getYear(Date referenceYear) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceYear);

		Integer year = calendar.get(Calendar.YEAR);

		return year;

	}

	public Integer getMonth(Date referenceMonth) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceMonth);

		Integer month = calendar.get(Calendar.MONTH) + 1;

		return month;

	}

	public Integer getDay(Date referenceMonth) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceMonth);

		Integer month = calendar.get(Calendar.DAY_OF_MONTH);

		return month;

	}

	public Integer getHour(Date referenceMonth) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceMonth);

		Integer month = calendar.get(Calendar.HOUR);

		return month;

	}
	
	public Integer getHour24(Date referenceMonth) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceMonth);

		Integer month = calendar.get(Calendar.HOUR_OF_DAY);

		return month;

	}

	public Integer getMinute(Date referenceMonth) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceMonth);

		Integer month = calendar.get(Calendar.MINUTE);

		return month;

	}

	public Date addDays(Date currentDate, Integer days) {
		Calendar c = Calendar.getInstance();
		c.setTime(currentDate);
		c.add(Calendar.DATE, days);
		return c.getTime();
	}
	
	public Date minusDays(Date currentDate, Integer days) {
		Calendar c = Calendar.getInstance();
		c.setTime(currentDate);
		c.add(Calendar.DATE, - days);
		return c.getTime();
	}

	public Date getFirstDayOfYear() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.MONTH, 0);
		calendar.set(Calendar.YEAR, getYear(new Date()));
		return calendar.getTime();
	}

	public Date getLastDayOfYear() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 31);
		calendar.set(Calendar.MONTH, 11);
		calendar.set(Calendar.YEAR, getYear(new Date()));
		return calendar.getTime();

	}

	public Date getStartOfDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DATE);
		calendar.set(year, month, day, 0, 0, 0);
		return calendar.getTime();
	}

	public Date getEndOfDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DATE);
		calendar.set(year, month, day, 23, 59, 59);
		return calendar.getTime();
	}

	public List<Date> getDaysBetweenDates(Date startdate, Date enddate) {
		List<Date> dates = new ArrayList<Date>();
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(startdate);

		while (calendar.getTime().before(enddate)) {
			Date result = calendar.getTime();
			dates.add(result);
			calendar.add(Calendar.DATE, 1);
		}
		return dates;
	}

	public Date parseStringToDate(String dateString, String format) throws ParseException {
		Date date = new SimpleDateFormat(format).parse(dateString);
		return date;
	}

	public String parseDateToString(Date dateTime) throws ParseException {
		Date date = Calendar.getInstance().getTime();
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy"); // yyyyMMdd  , yyyyMMddHHmm
		String strDate = dateFormat.format(date);
		return strDate;
	}

	public String parseDateTimeToString(Date dateTime) throws ParseException {
		Date date = Calendar.getInstance().getTime();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String strDate = dateFormat.format(date);
		return strDate;
	}

	public Date parseStringToDateTime(String dateString) throws ParseException {
		Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dateString);
		return date;
	}

	public int daysBetween(Date d1, Date d2) {
		return (int) ((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
	}
	
	public Date parseDateFromDateTime(Date dateTime) throws ParseException {
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		String strDate = dateFormat.format(dateTime);
		Date date = new SimpleDateFormat("dd/MM/yyyy").parse(strDate);  
		return date;
	}
	
	public String parseDateToStringDate(Date date) throws ParseException {
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd"); 
		String strDate = dateFormat.format(date);
		return strDate;
	}
	
	public String parseDateToStringDateTime(Date dateTime) throws ParseException {
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmm"); 
		String strDate = dateFormat.format(dateTime);
		return strDate;
	}
	
}
