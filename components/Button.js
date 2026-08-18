import Link from 'next/link'

const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 shadow-lg shadow-blue-900/20',
  secondary: 'bg-white/10 hover:bg-white/20 text-white rounded-xl px-6 py-3 border border-white/20 backdrop-blur-md',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl px-6 py-3',
  ghost: 'text-blue-600 hover:text-blue-800 font-semibold'
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    const isExternal = href.startsWith('http') || props.target === '_blank'
    if (isExternal) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}
