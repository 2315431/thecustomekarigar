import { ReactNode } from 'react'

interface BorderWrapperProps {
  children: ReactNode
  className?: string
}

export default function BorderWrapper({ children, className = '' }: BorderWrapperProps) {
  return (
    <div className={className}>
      {/* Top Border Pattern */}
      <div 
        className="w-full h-12 bg-repeat-x"
        style={{
          backgroundImage: "url('/assets/border-pattern.png')",
          backgroundSize: "auto 100%",
        }}
      />
      
      {/* Content */}
      <div className="w-full">
        {children}
      </div>
      
      {/* Bottom Border Pattern */}
      <div 
        className="w-full h-12 bg-repeat-x"
        style={{
          backgroundImage: "url('/assets/border-pattern.png')",
          backgroundSize: "auto 100%",
        }}
      />
    </div>
  )
}

