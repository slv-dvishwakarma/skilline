import React from 'react'

interface DescriptionProps {
    label?: string;
}

export const Description: React.FC<DescriptionProps> = ({ label }) => {
  return (
    <p className='whitespace-pre-wrap my-4 font-display text-xl text-common leading-relaxed'>{label}</p>
  )
}
