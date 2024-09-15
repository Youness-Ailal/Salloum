import { useState } from "react";

export function useSharedHover() {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);

  return { onMouseEnter, onMouseLeave, isHovering };
}
