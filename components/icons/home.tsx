export const HomeIcon = ({ size = 22, className = '', ...props }) => {
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
        d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.99V14.99"
        stroke="white"
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
