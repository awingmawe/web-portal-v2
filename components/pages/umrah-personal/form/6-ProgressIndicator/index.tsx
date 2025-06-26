'use client'

import { motion } from 'framer-motion'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="sticky top-[72px] z-51 max-lg:top-[49px]">
      {/* Progress line */}
      <motion.div
        className="bg-primary-500 absolute left-0 h-1.5"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default ProgressIndicator
