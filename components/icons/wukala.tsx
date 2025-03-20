import React from 'react'

interface WukalaIconProps {
  width?: number
  height?: number
  className?: string
  color?: string
}

const WukalaIcon: React.FC<WukalaIconProps> = ({
  width = 21,
  height = 20,
  className = '',
  color = 'white',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      className={className}
    >
      <path
        d="M15.787 7.88235C15.787 14.7647 10.7 14.9765 10.7 8.2C10.7 14.3881 6.5 14.2 5.9 9.4C5.52789 6.42317 1.7 6.4 1.7 10C1.7 14.9706 5.72943 19 10.7 19C15.6706 19 19.7 14.9706 19.7 10C19.7 5.02944 15.6706 1 10.7 1C8.23856 1 6.00792 1.98812 4.38309 3.58933"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default WukalaIcon
