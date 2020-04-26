import { useEffect, useState } from "react";

export const useRender = (show) => {
  const [shouldRender, setRender] = useState(show);
  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };
  return [shouldRender, onAnimationEnd];
};
