import React from 'react';
type PropsMain = React.PropsWithChildren<{ title?: string }>
export default function Layout({ children, title }: PropsMain) {
    return (
        <div className='flex w-screen h-screen bg-gray-50'>
            <div className="w-full h-full bg-no-repeat bg-cover bg-rounded-pattern">
                <div className="flex flex-col w-full h-full">
                    <div className=" flex flex-col items-center h-full p-4 sm:p-2 sm:px-8 sm:py-4 overflow-y-auto"> {/* this overflow-y-auto avoids a broken layout with a white part */}
                        {/* whiteContainer */}
                        <div className="flex flex-col w-full xl:w-4/5 h-full px-4 py-4 rounded-lg bg-white overflow-y-auto shadow p-5">
                            {/* Title */}
                            <div className="text-5xl text-center border-b pb-4 mb-4">
                                Task Manager
                            </div>
                            {/* Content */}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
