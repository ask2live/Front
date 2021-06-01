import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import AgoraRTC, {
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
} from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";

import { AirlineSeatReclineExtraOutlined } from "@material-ui/icons";

export default function useAgora(client) {
  // console.log("useAgora");
  const appid = "387f33a0b6544314867242f62f4a2ded";

  const [localAudioTrack, setLocalAudioTrack] = useState("");
  const [joinState, setJoinState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const authority = useSelector((state) => state.Authorize);

  const dispatch = useDispatch();

  async function createLocalTracks() {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack(
      // MicrophoneAudioTrackInitConfig
      { AEC: true, ANS: true }
    );
    setLocalAudioTrack(microphoneTrack);
    return microphoneTrack;
  }
  
  async function join(channel, token, rtmClient, rtmChannel, isHost) {
    // console.log("join");

    if (!client) return;
    
    const microphoneTrack = await createLocalTracks();
    await client.join(appid, channel, token);    
    
    // rtm 클라이언트 로그인
    await rtmClient
    .login({ token: null, uid: String(client.uid) })
        .then(() => {
          // console.log("AgoraRTM client login success !!");
        })
        .catch((err) => {
          // console.log("AgoraRTM client login failure !!", err);
        });
        
    // rtm 클라이언트 메시지 받기 모드
    await rtmClient.on("ConnectionStateChanged", (newState, reason) => {
      // console.log(
        // "on connection state changed to " + newState + " reason: " + reason
        // );
      });
    
    //rtm 메시지채널 join
    await rtmChannel.join();

      // event listener for receiving a peer-to-peer message.
    await rtmClient.on("MessageFromPeer", (msg, peerId) => {
        // text: text of the received message; peerId: User ID of the sender.
        // console.log(
          // "AgoraRTM Peer Msg: from user " + peerId + " recieved: \n" + msg.text
        // );

        // check if mute or leave command
        if (msg.text === "host") {
          // console.log("make host");

          client.publish(microphoneTrack);
          // localAudioTrack.stop();
          // localAudioTrack.setEnabled(true);

        } else if (msg.text === "audience") {
          // console.log("make audience");
          
          client.unpublish();
          // localAudioTrack.play();

        } else {
          console.log("[Warning] unknown message:", msg);
        }
        
        
      });

    if (isHost) {
      // console.log("client Role in JOIN ");
      await dispatch({type: "superHost", payload: "host"});
      await client.publish(microphoneTrack);

    } else {
      // console.log("audience Role in JOIN");
      await dispatch({type: "audience"});
    }

    // console.log("end useAgora");
    setJoinState(true);
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    // if (localVideoTrack) {
    //   localVideoTrack.stop();
    //   localVideoTrack.close();
    // }
    setRemoteUsers([]);
    setJoinState(false);
    //! leave하면 이상해지더라..
    // await rtmChannel.leave();
    await client.leave();
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);
    
    const handleUserPublished = async (user, mediaType) => {
      await client.subscribe(user, mediaType);

      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    
    const handleUserUnpublished = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    
    const handleUserJoined = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };

    const handleUserLeft = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };

    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    joinState,
    leave,
    join,
    remoteUsers,
    authority,
  };
}
