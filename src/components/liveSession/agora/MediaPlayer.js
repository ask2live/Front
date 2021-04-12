import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { PATCH_VOLUME } from "../../../actions/types";

export default function MediaPlayer(props) {

  const { audioTrack, client, user } = props;

  // const authority = useSelector((state) => state.Authorize);
    const dispatch = useDispatch();
    // const patchVolume = () => {
    //     const audioVolume = audioTrack.getVolumeLevel();
    //     if (audioVolume > 0.2)
    //     dispatch({type : PATCH_VOLUME, userUid : client.uid, userVolume : audioTrack.getVolumeLevel()})
    // }

  useEffect(() => {

    if (audioTrack && client.remoteUsers.length === 0) {
      // console.log("여기는 호스트");

      audioTrack.setEnabled(true);
      const volumeInter = setInterval(()=>{
        // console.log("나의 오디오", client.uid);
        // console.log("나의 오디오", audioTrack.getVolumeLevel());
        dispatch({type : PATCH_VOLUME, userUid : client.uid, userVolume : audioTrack.getVolumeLevel()});
    }, 400)
    
    return () => {
        audioTrack.setEnabled(false);
        clearInterval(volumeInter);
        // audioTrack.stop();
    };
    }
    
    else if(audioTrack && client.remoteUsers.length != 0) {
        // console.log("여기는 게스트");
        
        audioTrack.play();
        const volumeInter = setInterval(()=>{
            // console.log("상대방오디오", user.uid);
            // console.log("상대방오디오", audioTrack.getVolumeLevel());
            dispatch({type : PATCH_VOLUME, userUid : user.uid, userVolume : audioTrack.getVolumeLevel()})
        }, 400)
        
        return () => {
            audioTrack.stop();
            clearInterval(volumeInter)
        };
    }
}, [audioTrack]);
  return (
    <div className="video-player">
    </div>
  );
}
