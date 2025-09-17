import React from 'react'



const Spinner: React.FC<LoaderNS.LoaderProps> = ({
  size = 50,
  color = '#7C3AED', // default purple
  className = '',
}) => {
  const dots = Array.from({ length: 8 })

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {dots.map((_, idx) => (
        <div
          key={idx}
          className="absolute"
          style={{
            width: size * 0.15,
            height: size * 0.15,
            backgroundColor: color,
            borderRadius: '50%',
            transform: `rotate(${idx * 45}deg) translate(${size / 2}px)`,
            animation: 'fade 1.2s linear infinite',
            animationDelay: `${idx * 0.15}s`,
          }}
        ></div>
      ))}

      {/* Tailwind doesn't have keyframes for fade, so adding inline */}
      <style>
        {`
          @keyframes fade {
            0%, 39%, 100% { opacity: 0.3; }
            40% { opacity: 1; }
          }
        `}
      </style>
    </div>
  )
}

export default Spinner
