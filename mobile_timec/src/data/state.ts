import { combineReducers } from './combineReducers';
import { sessionsReducer } from './sessions/sessions.reducer';
import { userReducer } from './user/user.reducer';
import { listuserReducer } from '../pages/user/listuser.reducer';
import { listappointmentReducer } from '../pages/appointment/listappointment.reducer';


export const initialState: AppState = {
  data: {
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: false,
    loading: false
  },
  listuser: {
    users:[],
  },
  listappointment: {
    appointments:[],
    searchNumber : 0,
    hospitals : [],
    departments : [],
    listWebs : [],
  }
};

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer,
  listuser: listuserReducer,
  listappointment: listappointmentReducer
});

export type AppState = ReturnType<typeof reducers>;