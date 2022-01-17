import React from 'react'

const DisucssionLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <p className="discuss-label" {...props}>
      {children}
    </p>
  )
}

export default DisucssionLabel
