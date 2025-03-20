import React from 'react'

interface HajjIconProps {
  width?: number
  height?: number
  className?: string
}

const HajjIcon: React.FC<HajjIconProps> = ({
  width = 55,
  height = 44,
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 55 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="34.5447"
        cy="38.3414"
        rx="28.4644"
        ry="22.1123"
        transform="rotate(-19.8025 34.5447 38.3414)"
        fill="url(#paint0_linear_pilgrim)"
      />
      <g filter="url(#filter0_d_pilgrim)">
        <path
          d="M30.2718 10C26.3619 10 23.5585 13.668 23.5585 18.1928C23.5585 18.1928 27.3424 15.1807 30.2718 15.1807C33.2013 15.1807 36.7411 18.3133 36.7411 18.3133C36.7411 13.7885 34.1818 10 30.2718 10Z"
          fill="white"
        />
        <path
          d="M36.7411 18.3133C36.7411 13.7885 34.1818 10 30.2718 10C26.3619 10 23.5585 13.668 23.5585 18.1928M36.7411 18.3133C36.7411 18.3133 33.2013 15.1807 30.2718 15.1807C27.3424 15.1807 23.5585 18.1928 23.5585 18.1928M36.7411 18.3133C36.7411 20.1872 35.7023 21.4155 34.9102 22.6506C33.7897 24.3976 32.5624 25.7831 30.2718 25.7831M30.2718 25.7831C29.6395 25.7831 29.1382 25.7104 28.7425 25.6026C27.7966 25.3449 26.6398 24.9105 25.7337 25.2825C24.1848 25.9184 21.8496 27.0798 20.2628 28.7952C17.6995 31.5663 17.3333 40 17.3333 40M30.2718 25.7831C31.1411 25.7831 31.7782 25.6151 32.2383 25.3987C33.0235 25.0294 33.9175 24.5469 34.7518 24.7896C34.8036 24.8046 34.8564 24.8203 34.9102 24.8366M30.2718 25.7831C27.8319 25.7831 26.5552 24.4069 25.3894 22.4096C24.6871 21.2064 23.5585 19.8939 23.5585 18.1928M34.9102 24.8366C34.9102 24.8366 33.5675 28.4337 31.0042 30.4819C28.4409 32.5301 24.1688 32.6506 24.1688 32.6506M34.9102 24.8366C36.1557 25.2139 37.9243 25.9273 39.4264 27.2068M24.1688 32.6506L25.1453 30.7229M24.1688 32.6506C24.1688 32.6506 23.5585 33.6145 23.1923 36.2651C22.8261 38.9157 23.0702 40 23.0702 40M39.4264 27.2068C39.9601 27.6614 40.4602 28.1874 40.8912 28.7952C41.6328 29.8409 42.1496 31.2194 42.5096 32.6506M39.4264 27.2068C39.4264 27.2068 38.572 30.4819 35.7646 33.253C32.9572 36.0241 30.2718 37.1084 30.2718 37.1084M42.5096 32.6506C43.3941 36.1663 43.3324 40 43.3324 40M42.5096 32.6506C42.5096 32.6506 42.2339 33.8554 40.2809 36.6265C38.3279 39.3976 37.2293 40 37.2293 40"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_pilgrim"
          x="5.03334"
          y="-0.3"
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
            result="effect1_dropShadow_pilgrim"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_pilgrim"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_pilgrim"
          x1="33.5978"
          y1="7.87777"
          x2="34.5447"
          y2="60.4537"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#156DAD" />
          <stop offset="1" stopColor="#D2ECFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default HajjIcon
