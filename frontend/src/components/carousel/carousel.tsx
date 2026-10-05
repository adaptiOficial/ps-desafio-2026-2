'use client'
import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { IconType } from 'react-icons/lib'
import { Grid, Pagination } from 'swiper/modules'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'
import 'swiper/css/grid'
import './carouselStyles.css'

interface BreakpointItems {
  lg: number
  md: number
  sm: number
  xs: number
}

interface CarouselBaseProps {
  children?: React.ReactNode
  className?: string
}

const carouselVariants = cva('flex items-center max-sm:gap-0 w-full relative', {
  variants: {
    variant: {
      default: '',
      rounded: 'rounded-3xl overflow-hidden',
    },
    size: {
      default: '',
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      full: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const carouselArrowVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: 'text-primary hover:text-primary/80',
      accent: 'text-accent hover:text-accent/80',
      secondary: 'text-secondary hover:text-secondary/80',
      muted: 'text-muted-foreground hover:text-foreground',
      circle: 'rounded-full text-white p-2 bg-black/60',
      defaultFilled:
        'text-xs bg-white rounded-full text-primary hover:text-primary/80 p-2',
      bordered: 'text-primary hover:text-primary/80 rounded-lg bg-white p-2',
    },
    position: {
      outside: '',
      inside: 'absolute z-30',
    },
  },
  defaultVariants: {
    variant: 'default',
    position: 'outside',
  },
})

// components das setas no geral do carousel
interface CarouselArrowProps
  extends VariantProps<typeof carouselArrowVariants> {
  icon: IconType
  size?: number
  className?: string
  onClick: () => void
}

const CarouselArrow = ({
  icon: Icon,
  size = 24,
  className,
  variant,
  position,
  onClick,
}: CarouselArrowProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(carouselArrowVariants({ variant, position }), className)}
      aria-label={
        position === 'inside'
          ? Icon === MdArrowBack || Icon === IoIosArrowBack
            ? 'Previous slide'
            : 'Next slide'
          : undefined
      }
    >
      <Icon size={size} />
    </button>
  )
}

// tipagem do carousel
export interface CarouselProps
  extends CarouselBaseProps,
  VariantProps<typeof carouselVariants> {
  items: JSX.Element[]

  // Quantidade itens no Carrossel
  breakpointItems?: BreakpointItems
  // Quantidade de colunas
  rows?: number
  // Espaço entre os itens
  cardsGap?: number
  fullScreen?: boolean
  // centraliza o principal slide, usado para poder colocar 1.5 itens no carrossel
  centered?: boolean

  // Habilitar paginação com bullets
  withPagination?: boolean
  paginationPosition?: 'inside' | 'outside'
  // Habilitar seta de navegação
  showArrows?: boolean
  // Definir posição das setas
  arrowsPosition?: 'inside' | 'outside'
  // Definir se o carrossel fica dando loop nos itens
  loop?: boolean

  // Definir tipo da seta
  arrowVariant?: VariantProps<typeof carouselArrowVariants>['variant']
  // Definir tamanho da seta
  arrowSize?: number
  PrevArrow?: IconType
  NextArrow?: IconType

  // Habilitar scroll automático
  autoScroll?: boolean
  // Definir tempo do scroll
  scrollTimer?: number
  fullScroll?: boolean
  // Defini os itens que vão scrollar
  scrollItems?: number
}

// COMPONENTE
export function Carousel({
  items,
  className,
  variant,
  size,
  breakpointItems = { lg: 4, md: 3, sm: 3, xs: 2 },
  rows = 1,
  fullScreen,
  centered = false,
  cardsGap = 16,
  withPagination = true,
  paginationPosition = 'outside',
  showArrows = false,
  arrowsPosition = 'inside',
  loop = true,
  arrowVariant = 'default',
  arrowSize = 24,
  PrevArrow,
  NextArrow,
  autoScroll = false,
  scrollTimer = 5000,
  fullScroll = false,
  scrollItems = 1,
}: CarouselProps) {
  const [itemsPerSlide, setItemsPerSlide] = useState(breakpointItems.lg)
  const [showPagination, setShowPagination] = useState(true)
  const swiperRef = useRef<SwiperRef | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // para incluir o prop do tipo de botão de seta
  const DefaultPrevArrow = ['circle', 'defaultCircle', 'bordered'].includes(
    arrowVariant as string,
  )
    ? MdArrowBack
    : IoIosArrowBack
  const DefaultNextArrow = ['circle', 'defaultCircle', 'bordered'].includes(
    arrowVariant as string,
  )
    ? MdArrowForward
    : IoIosArrowForward
  const ActualPrevArrow = PrevArrow || DefaultPrevArrow
  const ActualNextArrow = NextArrow || DefaultNextArrow

  // Sempre centralizar slides na versão rounded
  const centerSlides = variant === 'rounded' ? true : centered

  // Configurações especiais para a versão rounded
  const isRounded = variant === 'rounded'

  // Calcular a visualização para o efeito rounded
  // Se for rounded, mostrar mais slides para criar o efeito visual desejado
  const effectiveItemsPerSlide = isRounded
    ? Math.max(1.5, itemsPerSlide - 0.5)
    : itemsPerSlide

  // trabalha com a responsividade dos items per slide
  useLayoutEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.offsetWidth ?? 1024

      if (width >= 1024) {
        setItemsPerSlide(breakpointItems.lg)
        setShowPagination(true)
      } else if (width >= 768) {
        setItemsPerSlide(breakpointItems.md)
      } else if (width >= 640) {
        setItemsPerSlide(breakpointItems.sm)
      } else {
        setItemsPerSlide(breakpointItems.xs)
        setShowPagination(width > 400)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpointItems])

  const nextSlide = useCallback(() => {
    swiperRef.current?.swiper.slideNext()
  }, [])

  const prevSlide = useCallback(() => {
    swiperRef.current?.swiper.slidePrev()
  }, [])

  //  effect para o scroll
  useEffect(() => {
    if (!autoScroll) return

    const timer = setInterval(() => {
      if (fullScroll) {
        nextSlide()
      } else {
        for (let i = 0; i < scrollItems; i++) nextSlide()
      }
    }, scrollTimer)

    return () => clearInterval(timer)
  }, [autoScroll, scrollItems, fullScroll, scrollTimer, nextSlide])

  // Ajustar a quantidade de itens para garantir que sempre preencham o carrossel
  const processedItems = [...items]
  if (items.length < itemsPerSlide) {
    const itemsToAdd = itemsPerSlide - (items.length % itemsPerSlide)
    for (let i = 0; i < itemsToAdd; i++) {
      processedItems.push(items[i % items.length])
    }
  }

  return (
    <div
      className={cn(carouselVariants({ variant, size }), className)}
      ref={containerRef}
    >
      {itemsPerSlide < items.length && showArrows && (
        <>
          {arrowsPosition === 'inside' && (
            <CarouselArrow
              position={arrowsPosition}
              variant={arrowVariant}
              icon={ActualPrevArrow}
              size={arrowSize}
              onClick={prevSlide}
              className={cn(
                arrowsPosition === 'inside'
                  ? 'left-4 top-1/2 -translate-y-1/2'
                  : '',
                withPagination &&
                  showPagination &&
                  variant === 'default' &&
                  paginationPosition === 'outside'
                  ? 'top-[calc(50%-24px)]'
                  : '',
                'max-lg:hidden',
              )}
            />
          )}
          {arrowsPosition === 'inside' && (
            <CarouselArrow
              position={arrowsPosition}
              variant={arrowVariant}
              icon={ActualNextArrow}
              size={arrowSize}
              onClick={nextSlide}
              className={cn(
                arrowsPosition === 'inside'
                  ? 'right-4 top-1/2 -translate-y-1/2'
                  : '',
                withPagination &&
                  showPagination &&
                  variant === 'default' &&
                  paginationPosition === 'outside'
                  ? 'top-[calc(50%-24px)]'
                  : '',
                'max-lg:hidden',
              )}
            />
          )}
        </>
      )}

      {itemsPerSlide < items.length &&
        showArrows &&
        arrowsPosition === 'outside' && (
          <CarouselArrow
            position="outside"
            variant={arrowVariant}
            icon={ActualPrevArrow}
            size={arrowSize}
            onClick={prevSlide}
            className={cn(
              'flex items-center justify-center max-h-[40px] mx-4',
              withPagination &&
                showPagination &&
                variant === 'default' &&
                paginationPosition === 'outside'
                ? 'mb-12'
                : '',
              'max-lg:hidden',
            )}
          />
        )}
      <Swiper
        ref={swiperRef}
        grabCursor
        grid={rows > 1 ? { rows, fill: 'row' } : undefined}
        modules={[Pagination, Grid]}
        slidesPerView={effectiveItemsPerSlide}
        slidesPerGroup={scrollItems}
        loop={loop}
        spaceBetween={cardsGap}
        pagination={{
          type: 'bullets',
          enabled: withPagination && showPagination && variant === 'default',
          clickable: true,
        }}
        centeredSlides={centerSlides}
        className={cn('w-full', isRounded && 'rounded-carousel')}
        effect={isRounded ? 'coverflow' : undefined}
        coverflowEffect={
          isRounded
            ? {
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }
            : undefined
        }
      >
        {processedItems.map((item, index) => (
          <SwiperSlide
            key={index}
            className={cn(
              'flex items-center justify-center',
              withPagination &&
                showPagination &&
                variant === 'default' &&
                paginationPosition === 'outside'
                ? 'pb-12'
                : '',
              fullScreen ? 'w-full h-screen' : '',
              isRounded
                ? '!rounded-lg transform transition-transform duration-300'
                : '',
            )}
          >
            {({ isActive }) => (
              <div
                className={cn(
                  carouselVariants({ variant, size }),
                  className,
                  'flex justify-center overflow-hidden items-center h-full w-full transition-all duration-300',
                  isRounded ? 'rounded-3xl overflow-hidden' : '',
                  isRounded && isActive ? 'scale-100 z-10' : '',
                  isRounded && !isActive ? 'scale-75 opacity-80' : '',
                )}
              >
                {item}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {itemsPerSlide < items.length &&
        showArrows &&
        arrowsPosition === 'outside' && (
          <CarouselArrow
            position="outside"
            variant={arrowVariant}
            icon={ActualNextArrow}
            size={arrowSize}
            onClick={nextSlide}
            className={cn(
              'flex items-center justify-center max-h-[40px] mx-4',
              withPagination &&
                showPagination &&
                variant === 'default' &&
                paginationPosition === 'outside'
                ? 'mb-12'
                : '',
              'max-lg:hidden',
            )}
          />
        )}
      {withPagination && showPagination && variant === 'default' && (
        <div className={cn('swiper-pagination ', {
          '!bottom-6': paginationPosition === 'inside'
        })}></div>
      )}
    </div>
  )
}
