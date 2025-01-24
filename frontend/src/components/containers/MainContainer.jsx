import React from 'react'

function MainContainer({children}) {

    const searchContainer = children[0]
    const content = children[1]

  return (
    <>
        <div className='flex flex-col h-full '>
            <div>{searchContainer}</div>
            <div className='h-full'>{content}</div>
        </div>
    </>
  )
}

export default MainContainer