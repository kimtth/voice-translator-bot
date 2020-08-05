import React, { useState, useEffect } from 'react';
import mic from '../../assets/mic_icon.png'
import rec from '../../assets/rec_icon.png'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'
import * as Config from '../App/Constants'

export default function ToggleMicButton(props) {
    const [ onOff, setRecOnOff ] = useState(false);
    const { type, id } = props;

    useEffect(() => {
        handleSpeech();
    }, [onOff])

    const handleChange = (e) => {
        setRecOnOff(onOff ? false : true);
        e.preventDefault();
    }

    const handleSpeech = () => {
        if (onOff === false){
            return
        }
        let subscriptionKey = Config.SPEECH_SUBSCRIPTION_KEY;
        let serviceRegion = Config.SPEECH_SERVICE_REGION;
 
        let speechConfig;
        if (subscriptionKey.value === "" || subscriptionKey.value === "subscription") {
            alert("Please enter your Microsoft Cognitive Services Speech subscription key!");
            return;
        } else {
            speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        }
    
        speechConfig.speechRecognitionLanguage = Config.SPEECH_RECOGNITION_LANGUAGE
        let audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        let recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    
        recognizer.recognizeOnceAsync(
            function (result) {
                //console.log(result.text);
                props.onHandle(result.text);
                recognizer.close();
                recognizer = undefined;
                setRecOnOff(onOff ? false : true);
            },
            function (err) {
                //console.log(err.text);
                props.onHandle(err.text);
                recognizer.close();
                recognizer = undefined;
                setRecOnOff(onOff ? false : true);
            }
        );
    }

    return (
        <button type={type} id={id} className="button" onClick={handleChange}>
            <img src={onOff ? rec: mic} id={id} alt="Mic" width="30" height="25"/>
        </button>
    );
}