import React from 'react'
import { ITask } from '../../app/types/task'
import { useTask } from '../../hooks/task'

import TaskCard from './task-card'

type Props = {
  tasks: ITask[]
}

export default function TaskList (data: Props) {
  const { selectedCard } = useTask()

  return (
    <ul className=''>
      {data.tasks.length > 0 && data.tasks.map(task => (
        <li key={task.id} className='inline-block p-3'>
          <TaskCard selected={selectedCard[task.id]} task={task} />
        </li>
      ))}
    </ul>
  )
}

type PropTitle = {
  text: string
  total: number
}
export function TaskTitile (data: PropTitle) {
  return <div className="p-2 font-semibold border-b pb-2">{data.text} (<small>{data.total}</small>)</div>
}
