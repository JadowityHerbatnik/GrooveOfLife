import React, { useContext } from "react";
import { ScalableText } from "@common/Generic";
import { ThemeSwitch } from "@common/ThemeSwitch";
import { SwitchTheme } from "@common/Layout";

export const Slide3 = () => {
  const switchTheme = useContext(SwitchTheme);
  return (
    <div className="d-flex h-100 align-items-center justify-content-center">
      <ScalableText min={16} max={20}>
        You can change the color theme by clicking the button below or in top left corner
        <br />
        <br />
        <ThemeSwitch switchTheme={() => switchTheme()} />
      </ScalableText>
    </div>
  );
};
