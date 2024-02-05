import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[1000]'>
        <div className='flex gap-5 text-4xl font-semibold sm:text-3xl'>
             <h1 className='text-secondary A headings'>A</h1>
             <h1 className='text-white K headings'>K</h1>
             <h1 className='text-tertiary R headings'>R</h1>
        </div>
    </div>
  )
}

export default Loader