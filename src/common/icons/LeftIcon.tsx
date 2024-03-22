import { IconStyle } from './icon-style.ts';

function LeftIcon({style}: { style: IconStyle }) {
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={style}
         viewBox="0 0 16 16">
      <path
        d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753"/>
    </svg>
  );
}

export default LeftIcon;
