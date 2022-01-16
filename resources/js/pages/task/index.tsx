import React, { FormEvent, useEffect, useState } from 'react';
import { BsInfoCircle, BsPlusCircle } from 'react-icons/bs'
import { ITask } from '../../app/types/task';
import Layout from '../../components/layout';
import TaskCardEditor from '../../components/task-card-editor';
import TaskCard from '../../components/task-card';
import { HttpClient } from '../../libs/http/http-client';
import LoadingPage from '../loading';

import Context from '../../components/context'
import { ButtonBlue } from '../../components/button';
import { TaskController } from '../../app/controllers/TaskController';
import { TaskCardDelete } from '../../components/task-card-delete';
import TaskCardDetail from '../../components/task-card-detail';

export default function Tasks() {
    const [tasks, setTaks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [showModalDetail, setShowModalDetail] = useState<boolean>(false)
    const [formData, setFormData] = useState<ITask>({} as ITask)
    const [selectedCard, setSelectedCard] = useState<[any, boolean]>([0, false])
    const [softDelete, setSoftDelete] = useState(false)

    useEffect(() => {
        loadData()
    }, []);

    const handleShowEditor = () => {
        setShowModal(true)
    }

    const handleShowdelete = () => {
        setShowModalDelete(true)
        setSoftDelete(false);
    }

    const handleShowTask = () => {
        setShowModalDetail(true)
    }

    const loadData = () => {
        HttpClient.get({
            uri: '/tasks',
            callback: (response: any) => {
                setLoading(false)
                setTaks(response.data)
            }
        })
    }

    const handClose = () => {
        setShowModal(false)
        setShowModalDelete(false)
        setShowModalDetail(false)
        setFormData({} as ITask)
        setTimeout(() => {
            setSelectedCard([0, false])
        }, 1500);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        let response
        if (!formData.id || formData.id < 1) {
            response = await TaskController.create(formData)
        } else {
            response = await TaskController.update(formData)
        }
        console.log(response.message);
        if (!response.result) {
        } else {
            handClose()
            loadData()
        }
    }

    const handleSubmitDelete = async (e: FormEvent) => {
         e.preventDefault()
        const response = await TaskController.delete(formData.id, softDelete)
        if (!response.result) {
        } else {
            handClose()
            loadData()
        }
    }

    if (loading) {
        return <LoadingPage />
    }
    return (
        <Layout>
            <div>
                <div className="mb-5 font-semibold text-3xl">Tarefas (<small>{tasks.length}</small>)</div>
                <div className="mb-2">
                    <ButtonBlue onClick={handleShowEditor}>
                        <BsPlusCircle />
                        Nova tarefa
                    </ButtonBlue>
                </div>
                <Context.Provider value={{ handClose, handleSubmit, setFormData, formData }}>
                    <TaskCardEditor show={showModal} task={formData} />
                </Context.Provider>

                <Context.Provider value={{ handClose, handleSubmitDelete, setSoftDelete, softDelete }}>
                    {showModalDelete &&
                        <TaskCardDelete show={showModalDelete} task={formData} />
                    }
                </Context.Provider>

                <Context.Provider value={{ handClose }}>
                    {showModalDetail &&
                        <TaskCardDetail show={showModalDetail} id={formData.id} />
                    }
                </Context.Provider>
                {tasks.length < 1 ?
                    <div className="flex items-center gap-x-2 bg-blue-50 border border-blue-100 px-7 py-4 text-center">
                        <BsInfoCircle />
                        Nenhuma tarefa de momento. Comece a criar uma.
                    </div>
                    :
                    <div className="">
                        <ul className='grid grid-cols-3 gap-4'>
                            {tasks.map((task) => (
                                <li key={task.id} className=''>
                                    <Context.Provider value={{ handClose, setFormData, handleShowEditor, handleShowTask, handleShowdelete, setSelectedCard, selectedCard }}>
                                        <TaskCard selected={selectedCard[task.id]} task={task} />
                                    </Context.Provider>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </Layout>
    )
}
