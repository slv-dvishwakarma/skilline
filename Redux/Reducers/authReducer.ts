import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

type ActionType = {
  loading: boolean;
  response: any;
  error: any;
};

export interface AuthType {
  processLoading: boolean;
  profile_pic: string | null;
  isProcessing: string | null;
  token: string | null;
  resetForm: boolean;
  isAdmin: boolean;
  authOptions: ActionType;
  authPost: ActionType;
}

const initialState: AuthType = {
  processLoading: false,
  token: null,
  profile_pic: null,
  isAdmin: false,
  isProcessing: null,
  resetForm: false,
  authOptions: {
    loading: true,
    response: {},
    error: {},
  },

  authPost: {
    loading: false,
    response: {},
    error: {},
  },
};

const authReducer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    LOGOUT: (state) => {
      // window.localStorage.clear();
      sessionStorage.clear();
      state.profile_pic = null;
      deleteCookie("token");
      deleteCookie("isadmin");
      deleteCookie("refresh_token");
      state.token = null;
      state.isAdmin = false;
      // action.payload.callBack();
    },
    LOGOUT_SERVER: (state, action) => {
      localStorage.clear();
      sessionStorage.clear();
      state.profile_pic = null;
      deleteCookie("token");
      deleteCookie("refresh_token");
      deleteCookie("isadmin");
      state.token = null;
      state.isAdmin = false;
    },
    SET_TOKEN: (state, action) => {
      state.isProcessing = "processing";
      setCookie("token", action.payload.token);
      action.payload.refresh_token &&
        setCookie("refresh_token", action.payload.refresh_token);
      setCookie("isadmin", action.payload.isadmin);
      state.token = action.payload.token;
      setCookie("menu", action.payload.pages);
    },
    SET_PROFILE: (state, action) => {
      state.profile_pic = action.payload.profile_pic;
    },
    SET_IS_PROCESSING: (state, action) => {
      state.isProcessing = action.payload.isProcessing;
    },
    SET_FORM_RESET: (state, action) => {
      state.resetForm = action.payload.action;
    },
    SET_ADMIN: (state, action) => {
      state.isAdmin = action.payload;
      console.log(action.payload);
      setCookie("isadmin", action.payload.is_admin);
    },
    //Auth Option
    AUTH_OPTION_FETCH: (state, action) => {
      state.authOptions.loading = true;
      state.authOptions.response = {};
      state.authOptions.error = {};
    },
    AUTH_OPTION_SUCCESS: (state, action) => {
      state.authOptions.loading = false;
      state.authOptions.response = action.payload;
    },
    AUTH_OPTION_FAILED: (state, action) => {
      state.authOptions.loading = false;
      state.authOptions.error = action.payload;
    },

    //Auth POST
    AUTH_POST_FETCH: (state, action) => {
      state.authPost.loading = true;
      state.processLoading = true;
      state.authPost.response = {};
      state.authPost.error = {};
    },
    AUTH_POST_SUCCESS: (state, action) => {
      state.authPost.loading = false;
      state.authPost.response = action.payload;
      state.processLoading = false;
    },
    AUTH_POST_FAILED: (state, action) => {
      state.authPost.loading = false;
      state.authPost.error = action.payload;
      state.processLoading = false;
    },
  },
});
export const authActions = authReducer.actions;
export default authReducer.reducer;
