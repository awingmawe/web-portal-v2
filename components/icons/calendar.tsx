import { IconProps } from '@/constant/types/IconProps'
import React from 'react'

export const Calendar: React.FC<IconProps> = ({
  size,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 60}
      height={size || 60}
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M30 47.5C30.4945 47.5 30.9778 47.3534 31.3889 47.0787C31.8 46.804 32.1205 46.4135 32.3097 45.9567C32.4989 45.4999 32.5484 44.9972 32.452 44.5123C32.3555 44.0273 32.1174 43.5819 31.7678 43.2322C31.4181 42.8826 30.9727 42.6445 30.4877 42.548C30.0028 42.4516 29.5001 42.5011 29.0433 42.6903C28.5865 42.8795 28.196 43.2 27.9213 43.6111C27.6466 44.0222 27.5 44.5055 27.5 45C27.5 45.663 27.7634 46.2989 28.2322 46.7678C28.7011 47.2366 29.337 47.5 30 47.5ZM42.5 47.5C42.9945 47.5 43.4778 47.3534 43.8889 47.0787C44.3 46.804 44.6205 46.4135 44.8097 45.9567C44.9989 45.4999 45.0484 44.9972 44.952 44.5123C44.8555 44.0273 44.6174 43.5819 44.2678 43.2322C43.9181 42.8826 43.4727 42.6445 42.9877 42.548C42.5028 42.4516 42.0001 42.5011 41.5433 42.6903C41.0865 42.8795 40.696 43.2 40.4213 43.6111C40.1466 44.0222 40 44.5055 40 45C40 45.663 40.2634 46.2989 40.7322 46.7678C41.2011 47.2366 41.837 47.5 42.5 47.5ZM42.5 37.5C42.9945 37.5 43.4778 37.3534 43.8889 37.0787C44.3 36.804 44.6205 36.4135 44.8097 35.9567C44.9989 35.4999 45.0484 34.9972 44.952 34.5123C44.8555 34.0273 44.6174 33.5819 44.2678 33.2322C43.9181 32.8826 43.4727 32.6445 42.9877 32.548C42.5028 32.4516 42.0001 32.5011 41.5433 32.6903C41.0865 32.8795 40.696 33.2 40.4213 33.6111C40.1466 34.0222 40 34.5055 40 35C40 35.663 40.2634 36.2989 40.7322 36.7678C41.2011 37.2366 41.837 37.5 42.5 37.5ZM30 37.5C30.4945 37.5 30.9778 37.3534 31.3889 37.0787C31.8 36.804 32.1205 36.4135 32.3097 35.9567C32.4989 35.4999 32.5484 34.9972 32.452 34.5123C32.3555 34.0273 32.1174 33.5819 31.7678 33.2322C31.4181 32.8826 30.9727 32.6445 30.4877 32.548C30.0028 32.4516 29.5001 32.5011 29.0433 32.6903C28.5865 32.8795 28.196 33.2 27.9213 33.6111C27.6466 34.0222 27.5 34.5055 27.5 35C27.5 35.663 27.7634 36.2989 28.2322 36.7678C28.7011 37.2366 29.337 37.5 30 37.5ZM47.5 7.5H45V5C45 4.33696 44.7366 3.70107 44.2678 3.23223C43.7989 2.76339 43.163 2.5 42.5 2.5C41.837 2.5 41.2011 2.76339 40.7322 3.23223C40.2634 3.70107 40 4.33696 40 5V7.5H20V5C20 4.33696 19.7366 3.70107 19.2678 3.23223C18.7989 2.76339 18.163 2.5 17.5 2.5C16.837 2.5 16.2011 2.76339 15.7322 3.23223C15.2634 3.70107 15 4.33696 15 5V7.5H12.5C10.5109 7.5 8.60322 8.29018 7.1967 9.6967C5.79018 11.1032 5 13.0109 5 15V50C5 51.9891 5.79018 53.8968 7.1967 55.3033C8.60322 56.7098 10.5109 57.5 12.5 57.5H47.5C49.4891 57.5 51.3968 56.7098 52.8033 55.3033C54.2098 53.8968 55 51.9891 55 50V15C55 13.0109 54.2098 11.1032 52.8033 9.6967C51.3968 8.29018 49.4891 7.5 47.5 7.5ZM50 50C50 50.663 49.7366 51.2989 49.2678 51.7678C48.7989 52.2366 48.163 52.5 47.5 52.5H12.5C11.837 52.5 11.2011 52.2366 10.7322 51.7678C10.2634 51.2989 10 50.663 10 50V27.5H50V50ZM50 22.5H10V15C10 14.337 10.2634 13.7011 10.7322 13.2322C11.2011 12.7634 11.837 12.5 12.5 12.5H15V15C15 15.663 15.2634 16.2989 15.7322 16.7678C16.2011 17.2366 16.837 17.5 17.5 17.5C18.163 17.5 18.7989 17.2366 19.2678 16.7678C19.7366 16.2989 20 15.663 20 15V12.5H40V15C40 15.663 40.2634 16.2989 40.7322 16.7678C41.2011 17.2366 41.837 17.5 42.5 17.5C43.163 17.5 43.7989 17.2366 44.2678 16.7678C44.7366 16.2989 45 15.663 45 15V12.5H47.5C48.163 12.5 48.7989 12.7634 49.2678 13.2322C49.7366 13.7011 50 14.337 50 15V22.5ZM17.5 37.5C17.9945 37.5 18.4778 37.3534 18.8889 37.0787C19.3 36.804 19.6205 36.4135 19.8097 35.9567C19.9989 35.4999 20.0484 34.9972 19.952 34.5123C19.8555 34.0273 19.6174 33.5819 19.2678 33.2322C18.9181 32.8826 18.4727 32.6445 17.9877 32.548C17.5028 32.4516 17.0001 32.5011 16.5433 32.6903C16.0865 32.8795 15.696 33.2 15.4213 33.6111C15.1466 34.0222 15 34.5055 15 35C15 35.663 15.2634 36.2989 15.7322 36.7678C16.2011 37.2366 16.837 37.5 17.5 37.5ZM17.5 47.5C17.9945 47.5 18.4778 47.3534 18.8889 47.0787C19.3 46.804 19.6205 46.4135 19.8097 45.9567C19.9989 45.4999 20.0484 44.9972 19.952 44.5123C19.8555 44.0273 19.6174 43.5819 19.2678 43.2322C18.9181 42.8826 18.4727 42.6445 17.9877 42.548C17.5028 42.4516 17.0001 42.5011 16.5433 42.6903C16.0865 42.8795 15.696 43.2 15.4213 43.6111C15.1466 44.0222 15 44.5055 15 45C15 45.663 15.2634 46.2989 15.7322 46.7678C16.2011 47.2366 16.837 47.5 17.5 47.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
export const Calendar2: React.FC<IconProps> = ({
  size,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 60}
      height={size || 60}
      viewBox="0 0 20 21"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M6.66602 2.16666V4.66666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.334 2.16666V4.66666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.91602 8.075H17.0827"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 7.58333V14.6667C17.5 17.1667 16.25 18.8333 13.3333 18.8333H6.66667C3.75 18.8333 2.5 17.1667 2.5 14.6667V7.58333C2.5 5.08333 3.75 3.41666 6.66667 3.41666H13.3333C16.25 3.41666 17.5 5.08333 17.5 7.58333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99607 11.9167H10.0036"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91209 11.9167H6.91957"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91209 14.4167H6.91957"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Calendar3: React.FC<IconProps> = ({
  size,
  className = '',
  color = '#131313',
  ...props
}) => {
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
        d="M5.33337 1.33331V3.33331"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6666 1.33331V3.33331"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.33337 6.06H13.6667"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5.66665V11.3333C14 13.3333 13 14.6666 10.6667 14.6666H5.33333C3 14.6666 2 13.3333 2 11.3333V5.66665C2 3.66665 3 2.33331 5.33333 2.33331H10.6667C13 2.33331 14 3.66665 14 5.66665Z"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4631 9.13332H10.4691"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4631 11.1333H10.4691"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99703 9.13332H8.00302"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99703 11.1333H8.00302"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5295 9.13332H5.53549"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5295 11.1333H5.53549"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const CalendarIconFilterMobile: React.FC<{ size?: any }> = ({
  size = 20,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.6665 1.66663V4.16663"
        stroke="#424242"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3335 1.66663V4.16663"
        stroke="#424242"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.9165 7.57495H17.0832"
        stroke="#424242"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 7.08329V14.1666C17.5 16.6666 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6666 2.5 14.1666V7.08329C2.5 4.58329 3.75 2.91663 6.66667 2.91663H13.3333C16.25 2.91663 17.5 4.58329 17.5 7.08329Z"
        stroke="#424242"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0791 11.4167H13.0866"
        stroke="#ffc14b"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0791 13.9167H13.0866"
        stroke="#ffc14b"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99607 11.4167H10.0036"
        stroke="#ffc14b"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99607 13.9167H10.0036"
        stroke="#ffc14b"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91209 11.4167H6.91957"
        stroke="#ffc14b"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91209 13.9167H6.91957"
        stroke="#ffc14b"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
