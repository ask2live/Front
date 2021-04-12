import axios from "axios";

export const postSessionToReserve = async(session) => {
  // console.log("-----postSessionToReserve start-----");

  const config = {
    headers: {'Authorization': 'Token ' + localStorage.token}
  }
  const data = {
    data: {}
  }

  const res = await axios.patch(
    "https://www.ask2live.me/api/reservation/hole/" + session.id + "/hostconfirm",
    data,
    config,
  );
  // console.log("hole reserved: ", res);
};
