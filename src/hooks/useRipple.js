import { useCallback } from 'react'

export function useRipple(color = 'rgba(255,255,255,0.18)') {
  const createRipple = useCallback(
    (event) => {
      const element = event.currentTarget
      const existing = element.querySelector('.ripple-wave')
      if (existing) existing.remove()

      const circle = document.createElement('span')
      const diameter = Math.max(element.clientWidth, element.clientHeight)
      const radius = diameter / 2
      const rect = element.getBoundingClientRect()

      circle.style.cssText = `
        width: ${diameter}px;
        height: ${diameter}px;
        left: ${event.clientX - rect.left - radius}px;
        top: ${event.clientY - rect.top - radius}px;
        background: ${color};
      `
      circle.className = 'ripple-wave'
      element.appendChild(circle)

      setTimeout(() => circle.remove(), 700)
    },
    [color],
  )

  return createRipple
}
