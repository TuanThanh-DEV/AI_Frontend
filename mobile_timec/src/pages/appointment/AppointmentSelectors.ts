import { Hospital } from './../../models/Hospital';
import { createSelector } from 'reselect';
import { AppState } from '../../data/state';

const getAppointments = (state: AppState) => {
  return state.listappointment.appointments
};
export const getHospital = (state: AppState) => {
  return state.listappointment.hospitals
};

export const getDataWebsite = (state: AppState) => {
  return state.listappointment.listWebs
};

export const getDepartment = (state: AppState) => {
  return state.listappointment.departments
};
const getSearch = (state: AppState) => state.listappointment.searchNumber;

export const getFilteredAppointments = createSelector(
  getAppointments, getSearch,
  (appointments, searchNumber) => {
    if (!searchNumber) {
      return appointments;
    }
    return appointments.filter(appointment => (appointment.hospitalId && appointment.hospitalId == searchNumber));
  }
)
