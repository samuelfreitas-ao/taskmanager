import React from 'react';

export  function Modal({ children, show }: React.PropsWithChildren<{ show: boolean }>) {
    return (
        <>
            {show &&
                <div className={`fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50`}>
                    <div className="w-full h-full bg-no-repeat bg-cover bg-rounded-pattern">
                        <div className="flex flex-col w-full h-full">
                            <div className=" flex flex-col items-center h-full p-4 sm:p-2 sm:px-8 sm:py-4 overflow-y-auto">
                                <div className="flex flex-col justify-center items-center w-full xl:w-4/5 h-full px-4 py-4 rounded-lg overflow-y-auto shadow p-5">
                                    {/* <div className=""> */}
                                        {children}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}
