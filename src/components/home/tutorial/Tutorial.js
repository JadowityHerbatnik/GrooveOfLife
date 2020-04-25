import React, { useContext } from "react";
import { ModalContainer, DimmedBackground } from "@common/Generic";
import { Carousel } from "@tutorial/Carousel";
import { ThemeContext } from "@common/Layout";
import { useRender } from "@hooks/useRender";
import { useLocalStorageState } from "@hooks/UseLocalStorageState";
import { DispatchContext, StateContext } from "@home/Game";
import { SHOW_TUTORIAL } from "@reducer/action-types";

export const Tutorial = (props) => {
  const dispatch = useContext(DispatchContext);
  const { showTutorial } = useContext(StateContext);
  // const [discardTutorial, setDiscardTutorial] = useLocalStorageState("showTutorial", true);
  const colors = useContext(ThemeContext);
  const [shouldRender, onAnimationEnd] = useRender(showTutorial);
  return !shouldRender ? null : (
    <DimmedBackground color={colors.background} show={shouldRender} onAnimationEnd={onAnimationEnd}>
      <ModalContainer colors={colors} show={shouldRender}>
        <Carousel>
          <button onClick={() => dispatch({ type: SHOW_TUTORIAL, payload: false })}>asdaf</button>
        </Carousel>
      </ModalContainer>
    </DimmedBackground>
  );
};
