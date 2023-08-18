import React, { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const classDefault =
  'flex items-center gap-2 justify-center px-4 py-2 font-semibold rounded text-sm focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'
export function ButtonBlue(props: ButtonProps) {
  const className = props.className || ''

  return (
    <button
      {...props}
      className={
        classDefault +
        ' focus:ring-blue-600 bg-blue-600 hover:bg-blue-700  text-white ' +
        className
      }
    />
  )
}

export function ButtonRed(props: ButtonProps) {
  const className = props.className || ''
  return (
    <button
      className={
        classDefault +
        ' focus:ring-red-600 bg-red-600 hover:bg-red-700  text-white ' +
        className
      }
      {...props}
    />
  )
}

export function ButtonYellow(props: ButtonProps) {
  const className = props.className || ''
  return (
    <button
      className={
        classDefault +
        ' focus:ring-yellow-600 bg-yellow-600 hover:bg-yellow-700  text-white ' +
        className
      }
      {...props}
    />
  )
}

export function ButtonGray(props: ButtonProps) {
  const className = props.className || ''
  return (
    <button
      className={
        classDefault +
        ' focus:ring-gray-600 bg-gray-600 hover:bg-gray-700  text-white ' +
        className
      }
      {...props}
    />
  )
}

export function ButtonGrayLight(props: ButtonProps) {
  const className = props.className || ''
  return (
    <button
      className={
        classDefault +
        ' text-gray-700 focus:ring-gray-200 bg-gray-200 hover:bg-gray-300 ' +
        className
      }
      {...props}
    />
  )
}
