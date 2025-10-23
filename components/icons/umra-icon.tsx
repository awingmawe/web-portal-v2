import React from 'react'

interface UmraIconProps {
  width?: number
  height?: number
  className?: string
}

const UmraIcon: React.FC<UmraIconProps> = ({
  width = 54,
  height = 45,
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 54 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="33.8779"
        cy="39.3414"
        rx="28.4644"
        ry="22.1123"
        transform="rotate(-19.8025 33.8779 39.3414)"
        fill="url(#paint0_linear_education)"
      />
      <g filter="url(#filter0_d_education)">
        <path
          d="M14.5417 16.9687L28 21.6968L41.4583 16.9687L28 12.2406L14.5417 16.9687ZM27.4392 9.09954C27.8052 8.97337 28.2007 8.97337 28.5667 9.09954L43.6778 14.412C44.4628 14.6843 45 15.5077 45 16.4374V18.9077L28.2833 24.7847C28.1003 24.8511 27.9056 24.8511 27.7226 24.7847L11 18.9077V16.4374C11 15.5077 11.5372 14.6843 12.3281 14.412L27.4392 9.09954ZM28.85 26.8167L45 21.139V24.2269L41.8833 25.3226C41.3875 25.4952 41.1101 26.0929 41.2635 26.6507C41.417 27.2085 41.9483 27.5206 42.4441 27.348L45 26.4515V35.5624C45 36.4921 44.4628 37.3156 43.6719 37.5878L28.5608 42.9003C28.1948 43.0265 27.7993 43.0265 27.4333 42.9003L12.3222 37.5878C11.5372 37.3156 11 36.4921 11 35.5624V26.4515L13.55 27.348C14.0458 27.5206 14.5771 27.2085 14.7306 26.6507C14.884 26.0929 14.6066 25.4952 14.1108 25.3226L11 24.2202V21.1324L27.1559 26.8101C27.7049 27.0027 28.2951 27.0027 28.8441 26.8101L28.85 26.8167ZM17.9003 26.6441C17.4045 26.4714 16.8733 26.7835 16.7198 27.3413C16.5663 27.8992 16.8438 28.4968 17.3396 28.6695L21.1174 29.9976C21.6132 30.1702 22.1444 29.8581 22.2979 29.3003C22.4514 28.7425 22.174 28.1449 21.6781 27.9722L17.9003 26.6441ZM38.6781 28.6695C39.174 28.4968 39.4514 27.8992 39.2979 27.3413C39.1444 26.7835 38.6132 26.4714 38.1174 26.6441L34.3396 27.9722C33.8437 28.1449 33.5663 28.7425 33.7198 29.3003C33.8733 29.8581 34.4045 30.1702 34.9003 29.9976L38.6781 28.6695ZM25.4559 29.3003C24.9601 29.1277 24.4288 29.4398 24.2753 29.9976C24.1219 30.5554 24.3993 31.1531 24.8951 31.3257L27.1677 32.1226C27.7167 32.3152 28.3069 32.3152 28.8559 32.1226L31.1285 31.3257C31.6243 31.1531 31.9017 30.5554 31.7483 29.9976C31.5948 29.4398 31.0635 29.1277 30.5677 29.3003L28.2951 30.0972C28.1122 30.1636 27.9174 30.1636 27.7344 30.0972L25.4618 29.3003H25.4559Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_education"
          x="2.7"
          y="0.7"
          width="50.6"
          height="50.6"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4.15" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_education"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_education"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_education"
          x1="33.8779"
          y1="17.2292"
          x2="33.8779"
          y2="61.4537"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F8CB3E" />
          <stop offset="1" stopColor="#fff1e3" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default UmraIcon
