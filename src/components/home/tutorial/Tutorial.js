import React, { useContext } from "react";
import { ModalContainer, DimmedBackground } from "@common/Generic";
import { CarouselTutorial } from "@tutorial/Carousel";
import { ThemeContext } from "@common/Layout";
import { useRender } from "@hooks/useRender";
import { DispatchContext, StateContext } from "@home/Game";
import { WrapperButton } from "@common/Generic";
import { SHOW_TUTORIAL } from "@reducer/action-types";
import styled from "styled-components";
import { SvgIcon } from "@common/Generic";
import { Clear } from "@styles/svg/Buttons";

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

export const Tutorial = () => {
  const dispatch = useContext(DispatchContext);
  const { showTutorial } = useContext(StateContext);
  const colors = useContext(ThemeContext);
  const [shouldRender, onAnimationEnd] = useRender(showTutorial);
  const isFirstVisit = window.previousPath === "";

  const discardAndClose = () => {
    localStorage.setItem("showTutorial", false);
    dispatch({ type: SHOW_TUTORIAL, payload: false });
  };

  return shouldRender && isFirstVisit ? (
    <DimmedBackground color={colors.background} show={showTutorial} onAnimationEnd={onAnimationEnd}>
      <ModalContainer colors={colors} show={showTutorial}>
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
          Don't show this again
        </WrapperButton>
      </ModalContainer>
    </DimmedBackground>
  ) : null;
};
