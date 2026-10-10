import { useEffect, useRef, useState } from 'react'

function useScrollReveal() {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentElement = elementRef.current

    if (!currentElement) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.15,
      }
    )

    observer.observe(currentElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  return {
    elementRef,
    isVisible,
  }
}

export default useScrollReveal