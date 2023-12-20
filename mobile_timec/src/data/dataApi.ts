import { Plugins } from '@capacitor/core';
import { Session } from '../models/Session';
import { Speaker } from '../models/Speaker';
import { Location } from '../models/Location';
import { User } from '../pages/user/User';

const { Storage } = Plugins;

const locationsUrl = '/assets/data/locations.json';// TODO Remove
const sessionsUrl = '/assets/data/sessions.json';// TODO Remove
const speakersUrl = '/assets/data/speakers.json';// TODO Remove

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';

const API_ROOT = 'http://103.90.235.12:8094/api';
const API_TOKEN = 'http://103.90.235.12:8094/oauth/token';

// const API_ROOT = 'http://localhost:8083/api';
// const API_TOKEN = 'http://localhost:8083/oauth/token';

const encode = encodeURIComponent;
var getToken = async () => {
  var accessToken = Promise.resolve(Storage.get({ key: ACCESS_TOKEN }));
  var token = await accessToken;
  return token;
};
const ACCESS_TOKEN = 'accessToken';

export const asyncRequests = {
  del: async (url: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
      });
      const ressultJson = await res.json();
      return ressultJson.resultData;
    } catch (err) {
      return console.log(err);
    }
  },
  get: async (url: string) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
      });
      const ressultJson = await res.json();
      return ressultJson.resultData;
    } catch (err) {
      return console.log(err);
    }
  },
  put: async (url: string, body: Object) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(body)
      });
      const ressultJson = await res.json();
      return ressultJson.resultData;
    } catch (err) {
      return console.log(err);
    }
  },
  post: async (url: string, body: Object) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(body)
      });
      const ressultJson = await res.json();
      return ressultJson.resultData;
    } catch (err) {
      return console.log(err);
    }
  },
  signupPatient: async (url: string, body: Object) => {
    try {
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json'
        },
        body: JSON.stringify(body)
      });
      const ressultJson = await res.json();
      return ressultJson.resultData;
    } catch (err) {
      return console.log(err);
    }
  },
  getPage: async (url: string, page: number, size: number) => {
    try {
      if (!size) {
        size = 20;
      }
      if (!page) {
        page = 0;
      } else {
        page = page - 1; // to look url same as pagination
      }
      if (url.indexOf('?') != -1) {
        url = url + '?page=' + encode(page) + '&size=' + encode(size);
      } else {
        url = url + '&page=' + encode(page) + '&size=' + encode(size);
      }
      const token = await getToken();
      const res = await fetch(`${API_ROOT}${url}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
      });
      const ressultJson = await res.json();
      return ressultJson.resultData;
    } catch (err) {
      return console.log(err);
    }
  },
};

export const AuthService = {

  login: async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_TOKEN}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa("loghisclientid1:TK7umcdNzl1002")
        },
        body: `username=${encode(email)}&password=${encode(password)}&grant_type=password`
      });
      const res_1 = await res.json();
      var token = res_1.access_token;
      if (token) {
        Storage.set({ key: ACCESS_TOKEN, value: token });

        console.log("Login successfully.");
      }

      return token;
    } catch (err) {
      return console.log(err);
    }
  },
  current: async () => {

    try {
      const token = await getToken();
      const resCurrent = await fetch(`${API_ROOT}` + '/auth/getCurrentUser', {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': ' application/json',
          'Authorization': `Bearer ${token.value}`
        },
      });
      const ressultJson = await resCurrent.json();
      // Storage.set({ key: 'currentUser', value: JSON.stringify(ressultJson) });
      PermanentCacheService.setItem("currentUser", ressultJson);
    } catch (err) {
      return console.log(err);
    }

  },

  // loginRememberMe: (refreshToken) =>
  //     superagent.post(`${API_TOKEN}`, `refresh_token=${encode(refreshToken)}&grant_type=refresh_token`)
  //         .set('Content-Type', 'application/x-www-form-urlencoded')
  //         .set('Authorization', 'Basic ' + btoa("loghisclientid1:TK7umcdNzl1002"))
  //         .withCredentials().then(responseBody),
};



export const getConfData = async () => { // TODO Remove
  const response = await Promise.all([
    fetch(sessionsUrl),
    fetch(locationsUrl),
    fetch(speakersUrl)]);
  const sessions = await response[0].json() as Session[];
  const locations = await response[1].json() as Location[];
  const speakers = await response[2].json() as Speaker[];

  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();
  const data = {
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks]
  }
  return data;
}

export const getUserData = async () => { // TODO Remove
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME })]);
  const isLoggedin = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  // const users = await asyncRequests.get('/user/listAll');
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username,
    // users
  }
  return data;
}

export const PermanentCacheService = {
  setItem: async (keyItem: string, value: object) => {
    Storage.set({ key: keyItem, value: JSON.stringify(value) });
  },
  getItem: async (keyItem: string) => {
    var item = await Promise.resolve(Storage.get({ key: keyItem }));
    if (item) {
      return JSON.parse(item.value ? item.value : "{}");
    } else {
      return null;
    }
  },
  hasItem: async (keyItem: string) => {
    var item = await Promise.resolve(Storage.get({ key: keyItem }));
    if (item) {
      return true;
    } else {
      return false;
    }
  },
  removeItem: (keyItem: string) => {
    Storage.remove({ key: keyItem });
  },
  clearAll: () => {
    Storage.clear();
  }
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {// TODO Remove
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {// TODO Remove
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setUsernameData = async (username?: string) => {// TODO Remove
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}
