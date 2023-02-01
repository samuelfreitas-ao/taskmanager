import React, { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const classDefault = 'flex items-center gap-2 justify-center px-4 py-2 font-semibold text-white rounded text-sm focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'
export function ButtonBlue (props: ButtonProps) {
  const className = props.className || ''

  return (
    <button
      {...props}
      className={classDefault + ' focus:ring-blue-600 bg-blue-600 hover:bg-blue-700 ' + className}
    />
  )
}


export function ButtonRed (props: ButtonProps) {
  const className = props.className || ''
  return (
    <button
      className={classDefault + ' focus:ring-red-600 bg-red-600 hover:bg-red-700 ' + className}
      {...props}
    />
  )
}

export function ButtonYellow (props: ButtonProps) {
  const className = props.className || ''
  return (
    <button
      className={classDefault + ' focus:ring-yellow-600 bg-yellow-600 hover:bg-yellow-700 ' + className}
      {...props}
    />
  )
}

export function ButtonGray (props: ButtonProps) {
  const className = props.className || ''
  return (
    <button
      className={classDefault + ' focus:ring-gray-600 bg-gray-600 hover:bg-gray-700 ' + className}
      {...props}
    />
  )
}

export function ButtonGrayLight (props: ButtonProps) {
  const className = props.className || ''
  return (
    <button
      className={classDefault + ' text-gray-700 focus:ring-gray-200 bg-gray-200 hover:bg-gray-300 ' + className}
      {...props}
    />
  )
}

type PropsLink = React.PropsWithChildren<{ to: string, className?: string }>

export function ButtonLink ({ children, to, className }: PropsLink) {
  return (
    <Link to={to}
      className={`${className ? className : ''} inline-block px-4 py-2 font-semibold rounded text-sm bg-opacity-95 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50`}
    >
      <div className="flex items-center gap-2 justify-center">
        {children}
      </div>
    </Link>
  )
}

type PropsAnchor = React.PropsWithChildren<{ href: string, target?: string, className?: string }>
export function ButtonAnchor ({ children, href, target, className }: PropsAnchor) {
  return (
    <a href={href} target={target}
      className={`${className ? className : ''} inline-block px-4 py-2 font-semibold rounded text-sm bg-opacity-95 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50`}
    >
      <div className="flex items-center gap-2 justify-center">
        {children}
      </div>
    </a>
  )
}
