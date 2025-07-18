import React, {useState} from 'react'
import languages from "../objects/languages"
import playBeep from "../utility/playBeep.js"

/*

Color codes for dark mode:
rgb(10, 36, 75) !important

all text: text-light

body background: #110a0a

Input fields: rgb(69, 65, 65)

--bs-btn-bg: #072550


*/

function Home(props) {

  const [inputText,setInputText] = useState("");
  const [outputText,setOutputText] = useState("");
  const [wordCount,setWordCount] = useState(0);
  const [fromLanguage, setFromLanguage] = useState('en')
  const [toLanguage, setToLanguage] = useState('mors')
  const {colorMode} = props.mode;
  const [morsStr, setMors] = useState("")
  const capitalize = () => {
    let newText = inputText.charAt(0).toUpperCase() + inputText.slice(1)
    setOutputText(newText)
  }

  const readText = () => {
    let synth = window.speechSynthesis
    let generatedSpeech = new SpeechSynthesisUtterance(inputText)
    synth.speak(generatedSpeech)
  }

  const countWords = () => {
    let textWords = inputText.split(" ").filter((element) => { 
      return element!==""
     })

    return textWords.length
  }

  const playMorse = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const dotDuration = 100;

    let time = context.currentTime;
    console.log(outputText)
    for(let char of outputText){
      switch(char){
        case '.':
          playBeep(context, time, dotDuration);
          time += dotDuration / 1000 + 0.05
          break;
        case '-':
          playBeep(context, time, dotDuration*3);
          time += (dotDuration*3) / 1000 + 0.05
          break;
        case ' ':
          playBeep(context, time, dotDuration*3);
          time += dotDuration / 1000 * 3
          break;
        case '/':
          playBeep(context, time, dotDuration*5);
          time += dotDuration / 1000 * 5
          break;
      }
    }
  };

  let inputStyle = {"input":{
        height: "300px",
        width: "400px",
        backgroundColor: colorMode === 'dark' ? "rgb(69, 65, 65)" : "rgb(209, 209, 209)",
        paddingBottom: "260px",
        paddingLeft: "10px",
        color: colorMode === 'dark' ? "white" : "black"
  },
  "formOutput":{
    height: "300px",
    width: "400px",
    backgroundColor: colorMode === 'dark' ? "rgb(69, 65, 65)" : "rgb(209, 209, 209)",
    paddingBottom: "260px",
    paddingLeft: "10px",
    Cursor: "default",
    color: colorMode === 'dark' ? "white" : "black",
    Outline: "none",
   }

}

  let translationHandle = async () => {
      try{
        let response = await fetch("http://localhost:5000/translate", {
          method: "POST",
          headers: { "Content-Type":"application/json" },
          body: JSON.stringify( { text: inputText, from: fromLanguage, to: toLanguage } )
        })

        const data = await response.json();

        if(data.message === "Input field is empty!"){
          throw(Error("Input field is empty!"))
        }

        setOutputText(data.text)

        if(toLanguage === 'mors') playMorse();

      } catch (err) {
        alert(`An error occurred: ${err.message}`)
      }
  }

  const languageFromSelect = (e) => {
    setFromLanguage(e.target.value)
  }

  const languageToSelect = (e) => {
    setToLanguage(e.target.value)
  }


  return (
  <div className="min-vh-100 d-flex flex-column align-items-center bg-bg-body-tertiary" style={
    {
      backgroundColor: colorMode === "dark" ? "#110a0a" : ""
    }
  }>

    <div>
      <h1 className={`fs-2 mt-5 d-inline-block ${colorMode === 'dark' ? 'text-white' : '' }`}>Welcome to textMaze - analyze your text here!</h1>
    </div>
    <div>
      <h1 className={`fs-5 d-inline-block ${colorMode === 'dark' ? 'text-white' : '' }`}>Translate your text, or change it to uppercase or strip empty spaces. Also count characters and words!</h1>
    </div>
    <div className=" d-flex flex-row mt-5 gap-5">
      <input type="text" value={inputText} onChange={(e) => { setInputText(e.target.value)
        if(e.target.value === ""){
          setOutputText("")
        } else{
          setWordCount(inputText === "" ? 0 : countWords())
        } }} style={inputStyle.input} className="d-flex align-content-star form-control pb-25" placeholder="Enter text to analyze"/>

      <input type="text" style={inputStyle.formOutput} value={outputText} readOnly onClick={() => { 
        alert("You can't edit this!")
         }}  ></input>
    </div>

    <div className="translationContainer d-flex mt-4 justify-content-between w-25">
      <div className="from">
        <select value={fromLanguage} onChange={languageFromSelect}>
          { 
            Object.entries(languages).map(language => (
            <option value={language[1]} key={language[1] + 'to'}>
            {language[0]}
            </option>
            )) 
          }
        </select>
      </div>

      <div className="to">
        <select value={toLanguage} onChange={languageToSelect}>
          { 
            Object.entries(languages).map(language => (
            <option value={language[1]} key={language[1] + 'from'}>
            {language[0]}
            </option>
            )) 
          }
        </select>
      </div>
    </div>


    <div className="d-flex gap-3 mt-4">
    <button type="button" style={{backgroundColor: colorMode === 'dark' ? "#072550" : "" }} onClick={() => { setOutputText(inputText.toUpperCase()) }} className="btn btn-primary">Uppercase</button>
    <button type="button" style={{backgroundColor: colorMode === 'dark' ? "#072550" : "" }} onClick={() => { setOutputText(inputText.toLowerCase()) }} className="btn btn-primary">Lowercase</button>
    <button type="button" style={{backgroundColor: colorMode === 'dark' ? "#072550" : "" }} onClick={capitalize} className="btn btn-primary">Capitalize</button>
    <button type="button" style={{backgroundColor: colorMode === 'dark' ? "#072550" : "" }} onClick={() => {setOutputText(inputText.trim())}} className="btn btn-primary">Remove spaces</button>
    <button type="button" style={{backgroundColor: colorMode === 'dark' ? "#072550" : "" }} className="btn btn-primary" onClick={readText}>Hear</button>
    <button type="button" style={{backgroundColor: colorMode === 'dark' ? "#072550" : "" }} className="btn btn-primary" onClick={() => translationHandle()} >Translate</button>
    </div>

    <div className={`mt-4 mb-4 d-flex flex-column ${colorMode === 'dark' ? 'text-white' : '' }`}>
       <h6>Words: {wordCount}</h6>
       <h6>Characters:  {inputText.length}</h6>
       <h6>Read time: {(inputText.length/238).toFixed(2)} minutes</h6>
    </div>
  </div>
  )
}

export default Home



