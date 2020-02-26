import React from "react";
import styled from "styled-components";
import "../styles/fontello/css/fontello.css";

const SettingsContainer = styled.div`
  margin: auto;
  border: 1px solid purple;
  background-color: rgba(0, 0, 0, 0.2);
  // width: 20vw;
  height: 40vh;
`;
const BlurredBackground = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  @supports (not (backdrop-filter: blur())) {
    background-color: rgba(255, 255, 255, 0.7);
  }
  backdrop-filter: blur(10px);
`;
const ModeButton = styled.button`
  background-color: transparent;
  border: 2px solid purple;
  color: white;
  font-size: 1em;
`;
const ModeButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: center;
  margin: 50px 2vw 0 2vw;
`;
const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
`;
const Icon = styled.i`
  font-size: 4.5vh;
`;

const Settings = props => {
  if (!props.showSettings) {
    return null;
  }
  return (
    <BlurredBackground>
      <SettingsContainer>
        <CloseButtonContainer>
          <CloseButton onClick={() => props.toggle("settings")}>
            <Icon className="icon-cancel"></Icon>
          </CloseButton>
        </CloseButtonContainer>
        <p> Gameplay mode:</p>
        <ModeButtonContainer>
          <ModeButton
            style={{
              backgroundColor:
                props.currentGameMode === "harmonic" ? "purple" : "transparent",
            }}
            onClick={() => props.changeGameMode("harmonic")}
          >
            Harmonic
          </ModeButton>
          <ModeButton
            style={{
              backgroundColor:
                props.currentGameMode === "iterative"
                  ? "purple"
                  : "transparent",
            }}
            onClick={() => props.changeGameMode("iterative")}
          >
            Iterative
          </ModeButton>
        </ModeButtonContainer>
      </SettingsContainer>
    </BlurredBackground>
  );
};
export default Settings;
