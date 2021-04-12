import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MediaPlayer(props) {

  const { audioTrack, client, user } = props;

  const authority = useSelector((state) => state.Authorize);

  useEffect(() => {

    if (audioTrack && client.remoteUsers.length === 0) {
      console.log("여기는 호스트");

      audioTrack.setEnabled(true);
      const volumeInter = setInterval(()=>{
        // console.log("나의 오디오", client.uid);
        // console.log("나의 오디오", audioTrack.getVolumeLevel());
      }, 500)

      return () => {
        audioTrack.setEnabled(false);
        clearInterval(volumeInter);
        // audioTrack.stop();
      };
    }

    else if(audioTrack && client.remoteUsers.length != 0) {
      console.log("여기는 게스트");

      audioTrack.play();
      const volumeInter = setInterval(()=>{
            console.log("상대방오디오", user.uid);
            console.log("상대방오디오", audioTrack.getVolumeLevel());
      }, 500)

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
