import React from 'react'
import { BsClipboardCheck } from 'react-icons/bs'

type PropsMain = React.PropsWithChildren<{ title?: string }>

export default function Layout ({ children, title }: PropsMain) {
  return (
    <div className='flex w-screen h-screen bg-gray-50'>
      <div className="w-full h-full bg-no-repeat bg-cover bg-rounded-pattern">
        <div className="flex flex-col w-full h-full">
          <div className=" flex flex-col items-center h-full p-4 sm:p-2 sm:px-8 sm:py-4 overflow-y-auto"> {/* this overflow-y-auto avoids a broken layout with a white part */}
            {/* whiteContainer */}
            <div className="flex flex-col w-full xl:w-4/5 h-full px-4 py-4 rounded-lg bg-white overflow-y-auto shadow p-5">
              {/* Title */}
              <div className="flex gap-2 items-center justify-center text-5xl text-center border-b pb-4 mb-4">
                <BsClipboardCheck className='' /> Task Manager
              </div>
              {/* Content */}
              {children}
            </div>
            <footer>Desenvolvido por <a href="//github.com/samuelfreitas-ao" className='text-blue-500 underline' target='_blank'>Samuel Freitas</a></footer>
          </div>
        </div>
      </div>
    </div>
  )
}
