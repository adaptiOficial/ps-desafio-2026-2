import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'

export type TestimonyCardGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function TestimonyCard({
  className,
  children,
}: TestimonyCardGenericProps) {
  return (
    <main
      className={cn([
        'flex flex-col w-72 px-9 py-6 space-y-4 m-12 rounded-lg shadow-md ',
        className,
      ])}
    >
      {children}
    </main>
  )
}

export function TestimonyBody({
  className,
  children,
}: TestimonyCardGenericProps) {
  return (
    <p
      className={cn([
        'flex w-full h-full justify-center flex-col font-bold text-justify text-card-foreground leading-tight ',
        className,
      ])}
    >
      {children}
    </p>
  )
}

export function TestimonyFooter({
  className,
  children,
}: TestimonyCardGenericProps) {
  return (
    <footer
      className={cn([
        'flex items-center space-x-4 text-base leading-6 font-normal',
        className,
      ])}
    >
      {children}
    </footer>
  )
}

export function TestimonyAvatar({ src, alt }: ImageProps) {
  return (
    <div className="flex rounded-full overflow-hidden h-12 w-12 relative">
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  )
}

export function TestimonyName({
  className,
  children,
}: TestimonyCardGenericProps) {
  return <h2 className={cn(['flex text-wrap w-32', className])}>{children}</h2>
}

export function TestimonyHeader({
  className,
  children,
}: TestimonyCardGenericProps) {
  return <header className={cn(['', className])}>{children}</header>
}

export function TestimonyIcon() {
  return (
    <div className="flex float-start">
      <svg
        width="32"
        height="32"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.37508 30.6249C8.75008 30.6249 14.5834 29.1666 14.5834 18.9582V7.29158C14.5834 5.46867 13.4809 4.35012 11.6667 4.37492H5.83341C4.0105 4.37492 2.91675 5.46867 2.91675 7.25075V16.0416C2.91675 17.8645 4.0105 18.9582 5.83341 18.9582C7.29175 18.9582 7.29175 18.9582 7.29175 20.4166V21.8749C7.29175 23.3332 5.83341 24.7916 4.37508 24.7916C2.91675 24.7916 2.91675 24.8032 2.91675 26.2951V29.1666C2.91675 30.6249 2.91675 30.6249 4.37508 30.6249Z"
          stroke="#5B709A"
          strokeWidth="2.91667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.8751 30.6249C26.2501 30.6249 32.0834 29.1666 32.0834 18.9582V7.29158C32.0834 5.46867 30.9795 4.35012 29.1667 4.37492H23.3334C21.5105 4.37492 20.4167 5.46867 20.4167 7.25075V16.0416C20.4167 17.8645 21.5105 18.9582 23.3334 18.9582H24.4272C24.4272 22.2395 24.7917 24.7916 20.4167 24.7916V29.1666C20.4167 30.6249 20.4167 30.6249 21.8751 30.6249Z"
          stroke="#5B709A"
          strokeWidth="2.91667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function TestimonyAuthor({
  className,
  children,
}: TestimonyCardGenericProps) {
  return (
    <div className={cn(['flex flex-grow justify-end text-right  ', className])}>
      {children}
    </div>
  )
}
