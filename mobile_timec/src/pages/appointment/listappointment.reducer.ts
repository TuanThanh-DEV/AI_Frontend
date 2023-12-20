import { ListAppointmentState } from "./listappointment.state";
import { ListAppointmentActions } from "./listappointment.actions";


export const listappointmentReducer = (state: ListAppointmentState, action: ListAppointmentActions): ListAppointmentState => {
  switch (action.type) {
    case 'set-list-appointment-data': {
      return { ...state, ...action.appointments };
    }
    case 'set-search-number': {
      return { ...state, searchNumber : action.searchNumber };
    }
    case 'set-list-hospital-data': {
      return { ...state, ...action.hospitals };
    }
    case 'set-list-department-data': {
      return { ...state, ...action.department };
    }
    case 'set-list-web-data': {
      return { ...state, ...action.listWeb };
    }
  }
}
