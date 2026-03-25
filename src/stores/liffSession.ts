import { defineStore } from "pinia";

const USER_ID_KEY = "userId";
const USER_NAME_KEY = "userName";
const REFEREE_USER_ID_KEY = "refereeUserId";

function readSessionValue(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return sessionStorage.getItem(key);
}

function writeSessionValue(key: string, value: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (value) {
    sessionStorage.setItem(key, value);
    return;
  }

  sessionStorage.removeItem(key);
}

export const useLiffSessionStore = defineStore("liff-session", {
  state: () => ({
    userId: readSessionValue(USER_ID_KEY) ?? "",
    userName: readSessionValue(USER_NAME_KEY) ?? "",
    refereeUserId: readSessionValue(REFEREE_USER_ID_KEY) ?? "",
  }),
  getters: {
    hasIdentity: (state) => Boolean(state.userId && state.userName),
  },
  actions: {
    clear() {
      this.userId = "";
      this.userName = "";
      this.refereeUserId = "";
      writeSessionValue(USER_ID_KEY, null);
      writeSessionValue(USER_NAME_KEY, null);
      writeSessionValue(REFEREE_USER_ID_KEY, null);
    },
    setIdentity(userId: string, userName: string) {
      this.userId = userId;
      this.userName = userName;
      writeSessionValue(USER_ID_KEY, userId);
      writeSessionValue(USER_NAME_KEY, userName);
    },
    setRefereeUserId(refereeUserId: string) {
      this.refereeUserId = refereeUserId;
      writeSessionValue(REFEREE_USER_ID_KEY, refereeUserId);
    },
  },
});
