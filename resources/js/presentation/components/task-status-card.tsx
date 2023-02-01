import React from 'react'

export enum TaskStatusType {
  PENDING = 'Pendente',
  ACTIVE = 'Activo',
  DONE = 'Feito',
}

type Props = {
  status: string
  label?: string
}

export default function TaskStatusCard (data: Props) {
  let classList, classText
  switch (data.status) {
    case TaskStatusType.ACTIVE:
      classList = 'bg-blue-400 border-blue-500'
      classText = 'text-blue-400'
      break
    case TaskStatusType.DONE:
      classList = 'bg-green-400 border-green-500'
      classText = 'text-green-400'
      break
    case TaskStatusType.PENDING:
      classList = 'bg-yellow-400 border-yellow-500'
      classText = 'text-yellow-400'
      break

    default:
      break
  }
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className={`inline-block items-center justify-center w-4 h-4 rounded-full ${classList}`} />
      <span>Estado:</span>
      <span className={`font-semibold ${classText}`}>{data.status}</span>
    </div>

  )
}
