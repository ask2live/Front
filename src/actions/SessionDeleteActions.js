import axios from "axios";

export const postSessionDelete = async(session) => {
  // console.log("-----postSessionDelete start-----");
  
  const config = {
      headers: {Authorization: "Token " + localStorage.token}
    };
    
  const res = await axios.delete(
    "https://www.ask2live.me/api/hole/delete/" + session.id,
    config,
  );
  // console.log("hole deleted: ", res);
};