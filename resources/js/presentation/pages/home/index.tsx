import React from 'react'
import { BsInfoCircle, BsPlusCircle } from 'react-icons/bs'
import Layout from '../../components/layout'
import TaskCardEditor from '../../components/task-card-editor'

import { ButtonBlue } from '../../components/button'
import { TaskCardDelete } from '../../components/task-card-delete'
import TaskCardDetail from '../../components/task-card-detail'
import TaskBoardCard from '../../components/task-board-card'
import { LoadingPage } from '../loading'
import { useTask } from '../../../hooks/task'

export function Tasks() {
  const {
    loadTaskRequest,
    loadingData,
    handleShowEditor,
    tasks,
    showModalDetail,
    showModalDelete,
    formData,
    showModal,
  } = useTask()

  React.useEffect(() => {
    loadTaskRequest()
  }, [])
  if (loadingData) {
    return <LoadingPage />
  }
  return (
    <Layout>
      <div>
        <div className="mb-5 font-semibold text-3xl">
          Tarefas (<small>{tasks.length}</small>)
        </div>
        <div className="mb-2">
          <ButtonBlue onClick={handleShowEditor}>
            <BsPlusCircle />
            Nova tarefa
          </ButtonBlue>
        </div>
        <TaskCardEditor show={showModal} task={formData} />

        {showModalDelete && (
          <TaskCardDelete show={showModalDelete} task={formData} />
        )}

        {showModalDetail && (
          <TaskCardDetail show={showModalDetail} id={formData.id} />
        )}
        {tasks.length < 1 ? (
          <div className="flex items-center gap-x-2 bg-blue-50 border border-blue-100 px-7 py-4 text-center">
            <BsInfoCircle />
            Nenhuma tarefa de momento. Comece a criar uma.
          </div>
        ) : (
          <div className="">
            <TaskBoardCard tasks={tasks} />
          </div>
        )}
      </div>
    </Layout>
  )
}
