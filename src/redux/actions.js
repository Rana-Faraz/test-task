export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};
