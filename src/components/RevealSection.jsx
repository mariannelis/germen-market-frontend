import useScrollReveal from '@/hooks/useScrollReveal'

function RevealSection({ children, className = '' }) {
  const { elementRef, isVisible } = useScrollReveal()

  return (
    <div
      ref={elementRef}
      className={`reveal-section ${
        isVisible ? 'reveal-visible' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default RevealSection