import { useLocation, withRouter } from "react-router-dom";
import React, { useCallback } from "react";
import MediaPlayer from "./MediaPlayer";


const PlayerWrapper = ({
  client,
  // rtmClient,
  // host,
  // joinState,
  localAudioTrack,
  remoteUsers,
  // channelNum,
}) => {

  return (
    <>
      <div className="player-container">
        {/* <div> {client.uid} </div> */}
        <div className="local-player-wrapper">

          <MediaPlayer
            audioTrack={localAudioTrack}
            client={client}
          />
        </div>
        <div className="remotePlayers">
          {remoteUsers.map((user) => (
            <div className="remote-player-wrapper" key={user.uid}>

              <MediaPlayer audioTrack={user.audioTrack} client={client} user={user}/>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default withRouter(PlayerWrapper)