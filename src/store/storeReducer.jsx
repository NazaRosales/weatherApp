const types = {
    SET_LOCATION: "SET_LOCATION",
}
const initialStore = {
    location : {
        lat: 0,
        lon: 0,
    }
}
const storeReducer = (state, action) => {
    switch(action.type){
        case (types.SET_LOCATION):
            return {
                ...state,
                location: action.payload
            }
        default: return state;
    }
};
export {initialStore, types}
export default storeReducer;
