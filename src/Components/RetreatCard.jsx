import React from 'react'

function RetreatCard({elem}) {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = (new Date(elem.date * 1000))
  return (
    <div className='bg-[#e0d9cf] flex flex-col gap-y-2 p-2 md:p-3 lg:px-4 rounded-lg shadow-lg md:w-[240px] lg:w-[480px]'>
        <img src={elem.image} alt="logo" className='aspect-video w-5/6 rounded-md'/>
        <h1 className='font-semibold text-[20px]'>{elem.title}</h1>
        <p className='text-[16px]'>{elem.description}</p>
        <p className='text-[14px]'>Date: {`${month[date.getMonth() - 1]} ${date.getDate()}-${date.getDate() + elem.duration}, ${date.getFullYear()}`}</p>
        <p className='text-[14px]'>Location: {elem.location}</p>
        <p className='text-[14px] font-semibold'>Price: ${elem.price}</p>
    </div>
  )
}

export default RetreatCard