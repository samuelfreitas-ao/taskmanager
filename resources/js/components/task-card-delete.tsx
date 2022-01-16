import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { ITask } from '../app/types/task';
import {Modal} from './modal';
import Context from './context'
import { ButtonBlue, ButtonGray, ButtonGrayLight, ButtonRed } from './button';
import { BsTrash, BsX } from 'react-icons/bs';

type Props = {
    show: boolean
    task: ITask
}
export function TaskCardDelete(prop: Props) {
    const { handClose, handleSubmitDelete } = useContext(Context)
    const task = prop.task

    return (
        <Modal show={prop.show}>
            <div className="bg-white px-6 py-8" style={{ width: '100%', maxWidth: '500px' }}>
                <form action="" onSubmit={handleSubmitDelete} className='grid gap-y-2'>
                    <div className="mb-2 pb-2 border-b">Excluir tarefa</div>
                    <div className="">
                        Deseja realmente excluir a tarefa <b>{task.title}</b>?
                    </div>
                    <div className="flex gap-2">
                        <ButtonRed type='submit'>
                            <BsTrash /> Excluir
                        </ButtonRed>
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
