import { IconProps } from '@/constant/types/IconProps'

const ShareIcon: React.FC<IconProps> = ({
  size,
  className,
  onClick,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    onClick={onClick}
    className={className}
    {...props}
  >
    <rect x="0.5" y="0.5" width="27" height="27" rx="6.75" fill="#ffc14b" />
    <path
      d="M19.0625 10.625C20.4605 10.625 21.5938 9.49172 21.5938 8.09375C21.5938 6.69578 20.4605 5.5625 19.0625 5.5625C17.6645 5.5625 16.5312 6.69578 16.5312 8.09375C16.5312 9.49172 17.6645 10.625 19.0625 10.625Z"
      stroke="white"
      strokeWidth="1.47656"
    />
    <path
      d="M19.0625 22.4375C20.4605 22.4375 21.5938 21.3042 21.5938 19.9062C21.5938 18.5083 20.4605 17.375 19.0625 17.375C17.6645 17.375 16.5312 18.5083 16.5312 19.9062C16.5312 21.3042 17.6645 22.4375 19.0625 22.4375Z"
      stroke="white"
      strokeWidth="1.47656"
    />
    <path
      d="M8.9375 16.5312C10.3355 16.5312 11.4688 15.398 11.4688 14C11.4688 12.602 10.3355 11.4688 8.9375 11.4688C7.53953 11.4688 6.40625 12.602 6.40625 14C6.40625 15.398 7.53953 16.5312 8.9375 16.5312Z"
      stroke="white"
      strokeWidth="1.47656"
    />
    <path
      d="M16.6367 9.57031L11.3633 12.5234M11.2578 15.2656L16.5312 18.6406"
      stroke="white"
      strokeWidth="1.47656"
      strokeLinecap="round"
    />
  </svg>
)

export default ShareIcon
