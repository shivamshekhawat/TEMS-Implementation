// components/ui/Button.js
import React from 'react'

export function Button({ onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
