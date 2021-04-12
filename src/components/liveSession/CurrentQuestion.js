import React, {useState, useCallback, memo} from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import StringQuestion from "./StringQuestion";
import VoiceQuestion from "./VoiceQuestion";

const style = {
    wait : {
        top: "40%",
        position: "absolute",
        color : "rgba(255,255,255,0.7)",
        display : "flex",
        justifyContent : "center",
        width:"100%",
    }
}

const CurrentQuestion = memo((props) => {
    
    const questionPatchApi = async(questionId) =>  {
        const headers = {
            'Authorization': 'Token ' + localStorage.token
          }
          const data = {
              is_answered: true,
          };
          const res = await axios.patch(
            "https://www.ask2live.me/api/hole/"+props.holeId+"/question/update/"+questionId,
            data,
            {headers:headers}
          );
        //   console.log(res.data);
          if (res.data.response === "SUCCESS")
          {
            props.roomSocket.send(
                JSON.stringify({ command: "fetch_questions", data: { pk: props.holeId }}));
          }
    }

    const forQuestionidx = useCallback((questionList) => {
        return questionList.findIndex((question => question.is_answered == false))
    })


    const questionResponse = useSelector(state => state.questionlist)

    if (questionResponse.arrived)
    {
        let questionList = questionResponse.data;
        if (questionList.length == 0) 
            return (
                <>
                <div style={style.wait}>
                 <p>질문이 없습니다.</p>
                </div>
                </>
            )
        let questionIdx = forQuestionidx(questionList);
        //이걸 매번 돌리기엔 비효율적.. useEffect를 쓰면 될까??
        if (questionIdx == -1)
        {
            if (props.liveVoice)
                props.setLiveVoice(false);
            return (
                <>
                <div style={style.wait} className="BMJUA">
                <p>모든 질문이 답변되었습니다.</p>
                </div>
                </>
            )
        }   
        else 
        {
            const onAnswered = (questionId) => {
                // console.log("RoomSocket::", props.roomSocket)
                questionPatchApi(questionId);
            } 

            let currentQuestion = questionList[questionIdx];
            let userNickName = currentQuestion.user_username;
            let isVoice = currentQuestion.is_voice;
            let userUid = currentQuestion.user_uid;
            let imageLink = currentQuestion.user_profile_image_url

            if (isVoice)
            {
                if (!props.liveVoice)
                    props.setLiveVoice(true)
                return (
                <>
                <VoiceQuestion 
                userUid={userUid} 
                userNickName={userNickName} 
                imageLink={imageLink}
                isHost={props.isHost} 
                onAnswered={onAnswered} 
                currentQuestionId={currentQuestion.id}
                client={props.client}
                rtmClient={props.rtmClient}
                host={props.host}
                localAudioTrack={props.localAudioTrack}
                remoteUsers={props.remoteUsers}
                channelNum={props.channelNum}
                />
                </>
                )
            }

            else {
                if (props.liveVoice)
                    props.setLiveVoice(false);
                let userQuestion = currentQuestion.question;
          
                return (
                <StringQuestion 
                userNickName={userNickName} 
                userQuestion={userQuestion} 
                isHost={props.isHost} 
                onAnswered={onAnswered}
                currentQuestionId={currentQuestion.id}
                imageLink={imageLink}
                />
                )
            }
        }
    }
    else return (
        <>
        <div style={style.wait}>
            <p> 로딩중 </p>
        </div>
        </>
    )


    // if (questionResponse.arrived)
    // {
    //     let questionList = questionResponse.data
    //     if (questionList.length == questionNum) 
    //         return <p>질문이 없습니다.</p>
    //     else if (questionList.length != questionNum)
    //     {
    //         let currentQuestion = questionList[questionNum];
    //         let userNickName = currentQuestion.user_nickname;
    //         let isVoice = currentQuestion.is_voice;
    //         if (isVoice)
    //             return (
    //             <>
    //             <p>{userNickName} 음성 질문입니다</p>
    //             <button
    //             onClick={()=>{onAnswered(currentQuestion.id)}}
    //             >완료</button>
    //             </>
    //             )
    //         else {
    //             let userQuestion = currentQuestion.question;
    //             return (
    //             <>
    //             <p>{userQuestion}</p>
    //             <button
    //             onClick={()=>{onAnswered(currentQuestion.id)}}
    //             >완료</button>
    //             </>
    //             )
    //         }
    //     }
    // }
   
})


export default CurrentQuestion