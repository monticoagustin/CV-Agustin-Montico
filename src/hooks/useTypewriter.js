import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, { typeSpeed = 75, deleteSpeed = 35, pauseTime = 2000 } = {}) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const pauseRef = useRef(false)

  useEffect(() => {
    if (pauseRef.current) return

    const word = words[wordIdx % words.length]

    const timer = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1)
          setText(next)
          if (next === word) {
            pauseRef.current = true
            setTimeout(() => {
              pauseRef.current = false
              setDeleting(true)
            }, pauseTime)
          }
        } else {
          const next = word.slice(0, text.length - 1)
          setText(next)
          if (next === '') {
            setDeleting(false)
            setWordIdx((i) => i + 1)
          }
        }
      },
      deleting ? deleteSpeed : typeSpeed,
    )

    return () => clearTimeout(timer)
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pauseTime])

  return text
}
