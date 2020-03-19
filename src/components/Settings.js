import React from "react";
import styled from "styled-components";
import styled, { css } from "styled-components";
import "../styles/fontello/css/fontello.css";
import { keyboard } from "../utils/constants.js";
import { FadeIn, FadeOut } from "../styles/animations.js";
const { margin, blackWidth, blackHeight, whiteHeight, whiteWidth } = keyboard;
const SettingsContainer = styled.div`
  margin: auto;
  border: 1px solid purple;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
  top: -100vh;
  transform: translateY(${({ show }) => (show ? "100vh" : "-100vh")});
  transition: transform 1s;
`;
const BlurredBackground = styled.div`
  animation: ${({ show }) => css`0.2s ease ${show ? FadeIn : FadeOut}`};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  @supports (not (backdrop-filter: blur())) {
    background-color: rgba(0, 0, 0, 0.7);
  }
  backdrop-filter: blur(10px);
`;
const ModeButton = styled.button`
  background-color: ${({ currentGameMode, buttonType }) =>
    currentGameMode === buttonType ? "purple" : "transparent"};
  border: 2px solid purple;
  color: white;
  font-size: 1em;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 10px 20px 10px;
`;
const CloseButtonContainer = styled(FlexRow)`
  justify-content: flex-end;
  margin: 0;
`;
const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding: 0;
`;
const Icon = styled.i`
  font-size: 4.5vh;
`;
const KeysButtons = props =>
  [...Array(12).keys()].map(keyIndex => (
    <NoteButtons
      key={keyIndex}
      isBlack={isBlack(keyIndex)}
      note={keyIndex}
      isNoteUsed={props.chromaticScale[keyIndex] ? true : false}
      onClick={() => props.toggleNote(keyIndex)}
    ></NoteButtons>
  ));
function isBlack(keyIndex) {
  const blackKeysIndexes = [1, 3, 6, 8, 10];
  return blackKeysIndexes.includes(keyIndex) ? true : false;
}
const NoteButtons = styled.div`
  box-sizing: border-box;
  height: ${({ isBlack }) => (isBlack ? blackHeight : whiteHeight)};
  width: ${({ isBlack }) => (isBlack ? blackWidth : whiteWidth)};
  margin-left: ${({ isBlack }) => (isBlack ? `calc(${blackWidth}/-2)` : `-${margin}`)};
  margin-right: ${({ isBlack }) => (isBlack ? `calc(${blackWidth}/-2)` : `-${margin}`)};
  z-index: ${({ isBlack }) => (isBlack ? 1 : 0)};
  background-color: ${({ isNoteUsed, isBlack }) =>
    isNoteUsed ? "purple" : isBlack ? "black" : "grey"};
  border: ${() => `${margin} solid black`};
  transition: background-color 0.2s;
`;
const Label = styled.p`
  font-family: Geo;
  font-size: 1.5em;
`;
const Settings = props => {
  const [shouldRender, setRender] = useState(props.show);

  useEffect(() => {
    if (props.show) setRender(true);
  }, [props.show]);
  const onAnimationEnd = () => {
    if (!props.show) setRender(false);
  };
  return !shouldRender ? null : (
    <BlurredBackground onAnimationEnd={onAnimationEnd} show={props.show}>
      <SettingsContainer show={props.show}>
        <Label> Gameplay mode:</Label>
        <FlexRow>
          <ModeButton
            buttonType="harmonic"
            currentGameMode={props.currentGameMode}
            onClick={() => props.changeGameMode("harmonic")}
          >
            Harmonic
          </ModeButton>
          <ModeButton
            buttonType="iterative"
            currentGameMode={props.currentGameMode}
            onClick={() => props.changeGameMode("iterative")}
          >
            Iterative
          </ModeButton>
        </FlexRow>
        <Label>Notes to use</Label>
        <FlexRow>
          <KeysButtons
            chromaticScale={props.chromaticScale}
            toggleNote={keyIndex => props.toggleNote(keyIndex)}
          />
        </FlexRow>
      </SettingsContainer>
    </BlurredBackground>
  );
};
export default Settings;
