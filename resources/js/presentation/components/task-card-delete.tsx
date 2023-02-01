import React, { ChangeEvent, useContext } from 'react'
import { Modal } from './modal'
import { ButtonGrayLight, ButtonRed, ButtonYellow } from './button'
import { BsRecycle, BsTrash, BsX } from 'react-icons/bs'
import { ITask } from '../../app/types/task'
import { useTask } from '../../hooks/task'

type Props = {
  show: boolean
  task: ITask
}
export function TaskCardDelete (prop: Props) {
  const { handClose, handleSubmitDelete, setSoftDelete, softDelete } = useTask()
  const task = prop.task

  const handleSoftDelete = (e: ChangeEvent<HTMLInputElement>) => {
    setSoftDelete(!e.target.checked)
  }
  return (
    <Modal show={prop.show}>
      <div className="bg-white px-6 py-8" style={{ width: '100%', maxWidth: '500px' }}>
        <form action="" onSubmit={handleSubmitDelete} className='grid gap-y-2'>
          <div className="mb-2 pb-2 border-b">Excluir tarefa</div>
          <div className="">
            Deseja realmente excluir a tarefa <b>{task.title}</b>?
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="soft_delete" className='text-sm'>Excluir permanentemente</label>
            <input type="checkbox" name='soft_delete' id='soft_delete' defaultChecked={!softDelete} onChange={handleSoftDelete} />
          </div>
          <div className="flex gap-2">
            {softDelete ?
              <ButtonYellow type='submit'>
                <BsRecycle /> Mover para lixeira
              </ButtonYellow> :
              <ButtonRed type='submit'>
                <BsTrash /> Excluir
              </ButtonRed>
            }
            <ButtonGrayLight type='reset' onClick={handClose}>
              Fechar
              <BsX />
            </ButtonGrayLight>
          </div>
        </form>
      </div>
    </Modal>
  )
}
