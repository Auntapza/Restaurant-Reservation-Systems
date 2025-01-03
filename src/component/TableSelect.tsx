interface TableApi {
    tableId: string,
    status: number
}

const socket = io("http://localhost:4000");

export default function TableSelect({ tableVal, selectFunction } : {
    selectFunction: Function,
    tableVal?: string
}) {

    const [dep, setDep] = useState(0)

    const { data, loader } = useFetchData<TableApi[]>({
        url: 'http://localhost:4000/table',
        dependencies: [dep]
    })

    useEffect(() => {
        socket.on("update table", () => {
            setDep((prv) => (prv+1))
        })
    }, [])

    return (
        <>
            <div className="grid grid-rows-2 grid-cols-3 w-full justify-items-center">
                <Loading fallback={<p className='text-2xl font-bold'>Loadding...</p>} loadding={loader}>
                    {data?.map((e, index) => {
                        return (
                            <Table key={index} selected={tableVal == e.tableId}
                                onClick={(ev) => {selectFunction(e.tableId, ev)}}
                                state={e.status}/>
                        )
                    })}
                </Loading>
            </div>  
        </>
    )
}

import api from '@/function/api';
import useFetchData from '@/hooks/useFetch';
import correct from '@/img/correct.png'
import { TableState, tableStatus } from '@/interface/interface'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { MouseEventHandler, MouseEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Loading from './Load';

function Table( {onClick, state, selected} : {
    onClick: MouseEventHandler,
    state?: TableState | number,
    selected?: boolean
} ) {

    const path = usePathname();

    function clickFunction(e:MouseEvent<HTMLButtonElement>) {
        if (state == 0 || state == undefined) {
            return onClick(e)
        } else {
            if (path.startsWith('/app')) {
                return () => {}
            } else {
                return onClick(e)
            }
        }
    }

    return (
        <>
            <button className="cursor-pointer relative" onClick={clickFunction}>
                {
                    (selected && (state == 0 || state == undefined)) ?
                    (<div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                        <Image className="size-20" src={correct} alt=""/>
                    </div>)
                    :
                    ''
                }
                <svg width="256px" height="256px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" fill={
                    state == 1 ? '#f00' : state == 2 ? '#fa0' : '#000'
                } stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <title>table</title> <path d="M18.76,6l2,4H3.24l2-4H18.76M20,4H4L1,10v2H3v7H5V16H19v3h2V12h2V10L20,4ZM5,14V12H19v2Z"></path> <rect width="24" height="24" fill="none"></rect> </g></svg>
            </button>
        </>
    )
}