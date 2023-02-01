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
import Notification, { NotificationHandle, NotificationType } from '../../components/notification';
import TaskBoardCard from '../../components/task-board-card';

export default function Tasks () {
  const [tasks, setTaks] = useState<ITask[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
  const [showModalDetail, setShowModalDetail] = useState<boolean>(false)
  const [formData, setFormData] = useState<ITask>({} as ITask)
  const [selectedCard, setSelectedCard] = useState<[any, boolean]>([0, false])
  const [softDelete, setSoftDelete] = useState(false)
  const [notify, setNotify] = useState({ result: false, message: '', type: '', show: false })

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
    (async () => {
      const { data } = await HttpClient.get({ uri: '/tasks' })
      setLoadingData(false)
      setTaks(data)
    })()
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

    console.log('response', response);

    const type = response.result ? NotificationType.SUCCESS : NotificationType.ERROR
    setNotify({ message: response.message, type, show: true, result: response.result })

    if (response.result) {
      handClose()
      loadData()
    }
  }

  const handleSubmitDelete = async (e: FormEvent) => {
    e.preventDefault()
    const response = await TaskController.delete(formData.id, softDelete)
    const type = response.result ? NotificationType.SUCCESS : NotificationType.ERROR

    setNotify({ message: response.message, type, show: true, result: response.result })

    if (response.result) {
      handClose()
      loadData()
    }
  }

  if (loadingData) {
    return <LoadingPage />
  }
  return (
    <Layout>
      <Context.Provider value={{ setNotify, notify }}>
        <Notification message={notify.message} type={notify.type} show={notify.show} />
      </Context.Provider>
      <div>
        <div className="mb-5 font-semibold text-3xl">Tarefas (<small>{tasks.length}</small>)</div>
        <div className="mb-2">
          <ButtonBlue onClick={handleShowEditor}>
            <BsPlusCircle />
            Nova tarefa
          </ButtonBlue>
        </div>
        <Context.Provider value={{ handClose, handleSubmit, setFormData, formData, setShowLoader, showLoader }}>
          <TaskCardEditor show={showModal} task={formData} />
        </Context.Provider>

        <Context.Provider value={{ handClose, handleSubmitDelete, setSoftDelete, softDelete, setShowLoader, showLoader }}>
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
            <Context.Provider value={{ handClose, setFormData, handleShowEditor, handleShowTask, handleShowdelete, setSelectedCard, selectedCard }}>
              <TaskBoardCard tasks={tasks} />
            </Context.Provider>
          </div>
        }
      </div>
    </Layout>
  )
}
