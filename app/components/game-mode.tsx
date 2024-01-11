import Link from 'next/link'

export function GameMode ({
  href,
  title,
  description,
  icon,
  className
}: {
  href: string
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}) {
  return (
    <article className={className}>
      <Link
        href={href}
        className='flex items-center gap-2 bg-secondary hover:bg-secondary/65 transition-colors rounded p-4'
      >
        <div className='flex justify-center items-center'>
          {icon}
        </div>
        <div className='flex flex-col justify-center max-w-[25ch]'>
          <h3 className='text-xl font-semibold'>{title}</h3>
          <p className='text-sm'>
            {description}
          </p>
        </div>
      </Link>
    </article>
  )
}
