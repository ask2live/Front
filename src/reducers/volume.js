import {
    PATCH_VOLUME,
    CLEAR_VOLUME
  } from "../actions/types";
  
  const initialState = {}

  const volume = (state = initialState, action) => {
    switch (action.type) {
        case PATCH_VOLUME:
            const userUid = action.userUid;
            const userVolume = action.userVolume;
            let tmpState = {...state};
            tmpState[userUid] = userVolume;
            console.log("volume Redux ::", tmpState);
            return tmpState;

        case CLEAR_VOLUME:
            return initialState;

        default:
            return state;
    }
  };
  
  export default volume;
  