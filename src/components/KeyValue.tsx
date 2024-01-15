import React from 'react'

const KeyValue = ({
  title,
  value,
  children,
  showElement,
  style,
}: {
  title: string
  value?: string
  children?: JSX.Element 
  showElement?: boolean,
  style?:string
}) => {
  return (
    <div className={`${style} flex w-full flex-row py-1 `}>
      <h4 className={`mr-1 font-normal `}>{`${title}:`}</h4>
      {showElement === true? (
        children
      ) : (
        <h5 className=" font-medium ">{`${value}`}</h5>
      )}
    </div>
  )
}

export default KeyValue
