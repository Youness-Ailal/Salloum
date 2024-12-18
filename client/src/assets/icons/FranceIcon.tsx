import React from "react";
import type { SVGProps } from "react";

export function FranceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 36 36"
      {...props}>
      <path
        fill="#ed2939"
        d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z"></path>
      <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z"></path>
      <path fill="#eee" d="M12 5h12v26H12z"></path>
    </svg>
  );
}
