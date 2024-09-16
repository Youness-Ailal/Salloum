import { useState } from "react";

export function useSharedHover() {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);
  const changeHoveringState = (newState: boolean) => setIsHovering(newState);

  return { onMouseEnter, onMouseLeave, isHovering, changeHoveringState };
}
