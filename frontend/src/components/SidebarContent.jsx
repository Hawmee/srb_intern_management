import React from 'react'

function SidebarContents({children}) {
  return (
    <>
        <ul>
            {children}
        </ul>
    </>
  )
}

export default SidebarContents