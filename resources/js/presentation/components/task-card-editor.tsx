import React, { ChangeEvent } from 'react'
import { Modal } from './modal'
import { ButtonBlue, ButtonGrayLight } from './button'
import { BsX } from 'react-icons/bs'
import { useTask } from '../../hooks/task'
import { ITask } from '../../app/types/task'

type Props = {
  show: boolean
  task?: ITask
}
export default function TaskCardEditor({ show, task }: Props) {
  const { handClose, handleSubmit, formData, setFormData } = useTask()
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
    <Modal show={show}>
      <div
        className="bg-white px-6 py-8"
        style={{ width: '100%', maxWidth: '900px' }}
      >
        <form action="" onSubmit={handleSubmit} className="grid gap-y-2">
          <div className="mb-2 pb-2 border-b font-semibold">
            {task?.id ? 'Editar' : 'Nova'} tarefa {task.title}
          </div>
          <div className="flex">
            <input
              className="flex-1 focus:outline-none px-3 py-1 border rounded"
              type="text"
              name="title"
              onChange={handleChange}
              defaultValue={task?.title || ''}
              placeholder="Título"
            />
          </div>
          <div className="flex">
            <textarea
              className="flex-1 focus:outline-none px-3 py-1 border rounded"
              name="description"
              onChange={handleChange}
              defaultValue={task?.description || ''}
              placeholder="Descrição"
            />
          </div>
          <div className="flex">
            <input
              className="flex-1 focus:outline-none px-3 py-1 border rounded"
              type="file"
              multiple
              name="file"
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <select
              className="flex-1 focus:outline-none px-3 py-1 border rounded"
              name="status"
              onChange={handleChange}
              defaultValue={task?.status || ''}
            >
              <option value="" disabled>
                -Selecione-
              </option>
              <option>Pendente</option>
              <option>Activo</option>
              <option>Feito</option>
            </select>
          </div>
          <div className="flex gap-2">
            <ButtonBlue type="submit">
              {task?.id ? 'Salvar' : 'Criar'}
            </ButtonBlue>
            <ButtonGrayLight type="reset" onClick={handClose}>
              Fechar
              <BsX />
            </ButtonGrayLight>
          </div>
        </form>
      </div>
    </Modal>
  )
}
