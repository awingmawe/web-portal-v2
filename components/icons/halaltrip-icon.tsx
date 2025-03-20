import React from 'react'

interface HalalTripIconProps {
  width?: number
  height?: number
  className?: string
}

const HalalTripIcon: React.FC<HalalTripIconProps> = ({
  width = 55,
  height = 42,
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 55 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="29.5444"
        cy="36.3414"
        rx="28.4644"
        ry="22.1123"
        transform="rotate(-19.8025 29.5444 36.3414)"
        fill="url(#paint0_linear_plane)"
      />
      <g filter="url(#filter0_d_plane)">
        <path
          d="M41.4043 21.0592L34.7885 18.2117L33.3152 17.5883C33.0885 17.475 32.8902 17.1775 32.8902 16.9225V12.5875C32.8902 11.2275 31.8843 9.6125 30.666 8.98916C30.241 8.77666 29.731 8.77666 29.306 8.98916C28.1018 9.6125 27.096 11.2417 27.096 12.6017V16.9367C27.096 17.1917 26.8977 17.4892 26.671 17.6025L18.596 21.0733C17.7035 21.4417 16.981 22.5608 16.981 23.5242V25.3942C16.981 26.5983 17.8877 27.1933 19.0068 26.7117L26.1043 23.6517C26.6568 23.4108 27.1102 23.7083 27.1102 24.3175V25.89V28.44C27.1102 28.7658 26.926 29.2333 26.6993 29.46L23.4127 32.7608C23.0727 33.1008 22.9168 33.7667 23.0727 34.2483L23.7102 36.175C23.9652 37.0108 24.9143 37.4075 25.6935 37.0108L29.0652 34.1775C29.5752 33.7383 30.411 33.7383 30.921 34.1775L34.2927 37.0108C35.0718 37.3933 36.021 37.0108 36.3043 36.175L36.9418 34.2483C37.0977 33.7808 36.9418 33.1008 36.6018 32.7608L33.3152 29.46C33.0743 29.2333 32.8902 28.7658 32.8902 28.44V24.3175C32.8902 23.7083 33.3293 23.425 33.896 23.6517L40.9935 26.7117C42.1127 27.1933 43.0193 26.5983 43.0193 25.3942V23.5242C43.0193 22.5608 42.2968 21.4417 41.4043 21.0592Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_plane"
          x="4.70015"
          y="-2.3"
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
            result="effect1_dropShadow_plane"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_plane"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_plane"
          x1="27.5505"
          y1="3.37506"
          x2="29.5444"
          y2="58.4537"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B97D" />
          <stop offset="1" stopColor="#DFFFF5" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default HalalTripIcon
