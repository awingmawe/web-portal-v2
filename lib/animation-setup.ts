import { Transition } from 'framer-motion'

export const springTransition: Transition = {
  type: 'spring',
  delay: 0.2,
  mass: 1,
  stiffness: 80,
  damping: 20,
}
export const springTransitionMobile: Transition = {
  type: 'spring',
  delay: 0.2,
  mass: 1,
  stiffness: 17,
  damping: 9,
}

export const dissolve = 'transition-all duration-300 ease-out'
