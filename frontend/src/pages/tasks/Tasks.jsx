import React from 'react'
import CUTask from './cu/CUTask'
import { useSelector } from 'react-redux'
import { isArrayNotNull } from '../../functions/Functions'

function Tasks() {

  const intern = useSelector(state=>state.stage.value)
  const interns = isArrayNotNull(intern) ? intern.filter(item=>
    item.stagiaire && !item.status 
  ) : []

  console.log(interns)

  return (
    <>
      <CUTask data={interns} />
    </>
  )
}

export default Tasks