import React, { useContext, useState } from 'react';
import { BsDownload, BsPencil, BsTrash } from 'react-icons/bs';
import { IFile } from '../app/types/file';
import { FileHelper, FileType } from '../utils/file-helper';
import { ButtonAnchor, ButtonBlue, ButtonLink, ButtonRed } from './button';

import Context from './context'

type Props = {
    file: IFile
}

export default function FileCard(data: Props) {
    const { handleShowEditor, handleShowTask, handleShowdelete, setFormData, setSelectedCard, selectedCard } = useContext(Context)
    const file = data.file
    const fileName = FileHelper.getNameWithExtension(file.path);
    return (
        <div className={`border p-2`}>
            <div className="">
                {(() => {
                    switch (FileHelper.getType(file.path)) {
                        case FileType.IMAGE:
                            return (
                                <div><img src={file.url} alt="" /></div>
                            )
                        case FileType.AUDIO:
                            return (
                                <div><audio src={file.url} /></div>
                            )
                        case FileType.VIDEO:
                            return (
                                <div><video src={file.url} /></div>
                            )
                        default:
                            return (
                                <a href={file.url} target='_blank' className='flex gap-2 items-center text-blue-600 hover:underline hover:text-blue-700'>
                                    {fileName}
                                </a>
                            )
                    }
                })()}
            </div>
        </div>
    )
}
