import { keyframes } from "styled-components";

export const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
export const SlideFromBottom = keyframes`
		0% {
      transform: translateY(100vh);
    }
    100% {
      transform: translateY(0);
    }
`;
export const SlideFromLeft = keyframes`
    0% {
      transform: translateX(-100vw);
    }
    100% {
      transform: translateX(1);
    }
`;
