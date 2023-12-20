import { ActionType } from '../../util/types';
import { asyncRequests } from '../../data/dataApi';
import { ListAppointmentState } from './listappointment.state';
import { ListUserState } from '../user/listuser.state';



export const loadListAppointment = () => async (dispatch: React.Dispatch<any>) => {
  const appointments = await asyncRequests.get("/appointmentMobile/listFindCurrentUser");
  dispatch(setListAppointmentData({ appointments: appointments }));
};

export const loadListHospital = () => async (dispatch: React.Dispatch<any>) => {
  const hospitals = await asyncRequests.get("/hospital/listAll");
  dispatch(setListHospitalData({ hospitals: hospitals }));
};

export const loadListDepartment = () => async (dispatch: React.Dispatch<any>) => {
  const departments = await asyncRequests.get("/department/listAll");
  dispatch(setListDepartmentData({ departments: departments }));
};

export const loadListWeb = () => async (dispatch: React.Dispatch<any>) => {
  try {
    // fetch(`https://timec.vn/wp-json/wp/v2/posts/mobile`)
    //   .then(res => res.json())
    //   .then(listWeb => dispatch(setListWebData({ listWebs: listWeb })));
    const ressult = await fetch('https://timec.vn/wp-json/wp/v2/posts/mobile', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': ' application/json',
      },
      mode: 'no-cors',
    });
    const ressultJson = await ressult.json();
    const listWeb = ressultJson;
    dispatch(setListWebData({ listWebs: listWeb }));
  } catch (err) {
    return console.log(err);
  }
};

export const setListWebData = (listWeb: Partial<ListAppointmentState>) => ({
  type: 'set-list-web-data',
  listWeb
} as const);

export const setListHospitalData = (hospitals: Partial<ListAppointmentState>) => ({
  type: 'set-list-hospital-data',
  hospitals
} as const);

export const setListDepartmentData = (department: Partial<ListAppointmentState>) => ({
  type: 'set-list-department-data',
  department
} as const);

export const setListAppointmentData = (appointments: Partial<ListAppointmentState>) => ({
  type: 'set-list-appointment-data',
  appointments
} as const);

export const setSearchNumber = (searchNumber?: number) => ({
  type: 'set-search-number',
  searchNumber
} as const);

export type ListAppointmentActions =
  ActionType<typeof setListAppointmentData>
  | ActionType<typeof setSearchNumber>
  | ActionType<typeof setListHospitalData>
  | ActionType<typeof setListDepartmentData>
  | ActionType<typeof setListWebData>   
