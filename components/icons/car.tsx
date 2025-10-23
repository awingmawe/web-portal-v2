import { IconProps } from '@/constant/types/IconProps'

export const CarIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color,
  ...props
}) => {
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
        d="M15.51 2.83008H8.49C6 2.83008 5.45 4.07008 5.13 5.59008L4 11.0001H20L18.87 5.59008C18.55 4.07008 18 2.83008 15.51 2.83008Z"
        stroke={color ? color : '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9888 19.82C22.0988 20.99 21.1588 22 19.9588 22H18.0788C16.9988 22 16.8488 21.54 16.6588 20.97L16.4588 20.37C16.1788 19.55 15.9988 19 14.5588 19H9.43876C7.99876 19 7.78876 19.62 7.53876 20.37L7.33876 20.97C7.14876 21.54 6.99876 22 5.91876 22H4.03876C2.83876 22 1.89876 20.99 2.00876 19.82L2.56876 13.73C2.70876 12.23 2.99876 11 5.61876 11H18.3788C20.9988 11 21.2888 12.23 21.4288 13.73L21.9888 19.82Z"
        stroke={color ? color : '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8H3"
        stroke={color ? color : '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8H20"
        stroke={color ? color : '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3V5"
        stroke={color ? color : '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5H13.5"
        stroke={color ? color : '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 15H9"
        stroke={color ? color : '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 15H18"
        stroke={color ? color : '#131313'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
