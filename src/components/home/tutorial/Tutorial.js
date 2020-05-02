import React, { useContext } from "react";
import { ModalContainer, DimmedBackground, ScalableText } from "@common/Generic";
import { CarouselTutorial } from "@tutorial/Carousel";
import { ThemeContext } from "@common/Layout";
import { useRender } from "@hooks/useRender";
import { DispatchContext, StateContext } from "@home/Game";
import { WrapperButton } from "@common/Generic";
import { SHOW_TUTORIAL } from "@reducer/action-types";
import styled from "styled-components";
import { SvgIcon } from "@common/Generic";
import { Clear } from "@styles/svg/Buttons";
import { tutorial_key } from "@utils/local-storage-keys";
import "nes.css/css/nes.min.css";

const StyledButton = styled(WrapperButton)`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 4vh;
  height: 4vh;
  z-index: 2;
`;
const StyledIcon = styled(SvgIcon)`
  width: 80%;
  height: 80%;
`;

const StyledModal = styled(ModalContainer)`
  padding: 0 0 10px 0;
  width: min-content;
  height: min-content;
`;

const isFirstVisit = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const originUrl = window.location.origin;
  if (window.previousPath === undefined) {
    return false;
  } else {
    return !window.previousPath.includes(originUrl);
  }
};

export const Tutorial = () => {
  const dispatch = useContext(DispatchContext);
  const { showTutorial } = useContext(StateContext);
  const colors = useContext(ThemeContext);
  const [shouldRender, onAnimationEnd] = useRender(showTutorial);

  const discardAndClose = () => {
    localStorage.setItem(tutorial_key, false);
    dispatch({ type: SHOW_TUTORIAL, payload: false });
  };

  return shouldRender && isFirstVisit() ? (
    <DimmedBackground color={colors.background} show={showTutorial} onAnimationEnd={onAnimationEnd}>
      <StyledModal colors={colors} show={showTutorial} className="nes-container is-rounded">
        <StyledButton
          aria-label="close tutorial"
          onClick={() => dispatch({ type: SHOW_TUTORIAL, payload: false })}
        >
          <StyledIcon color={colors.grey} svg={Clear} />
        </StyledButton>
        <CarouselTutorial></CarouselTutorial>
        <WrapperButton
          style={{ width: "initial", textDecoration: "underline" }}
          onClick={() => discardAndClose()}
        >
          <ScalableText min={9} max={13} style={{ maxWidth: "100%" }}>
            Don't show this again
          </ScalableText>
        </WrapperButton>
      </StyledModal>
    </DimmedBackground>
  ) : null;
};
