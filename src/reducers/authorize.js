const initialState = "";

const authorize = (state = initialState, action) => {

  switch(action.type){
    case "superHost":
      // console.log("make super HOST", action.payload);
      state = action.payload;
      return state;

    case "audience":
      state = initialState;
      return state;

    default:
      return state;
  }

}

export default authorize;