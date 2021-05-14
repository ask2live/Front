import axios from "axios";

export const hostPostApi = async(hostUid, holeId, channelNum) =>  {
    const headers = {
        'Authorization': 'Token ' + localStorage.token
      }
      const data = {
          channel_num : channelNum,
          host_uid : hostUid,
      };
    //   console.log("LiveSession Host Post :", data);
      const res = await axios.post(
        "https://www.ask2live.me/api/hole/"+holeId+"/live/create",
        data,
        {headers:headers}
      );
    //   console.log(res.data);
}

export const audiencePutApi = async(audienceUid, holeId, channelNum) =>  {
    const headers = {
        'Authorization': 'Token ' + localStorage.token
      }
      const data = {
          uid : audienceUid,
      };
    //   console.log("LiveSession Audience Post :", data);
      const res = await axios.put(
        "https://www.ask2live.me/api/hole/"+holeId+"/live/join/"+channelNum,
        data,
        {headers:headers}
      );
    //   console.log(res.data);
}

export const leavePatchApi = async(holeId, channelNum) =>  {
    const headers = {
        'Authorization': 'Token ' + localStorage.token
      }
      const data = {};
      const res = await axios.patch(
        "https://www.ask2live.me/api/hole/"+holeId+"/live/leave/"+channelNum,
        data,
        {headers:headers}
      );
    //   console.log("--------leavePatch-----",res.data);
    //   if (res.data.response === "SUCCESS"){
    //   }
}