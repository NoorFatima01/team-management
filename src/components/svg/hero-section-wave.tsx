import React from 'react';

type Props = {
  className?: string;
};

const HeroSectionWave = ({ className }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 2400 800'
      className={className}
    >
      <defs>
        <linearGradient
          x1='50%'
          y1='0%'
          x2='50%'
          y2='100%'
          id='oooscillate-grad'
        >
          <stop
            stop-color='hsl(105, 69%, 40%)'
            stop-opacity='1'
            offset='0%'
          ></stop>
          <stop
            stop-color='hsl(105, 69%, 60%)'
            stop-opacity='1'
            offset='100%'
          ></stop>
        </linearGradient>
      </defs>
      <g
        strokeWidth='3'
        stroke='url(#oooscillate-grad)'
        fill='none'
        strokeLinecap='round'
      >
        <path
          d='M 0 506 Q 600 -100 1200 400 Q 1800 900 2400 506'
          opacity='0.70'
        ></path>
        <path
          d='M 0 484 Q 600 -100 1200 400 Q 1800 900 2400 484'
          opacity='0.45'
        ></path>
        <path
          d='M 0 462 Q 600 -100 1200 400 Q 1800 900 2400 462'
          opacity='0.86'
        ></path>
        <path
          d='M 0 440 Q 600 -100 1200 400 Q 1800 900 2400 440'
          opacity='0.44'
        ></path>
        <path
          d='M 0 418 Q 600 -100 1200 400 Q 1800 900 2400 418'
          opacity='0.22'
        ></path>
        <path
          d='M 0 396 Q 600 -100 1200 400 Q 1800 900 2400 396'
          opacity='0.46'
        ></path>
        <path
          d='M 0 374 Q 600 -100 1200 400 Q 1800 900 2400 374'
          opacity='0.61'
        ></path>
        <path
          d='M 0 352 Q 600 -100 1200 400 Q 1800 900 2400 352'
          opacity='0.15'
        ></path>
        <path
          d='M 0 330 Q 600 -100 1200 400 Q 1800 900 2400 330'
          opacity='0.96'
        ></path>
        <path
          d='M 0 308 Q 600 -100 1200 400 Q 1800 900 2400 308'
          opacity='0.78'
        ></path>
        <path
          d='M 0 286 Q 600 -100 1200 400 Q 1800 900 2400 286'
          opacity='0.61'
        ></path>
        <path
          d='M 0 264 Q 600 -100 1200 400 Q 1800 900 2400 264'
          opacity='0.58'
        ></path>
        <path
          d='M 0 242 Q 600 -100 1200 400 Q 1800 900 2400 242'
          opacity='0.75'
        ></path>
        <path
          d='M 0 220 Q 600 -100 1200 400 Q 1800 900 2400 220'
          opacity='0.69'
        ></path>
        <path
          d='M 0 198 Q 600 -100 1200 400 Q 1800 900 2400 198'
          opacity='0.70'
        ></path>
        <path
          d='M 0 176 Q 600 -100 1200 400 Q 1800 900 2400 176'
          opacity='0.63'
        ></path>
        <path
          d='M 0 154 Q 600 -100 1200 400 Q 1800 900 2400 154'
          opacity='0.34'
        ></path>
        <path
          d='M 0 132 Q 600 -100 1200 400 Q 1800 900 2400 132'
          opacity='0.44'
        ></path>
        <path
          d='M 0 110 Q 600 -100 1200 400 Q 1800 900 2400 110'
          opacity='0.22'
        ></path>
        <path
          d='M 0 88 Q 600 -100 1200 400 Q 1800 900 2400 88'
          opacity='0.98'
        ></path>
        <path
          d='M 0 66 Q 600 -100 1200 400 Q 1800 900 2400 66'
          opacity='0.29'
        ></path>
        <path
          d='M 0 44 Q 600 -100 1200 400 Q 1800 900 2400 44'
          opacity='0.65'
        ></path>
      </g>
    </svg>
  );
};

export default HeroSectionWave;
