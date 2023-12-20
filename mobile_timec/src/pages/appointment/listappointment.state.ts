import { Department } from './../../models/Department';
import { Appointment } from "./Appointment";
import { Hospital } from "../../models/Hospital";
import { DataWebsite } from '../../models/DataWebsite';

export interface ListAppointmentState {
  appointments: Appointment[];
  searchNumber? : number ;
  hospitals: Hospital[];
  departments: Department[];
  listWebs : DataWebsite[];
};

