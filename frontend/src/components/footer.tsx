import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export type FooterGenericProps<T = unknown> = {
  children?: React.ReactNode
  className?: string
} & T

export function Footer({ className, children }: FooterGenericProps) {
  return (
    <footer
      className={cn([
        'bg-primary text-primary-foreground w-full h-auto lg:px-14',
        className,
      ])}
    >
      {children}
    </footer>
  )
}

export function FooterBody({ className, children }: FooterGenericProps) {
  return (
    <main
      className={cn([
        'flex flex-row lg:gap-8 xl:pl-6 xl:pr-14 max-lg:flex-col max-xl:justify-around justify-between items-center max-lg:pb-10 lg:pt-14 lg:pb-8',
        className,
      ])}
    >
      {children}
    </main>
  )
}

type FooterLogoProps = {
  src: string
  alt: string
  width: number
  height?: number
}

export function FooterLogo({
  className,
  src,
  alt,
  width,
  height,
}: FooterGenericProps<FooterLogoProps>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(['max-lg:py-12', className])}
    />
  )
}

export function FooterInformations({
  className,
  children,
}: FooterGenericProps) {
  return (
    <div
      className={cn([
        'flex flex-row justify-end max-xl:gap-10 w-[60%] 2xl:w-[45%] gap-20 max-lg:flex-col max-lg:gap-9 max-lg:items-center lg:text-justify',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function FooterInformationSection({
  className,
  children,
}: FooterGenericProps) {
  return (
    <div
      className={cn([
        'max-lg:w-80 flex flex-col lg:max-w-[40%] max-lg:items-center items-justify gap-2',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function FooterInformationTitle({
  className,
  children,
}: FooterGenericProps) {
  return (
    <h1 className={cn(['text-2xl font-bold max-lg:text-center ', className])}>
      {children}
    </h1>
  )
}

export function FooterInformationDescription({
  className,
  children,
}: FooterGenericProps) {
  return (
    <p className={cn(['flex max-lg:text-center', className])}>{children}</p>
  )
}

export function FooterBaseboard({ className, children }: FooterGenericProps) {
  return (
    <main
      className={cn([
        'flex max-lg:flex-col items-center justify-between lg:border-t-2 lg:py-8 lg:px-6',
        className,
      ])}
    >
      {children}
    </main>
  )
}

export function FooterClaim() {
  return (
    <p className="max-lg:py-6 max-lg:w-[80vw] max-lg:pr-[20%] max-lg:border-t-2 items-start lg:order-1 text-sm">
      Desenvolvido por
      <a className="font-semibold ml-1" href="#">
        Adapti Soluções Web
      </a>
    </p>
  )
}

export function FooterSocialMedia({ className, children }: FooterGenericProps) {
  return (
    <div
      className={cn([
        'text-3xl lg:text-xl flex items-center space-x-8 max-lg:pb-8 lg:order-2',
        className,
      ])}
    >
      {children}
    </div>
  )
}

type FooterSocialMediaLinkProps = {
  href: string
}

export function FooterSocialMediaLink({
  className,
  children,
  href,
}: FooterGenericProps<FooterSocialMediaLinkProps>) {
  return (
    <Link href={href} target="_blank" className={cn(['', className])}>
      {children}
    </Link>
  )
}
