export const HomeIcon = ({ size = 22, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M8.02 1.83992L2.63 6.03992C1.73 6.73992 1 8.22992 1 9.35992V16.7699C1 19.0899 2.89 20.9899 5.21 20.9899H16.79C19.11 20.9899 21 19.0899 21 16.7799V9.49992C21 8.28992 20.19 6.73992 19.2 6.04992L13.02 1.71992C11.62 0.739918 9.37 0.789918 8.02 1.83992Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const HomeIconFilled = ({ size = 22, className = '', ...props }) => {
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
        d="M13.36 4.54679L9.51999 1.86012C8.47333 1.12679 6.86666 1.16679 5.85999 1.94679L2.51999 4.55345C1.85333 5.07345 1.32666 6.14012 1.32666 6.98012V11.5801C1.32666 13.2801 2.70666 14.6668 4.40666 14.6668H11.5933C13.2933 14.6668 14.6733 13.2868 14.6733 11.5868V7.06679C14.6733 6.16679 14.0933 5.06012 13.36 4.54679ZM8.49999 12.0001C8.49999 12.2735 8.27333 12.5001 7.99999 12.5001C7.72666 12.5001 7.49999 12.2735 7.49999 12.0001V10.0001C7.49999 9.72679 7.72666 9.50012 7.99999 9.50012C8.27333 9.50012 8.49999 9.72679 8.49999 10.0001V12.0001Z"
        fill="white"
      />
    </svg>
  )
}
