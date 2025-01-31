export default function DataBlock({data} : {
    data : {
        title: string,
        value: string | number | undefined,
        image: JSX.Element
    }
}) {
    return (
        <>
            <div className="bg-white shadow rounded-md p-5 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl">{data.value}</h1>
                    <p className="text-xl">{data.title}</p>
                </div>
                <div className="">
                    {data.image}
                </div>
            </div>
        </>
    )
}