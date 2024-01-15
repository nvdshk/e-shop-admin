import React from 'react'

const CardHeader = ({label}: {label: string}) => {
  return (
    <div >
        <h2 className="text-1xl font-bold">{label}</h2>
        <div className="bg-gray-100 h-[2px] mt-4 mb-3" />
      </div>
  )
}

export default CardHeader