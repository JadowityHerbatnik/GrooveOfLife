import React from "react";
import { SpeedSlider } from "@home/SpeedSlider";
import { FlexBox, ScalableText } from "@common/Generic";

export const Slide2 = () => {
  return (
    <div className="d-flex h-100 align-items-center justify-content-center">
      <ScalableText min={13} max={19} as="div">
        Use the slider to adjust game speed
        <FlexBox>
          <SpeedSlider />
        </FlexBox>
      </ScalableText>
    </div>
  );
};
