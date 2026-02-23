import React, { useState, useEffect, useRef } from "react";
import Slider from "react-input-slider";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import xbot from "../Models/xbot/xbot.glb";
import ybot from "../Models/ybot/ybot.glb";
import xbotPic from "../Models/xbot/xbot.png";
import ybotPic from "../Models/ybot/ybot.png";

import * as words from "../Animations/words";
import * as alphabets from "../Animations/alphabets";
import { defaultPose } from "../Animations/defaultPose";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const containerStyle = {
  padding: "20px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  fontFamily: "'Poppins', sans-serif", // Modern font
  backgroundColor: "#3f3aaa", // Use provided background color
  color: "#fff",
// Set default text color to white for better contrast on dark background
};

const rowStyle = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "-15px",
  marginRight: "-15px",
  justifyContent: "space-around",
  alignItems: "flex-start",
};

const controlsContainerStyle = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.15)", // Slightly more visible
  borderRadius: "16px", // More rounded corners
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Softer shadow
  marginBottom: "20px",
  flex: "0 0 calc(30% - 30px)",
  maxWidth: "calc(30% - 30px)",
  backdropFilter: "blur(12px)", // Increased blur for modern look
};

const formGroupStyle = {
  marginBottom: "20px", // Increased margin
};

const formLabelStyle = {
  fontWeight: "600", // Semibold
  color: "#fff",
  marginBottom: "10px",
  display: "block",
  fontSize: "0.95rem", // Slightly smaller
  letterSpacing: "0.03em", // Slight letter spacing for modern look
};

// Modern input style with improved visibility
const formControlStyle = {
  border: "none", // No border
  borderRadius: "10px", // More rounded corners
  padding: "14px", // More padding
  marginBottom: "15px",
  width: "100%",
  boxSizing: "border-box",
  fontSize: "1rem",
  backgroundColor: "rgba(255, 255, 255, 0.85)", // Much brighter background
  color: "#333", // Dark text color for contrast
  backdropFilter: "blur(5px)",
  boxShadow:
    "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 3px rgba(0, 0, 0, 0.05)", // Subtle shadow
  transition: "all 0.2s ease",
};

const buttonStyle = {
  padding: "12px 18px",
  borderRadius: "10px", // More rounded corners
  cursor: "pointer",
  transition: "all 0.3s ease", // Smoother transition
  width: "100%",
  textAlign: "center",
  display: "block",
  marginBottom: "12px",
  fontWeight: "600", // Semibold
  fontSize: "0.95rem",
  border: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
};

const buttonPrimaryStyle = {
  ...buttonStyle,
  backgroundColor: "#4a6cf7", // More modern blue
  color: "#fff",
};

const buttonPrimaryHoverStyle = {
  backgroundColor: "#3a5cd7",
  transform: "translateY(-2px)", // Subtle lift effect
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
};

const buttonSecondaryStyle = {
  ...buttonStyle,
  backgroundColor: "#6c757d",
  color: "#fff",
};

const buttonSecondaryHoverStyle = {
  backgroundColor: "#545b62",
  transform: "translateY(-2px)", // Subtle lift effect
};

const buttonOutlineSecondaryStyle = {
  ...buttonStyle,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  border: "2px solid rgba(255, 255, 255, 0.3)",
};

const buttonOutlineSecondaryHoverStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderColor: "rgba(255, 255, 255, 0.5)",
  transform: "translateY(-2px)", // Subtle lift effect
};

const canvasWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.15)", // Match controls
  borderRadius: "16px", // More rounded corners
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Softer shadow
  padding: "15px",
  flex: "0 0 calc(65% - 30px)",
  maxWidth: "calc(65% - 30px)",
  height: "calc(100vh - 80px)",
  backdropFilter: "blur(12px)", // Increased blur for modern look
};

const canvasContainerStyle = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  borderRadius: "12px", // More rounded corners
  backgroundColor: "#fff",
  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)", // Subtle inner shadow
};

const settingsContainerStyle = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.15)", // Match controls
  borderRadius: "16px", // More rounded corners
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Softer shadow
  flex: "0 0 calc(25% - 30px)",
  maxWidth: "calc(25% - 30px)",
  marginLeft: "20px",
  backdropFilter: "blur(12px)", // Increased blur for modern look
};

const settingsTitleStyle = {
  color: "#fff",
  marginBottom: "20px",
  fontSize: "1.3rem",
  fontWeight: "600", // Semibold
  letterSpacing: "0.03em", // Slight letter spacing
};

const avatarSelectStyle = {
  display: "flex",
  gap: "15px",
  marginBottom: "25px",
  justifyContent: "center",
};

const avatarImageStyle = {
  width: "65px",
  height: "65px",
  borderRadius: "50%",
  cursor: "pointer",
  border: "3px solid transparent",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const avatarImageHoverStyle = {
  borderColor: "#4a6cf7", // Match primary button
  transform: "scale(1.05)", // Slight scale effect
};

const activeAvatarStyle = {
  borderColor: "#2ecc71", // Modern green
  transform: "scale(1.05)", // Slight scale effect
};

const sliderContainerStyle = {
  marginTop: "25px",
};

// Custom slider styles
const sliderStyle = {
  track: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    height: "6px",
    borderRadius: "3px",
  },
  active: {
    backgroundColor: "#4a6cf7", // Match primary button
  },
  thumb: {
    width: "18px",
    height: "18px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
  },
  disabled: {
    opacity: 0.5,
  },
};

// Media Queries for Responsiveness
const mediaQueries = {
  small: "@media (max-width: 768px)",
  medium: "@media (max-width: 992px)",
};

// Modern read-only textarea style
const readOnlyTextAreaStyle = {
  ...formControlStyle,
  backgroundColor: "rgba(255, 255, 255, 0.85)", // Bright background
  color: "#333", // Dark text for contrast
  border: "none",
  cursor: "default",
};

function Convert() {
  const [text, setText] = useState("");
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);
  const [inputText, setInputText] = useState("");
  const [hoveredButton, setHoveredButton] = useState(null);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  let textFromAudio = React.createRef();
  let textFromInput = React.createRef();

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    ref.flag = false;
    ref.pending = false;

    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xf0f0f0);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 5);
    ref.scene.add(spotLight);
    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.renderer.setPixelRatio(window.devicePixelRatio);

    ref.camera = new THREE.PerspectiveCamera(
      30,
      (window.innerWidth * 0.57) / (window.innerHeight - 70),
      0.1,
      1000
    );
    ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);

    const canvasContainer = document.getElementById("canvas-container");
    if (canvasContainer) {
      canvasContainer.innerHTML = "";
      canvasContainer.appendChild(ref.renderer.domElement);
    }

    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    let loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.type === "SkinnedMesh") {
            child.frustumCulled = false;
          }
        });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      (xhr) => {
        console.log(xhr);
      }
    );

    const handleResize = () => {
      if (ref.camera && ref.renderer) {
        ref.camera.aspect =
          (window.innerWidth * 0.57) / (window.innerHeight - 70);
        ref.camera.updateProjectionMatrix();
        ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, bot]);

  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      return;
    }
    requestAnimationFrame(ref.animate);
    if (ref.animations[0].length) {
      if (!ref.flag) {
        if (ref.animations[0][0] === "add-text") {
          setText(text + ref.animations[0][1]);
          ref.animations.shift();
        } else {
          for (let i = 0; i < ref.animations[0].length; ) {
            let [boneName, action, axis, limit, sign] = ref.animations[0][i];
            if (
              sign === "+" &&
              ref.avatar.getObjectByName(boneName)[action][axis] < limit
            ) {
              ref.avatar.getObjectByName(boneName)[action][axis] += speed;
              ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(
                ref.avatar.getObjectByName(boneName)[action][axis],
                limit
              );
              i++;
            } else if (
              sign === "-" &&
              ref.avatar.getObjectByName(boneName)[action][axis] > limit
            ) {
              ref.avatar.getObjectByName(boneName)[action][axis] -= speed;
              ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(
                ref.avatar.getObjectByName(boneName)[action][axis],
                limit
              );
              i++;
            } else {
              ref.animations[0].splice(i, 1);
            }
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false;
      }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  };

  useEffect(() => {
    if (!ref.pending && ref.animations.length > 0) {
      ref.pending = true;
      ref.animate();
    }
  }, [ref.animations, ref.pending, ref]);

  const sign = (inputRef) => {
    if (!inputRef.current || !ref.avatar) return;

    var str = inputRef.current.value.toUpperCase();
    var strWords = str.split(" ");
    setText("");
    ref.animations = [];

    for (let word of strWords) {
      if (words[word]) {
        ref.animations.push(["add-text", word + " "]);
        words[word](ref);
      } else {
        for (const [index, ch] of word.split("").entries()) {
          if (index === word.length - 1)
            ref.animations.push(["add-text", ch + " "]);
          else ref.animations.push(["add-text", ch]);
          alphabets[ch](ref);
        }
      }
    }
    if (ref.animations.length > 0 && !ref.pending) {
      ref.pending = true;
      ref.animate();
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <div style={controlsContainerStyle}>
          <div style={formGroupStyle}>
            <label style={formLabelStyle}>Text Input</label>
            <textarea
              style={{
                ...formControlStyle,
                caretColor: "#333", // Make cursor visible
                resize: "none", // Prevent resizing for clean look
              }}
              rows={3}
              ref={textFromInput}
              placeholder="Type your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              style={{
                ...buttonPrimaryStyle,
                ...(hoveredButton === "textBtn" ? buttonPrimaryHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredButton("textBtn")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => {
                sign({ current: { value: inputText } });
              }}
            >
              <i className="fa fa-play me-2" />
              Start Animation from Text
            </button>
          </div>
          <div style={formGroupStyle}>
            <label style={formLabelStyle}>
              Speech Recognition:{" "}
              <span
                style={{
                  color: listening ? "#2ecc71" : "#aaa",
                  fontWeight: listening ? "bold" : "normal",
                }}
              >
                {listening ? "Active" : "Inactive"}
              </span>
            </label>
            <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
              <button
                style={{
                  ...buttonPrimaryStyle,
                  ...(hoveredButton === "startMic"
                    ? buttonPrimaryHoverStyle
                    : {}),
                }}
                onMouseEnter={() => setHoveredButton("startMic")}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={startListening}
              >
                <i className="fa fa-microphone me-2" />
                Start Mic
              </button>
              <button
                style={{
                  ...buttonSecondaryStyle,
                  ...(hoveredButton === "stopMic"
                    ? buttonSecondaryHoverStyle
                    : {}),
                }}
                onMouseEnter={() => setHoveredButton("stopMic")}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={stopListening}
              >
                <i className="fa fa-microphone-slash me-2" />
                Stop Mic
              </button>
              <button
                style={{
                  ...buttonOutlineSecondaryStyle,
                  ...(hoveredButton === "clear"
                    ? buttonOutlineSecondaryHoverStyle
                    : {}),
                }}
                onMouseEnter={() => setHoveredButton("clear")}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={resetTranscript}
              >
                <i className="fa fa-eraser me-2" />
                Clear
              </button>
            </div>
            <textarea
              style={{
                ...formControlStyle,
                backgroundColor: "rgba(255, 255, 255, 0.85)", // Bright background
                color: "#333", // Dark text for contrast
                caretColor: "#333", // Make cursor visible
                resize: "none", // Prevent resizing for clean look
              }}
              rows={3}
              ref={textFromAudio}
              value={transcript}
              placeholder="Speech input will appear here..."
              readOnly
            />
            <button
              style={{
                ...buttonPrimaryStyle,
                ...(hoveredButton === "speechBtn"
                  ? buttonPrimaryHoverStyle
                  : {}),
              }}
              onMouseEnter={() => setHoveredButton("speechBtn")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => {
                sign(textFromAudio);
              }}
            >
              <i className="fa fa-sign-language me-2" />
              Start Animation from Speech
            </button>
          </div>

          <div style={formGroupStyle}>
            <label style={formLabelStyle}>Processed Text</label>
            <textarea
              style={{
                ...readOnlyTextAreaStyle,
                backgroundColor: "rgba(240, 240, 240, 0.9)", // Slightly different background
                color: "#333", // Dark text for contrast
                resize: "none", // Prevent resizing for clean look
              }}
              rows={3}
              value={text}
              readOnly
            />
          </div>
        </div>
        <div style={canvasWrapperStyle}>
          <div id="canvas-container" style={canvasContainerStyle} />
        </div>
        <div style={settingsContainerStyle}>
          <h5 style={settingsTitleStyle}>Avatar Selection</h5>
          <div style={avatarSelectStyle}>
            <img
              style={{
                ...avatarImageStyle,
                ...(bot === xbot ? activeAvatarStyle : {}),
                ...(hoveredButton === "xbot" ? avatarImageHoverStyle : {}),
              }}
              src={xbotPic}
              onClick={() => {
                setBot(xbot);
              }}
              onMouseEnter={() => setHoveredButton("xbot")}
              onMouseLeave={() => setHoveredButton(null)}
              alt="Avatar 1: XBOT"
            />
            <img
              style={{
                ...avatarImageStyle,
                ...(bot === ybot ? activeAvatarStyle : {}),
                ...(hoveredButton === "ybot" ? avatarImageHoverStyle : {}),
              }}
              src={ybotPic}
              onClick={() => {
                setBot(ybot);
              }}
              onMouseEnter={() => setHoveredButton("ybot")}
              onMouseLeave={() => setHoveredButton(null)}
              alt="Avatar 2: YBOT"
            />
          </div>

          <div style={sliderContainerStyle}>
            <label style={formLabelStyle}>
              Animation Speed: {Math.round(speed * 100) / 100}
            </label>
            <Slider
              axis="x"
              xmin={0.05}
              xmax={0.5}
              xstep={0.01}
              x={speed}
              onChange={({ x }) => setSpeed(x)}
              styles={sliderStyle}
            />
          </div>

          <div style={sliderContainerStyle}>
            <label style={formLabelStyle}>Pause Time: {pause} ms</label>
            <Slider
              axis="x"
              xmin={0}
              xmax={2000}
              xstep={100}
              x={pause}
              onChange={({ x }) => setPause(x)}
              styles={sliderStyle}
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

        body {
          font-family: "Poppins", sans-serif;
        }

        ${mediaQueries.small} {
          .rowStyle {
            flex-direction: column;
          }
          .controlsContainerStyle,
          .canvasWrapperStyle,
          .settingsContainerStyle {
            flex: 1 0 100%;
            max-width: 100%;
          }
          .settingsContainerStyle {
            margin-left: 0;
            margin-top: 20px;
          }
        }
        ${mediaQueries.medium} {
          .rowStyle {
            flex-direction: column;
          }
          .controlsContainerStyle,
          .canvasWrapperStyle,
          .settingsContainerStyle {
            flex: 1 0 100%;
            max-width: 100%;
          }
          .settingsContainerStyle {
            margin-left: 0;
            margin-top: 20px;
          }
        }

        /* Input placeholder style */
        textarea::placeholder {
          color: #aaa !important;
          opacity: 1;
        }

        /* Custom scrollbar for textareas */
        textarea::-webkit-scrollbar {
          width: 8px;
        }

        textarea::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        textarea::-webkit-scrollbar-thumb {
          background: rgba(74, 108, 247, 0.5);
          border-radius: 4px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(74, 108, 247, 0.7);
        }

        /* Focus styles */
        textarea:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(74, 108, 247, 0.3),
            0 4px 6px rgba(0, 0, 0, 0.1);
          border-color: #4a6cf7;
        }
      `}</style>
    </div>
  );
}

export default Convert;
