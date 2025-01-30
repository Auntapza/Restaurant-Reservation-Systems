interface TableApi {
    tableId: string,
    status: number
}

interface Component extends DOMAttributes<HTMLDivElement> {
    selectFunction: Function,
    tableVal?: string,
    className?: string
}

const socket = io("http://localhost:4000");

export default function TableSelect({ tableVal, selectFunction, className, ...rest }: Component) {

    const [dep, setDep] = useState(0)

    const { data, loader } = useFetchData<TableApi[]>({
        url: 'http://localhost:4000/table',
        dependencies: [dep]
    })

    console.log(data);

    useEffect(() => {
        socket.on("table update", (res) => {
            setDep((prv) => (prv+1));
        })
    }, [])

    return (
        <>
            <div {...rest} className={`grid grid-rows-2 grid-cols-3 w-full mx-3 lg:mx-0 mb-24 lg:justify-items-center gap-5 ${className}`}>
                <Loading fallback={<p className='text-2xl font-bold'>Loadding...</p>} loadding={loader}>
                    {data?.map((e, index) => {
                        return (
                            <Table key={index} name={e.tableId} selected={tableVal == e.tableId}
                                onClick={(ev) => {selectFunction(e.tableId, ev, e.status)}}
                                state={e.status}/>
                        )
                    })}
                </Loading>
            </div>  
        </>
    )
}

import useFetchData from '@/hooks/useFetch';
import correct from '@/img/correct.png'
import { TableState, tableStatus } from '@/interface/interface'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { MouseEventHandler, MouseEvent, useEffect, useState, DOMElement, DOMAttributes } from 'react'
import { io } from 'socket.io-client'
import Loading from './Load';

function Table( {onClick, state, selected, name} : {
    onClick: MouseEventHandler,
    state?: TableState | number,
    selected?: boolean,
    name: string
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
                <div className={`bg-white border rounded shadow size-full grid items-center lg:hidden font-bold text-2xl
                    ${state == 1 ? 'bg-[#f00] text-white' : state == 2 ? 'bg-[#fa0] text-white' : ''}`}>{name}</div>
                <svg width="256px" height="256px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" fill={
                    state == 1 ? '#f00' : state == 2 ? '#fa0' : '#000'
                } className='hidden lg:block' stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <title>table</title> <path d="M18.76,6l2,4H3.24l2-4H18.76M20,4H4L1,10v2H3v7H5V16H19v3h2V12h2V10L20,4ZM5,14V12H19v2Z"></path> <rect width="24" height="24" fill="none"></rect> </g></svg>
            </button>
        </>
    )
}