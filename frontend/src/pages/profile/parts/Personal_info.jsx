import React from 'react'
import Pers_info from '../forms/Pers_info'

function Personal_info({data}) {
  return (
    <>
        <div className='flex flex-col items-start w-full rounded-lg '> 
                <div className='underline underline-offset-4'>
                    INFORMATIONS PERSONNELLES:
                </div>
                <div className="mt-6  w-full">
                    <Pers_info  data={data}/>
            </div>
        </div>
    </>
  )
}

export default Personal_info