import React from 'react';
import { ITask } from '../app/types/task';

type Props = {
    task: ITask
}
export default function TaskCard(data: Props) {
    const task = data.task
    return (
        <div className='flex bg-blue-50 border border-blue-100 px-5 py-2 rounded-lg h-full'>
            <div className="">
                <div className="font-semibold mb-2">
                    <span className="font-bold">{task.id}</span> {task.title}
                </div>
                <div className="flex items-center gap-2">
                    {/* <BsArchiveFill className='w-8' /> */}
                    Ficheiros
                    <div className="">{task.files.length}</div>
                </div>
                <div className="flex gap-3 mt-2">
                    <div className="">Estado</div>
                    <div className="">{task.status}</div>
                </div>
            </div>
        </div>
    )
}
