import axios from "axios";

export const postSessionToReserve = async(session) => {
  console.log("-----postSessionToReserve start-----");

  const config = {
    headers: {'Authorization': 'Token ' + localStorage.token}
  }
  const data = {
    data: {}
  }

  const res = await axios.patch(
    "https://143.248.226.7:8000/api/reservation/hole/" + session.id + "/hostconfirm",
    data,
    config,
  );
  console.log("hole reserved: ", res);
};
