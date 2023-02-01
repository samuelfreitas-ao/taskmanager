import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { SpinnerHorizontalCircle } from '../../components/spinner';

type IData = {
    text?: string
    title?: string
}
export default function LoadingPage(data: IData) {
    return (
        <Layout title={data.title ? data.title : 'Carregando...'}>
            <div className="flex flex-row w-full h-full">
                <div className="flex flex-col gap-2 items-center justify-center w-full text-2xl">
                    {/* <BsArrowRepeat className="animate-spin" />  */}
                    <SpinnerHorizontalCircle />
                    {data.text ? data.text : 'Carregando...'}
                </div>
            </div>
        </Layout>
    )
}
