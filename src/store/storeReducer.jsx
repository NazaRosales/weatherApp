const types = {
  SET_LOCATION: "SET_LOCATION",
  CHANGE_TEMP_MODE: "CHANGE_TEMP_MODE",
  CELCIUS_MODE: "ºC",
  FARENHEINT_MODE: "ºF",
};
const initialStore = {
  location: {
    lat: 0,
    lon: 0,
  },
  tempMode: types.CELCIUS_MODE,
};
const storeReducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case types.CHANGE_TEMP_MODE:
      return {
        ...state,
        tempMode: action.payload,
      };
    default:
      return state;
  }
};
export { initialStore, types };
export default storeReducer;
