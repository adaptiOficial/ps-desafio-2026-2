'use client'

import { cn } from '@/lib/utils'
import { ReactNode, useState, useEffect, useRef, ComponentProps } from 'react'

interface ImgFallbackProps extends ComponentProps<'img'> {
  loadingFallback: ReactNode
  errorFallback: ReactNode
}

export function ImgSuspense({
  loadingFallback,
  errorFallback,
  className,
  alt,
  ...props
}: ImgFallbackProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img) {
      const handleLoad = () => {
        setLoading(false)
        setError(false)
      }

      const handleError = () => {
        setError(true)
        setLoading(false)
      }

      img.addEventListener('load', handleLoad)
      img.addEventListener('error', handleError)

      // Verifica se a imagem já está carregada
      if (img.complete && img.naturalWidth !== 0) {
        handleLoad()
      }

      return () => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
      }
    }
  }, [])

  return (
    <>
      <img
        ref={imgRef}
        className={cn({ hidden: loading || error }, className)}
        alt={alt}
        {...props}
      />
      {loading && loadingFallback}
      {error && errorFallback}
    </>
  )
}
