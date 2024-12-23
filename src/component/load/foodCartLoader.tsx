export default function FoodCardLoader() {
    return (
        <>
            {Array.from({length: 7}).map((e, index) => (
                <div key={index} className='bg-slate-100 
                rounded-md p-5 grid gap-y-2 
                animate-pulse h-[30rem]'>
                </div>
            ))}
        </>
    )
}