import React, { ChangeEvent, useEffect, useState } from 'react'
import { Modal } from './modal'
import { ButtonGrayLight } from './button'
import { BsX } from 'react-icons/bs'
import { SpinnerHorizontalCircle } from './spinner'
import FileCard from './file-card'
import TaskStatusCard from './task-status-card'
import { useTask } from '../../hooks/task'
import { ITask } from '../../app/types/task'
import { HttpClient } from '../../libs/http/http-client'

type Props = {
  show: boolean
  id: number
}
export default function TaskCardDetail (prop: Props) {
  const { handClose, handleSubmit, formData, setFormData } = useTask()
  const [task, setTask] = useState({} as ITask)
  const [loading, setLoading] = useState(true)

  const id = prop.id
  useEffect(() => {
    HttpClient.get({
      uri: `/tasks/${id}`, callback: (response) => {
        setLoading(false)
        setTask(response.data)
      }
    })
  }, [])

  const handleChange = (event: ChangeEvent<any>) => {
    const target = event.target
    const { name, value } = target

    if (name == 'file') {
      target.files
      setFormData({ ...formData, [name]: target.files })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  return (
    <Modal show={prop.show}>
      <div className="bg-white px-6 py-8" style={{ width: '100%' }}>
        {loading ?
          <div className="flex gap-2 text-center">
            <SpinnerHorizontalCircle /> Carregando tarefa <b>#{id}</b>
          </div>
          :
          <form action="" onSubmit={handleSubmit} className='grid gap-y-2'>
            <div className="mb-2 pb-2 border-b font-semibold">Tarefa #{task.id} {task.title}</div>
            <div className="grid lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2" style={{ maxHeight: '800px' }}>
                <div className="flex items-center gap-2">
                  <TaskStatusCard status={task && task.status} />
                </div>
                <div className="flex flex-col mt-3">
                  <div className="">Descrição</div>
                  <textarea className='flex-1 focus:outline-none px-3 py-1 border rounded'
                    name='description'
                    onChange={handleChange}
                    defaultValue={task && task.description}
                    rows={10}
                    placeholder='Descrição' />
                </div>
                {/* <div className="flex">
                                    <input className='flex-1 focus:outline-none px-3 py-1 border rounded'
                                        type='file'
                                        multiple
                                        name='file'
                                        onChange={handleChange} />
                                </div> */}

              </div>
              <div className="p-3">
                <div className="border-b mb-2 font-semibold">
                  Anexos (<small>{task.files && task.files.length}</small>)
                </div>
                {!task.files || task.files.length < 1 ?
                  <div className="">Nenhum ficheiro anexado a esta tarefa</div>
                  :
                  <div className="h-full overflow-y-auto" style={{ maxHeight: '800px' }}>
                    <ul className='grid'>
                      {task.files.map(file => (
                        <li key={file.id} className='grid mb-5 pb-2'>
                          <FileCard file={file} />
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              {/* <ButtonBlue type='submit'>
                            {task ? 'Salvar' : 'Criar'}
                        </ButtonBlue> */}
              <ButtonGrayLight type='reset' onClick={handClose}>
                Fechar
                <BsX />
              </ButtonGrayLight>
            </div>
          </form>
        }
      </div>
    </Modal>
  )
}
