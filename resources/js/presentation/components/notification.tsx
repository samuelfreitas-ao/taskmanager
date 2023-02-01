import React, { useContext, useState } from 'react';
import { BsCheckCircle, BsExclamationTriangle, BsExclamationTriangleFill, BsInfoCircle, BsTriangleFill } from 'react-icons/bs';
import context from './context';

export enum NotificationType {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success',
}

type Props = {
    type: string
    message: string
    show: boolean
}

export default function Notification(data: Props) {
    const not = NotificationType
    const title = { info: 'Informação', error: 'Erro', success: 'Sucesso' } as any
    const [show, setSow] = useState<number>(3)

    const { setNotify, notify } = useContext(context)

    let classList
    switch (data.type) {
        case not.ERROR:
            classList = 'bg-red-200 border-red-300'
            break;
        case not.SUCCESS:
            classList = 'bg-green-200 border-green-300'
            break;
        case not.INFO:
            classList = 'bg-blue-200 border-blue-300'
            break;
        default:
            break;
    }
    if (!classList) return (<></>)

    setTimeout(() => {
        setNotify({})
    }, 5000)
    return (
        <>
            {notify.type &&
                <div className={`fixed right-5 top-5 w-96 rounded-lg ${classList}`} style={{zIndex:999}}>
                    <div className="px-5 py-3">

                        <div className="flex gap-2 items-center">
                            <div className="text-4xl">
                                {(() => {
                                    switch (data.type) {
                                        case NotificationType.ERROR:
                                            return (<BsExclamationTriangle />)
                                        case NotificationType.INFO:
                                            return (<BsCheckCircle />)
                                        case NotificationType.SUCCESS:
                                            return (<BsCheckCircle />)
                                        default:

                                    }
                                })()}
                            </div>
                            <div className="">
                                <div className="font-semibold">
                                    {title[data.type]}
                                </div>
                                <div className="">{data.message}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export function NotificationHandle(data: Props) {
    const [show, setShow] = useState(false)
    setTimeout(() => {
        setShow(false)
    }, 3000);

    return (show && <Notification message={data.message} type={data.type} show={show} />)
}
