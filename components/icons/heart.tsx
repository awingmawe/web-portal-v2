export const HeartIcon = ({ size = 24, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.38 3.1001 10.99 3.9801 12 5.3401C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901C22 15.6901 15.52 19.8201 12.62 20.8101Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export const HeartIconFilled = ({ size = 16, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M10.9587 2.06665C9.75203 2.06665 8.67203 2.65332 7.9987 3.55332C7.32536 2.65332 6.24536 2.06665 5.0387 2.06665C2.99203 2.06665 1.33203 3.73332 1.33203 5.79332C1.33203 6.58665 1.4587 7.31998 1.6787 7.99998C2.73203 11.3333 5.9787 13.3266 7.58536 13.8733C7.81203 13.9533 8.18536 13.9533 8.41203 13.8733C10.0187 13.3266 13.2654 11.3333 14.3187 7.99998C14.5387 7.31998 14.6654 6.58665 14.6654 5.79332C14.6654 3.73332 13.0054 2.06665 10.9587 2.06665Z"
        fill="white"
      />
    </svg>
  )
}
