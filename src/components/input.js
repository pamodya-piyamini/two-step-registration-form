import React from "react"

function Input(props) {
  return (
    <div className="mb-5">
      <label htmlFor={props.id} className="block mb-2 text-sm font-medium ">{props.label}</label>
      <input type={props.type} id={props.id} className={`bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 ${props.styles}`}
      placeholder="" required={props.required} onChange={props.onChange} value={props.value}/>
      <span className='text-sm text-red-400'>
        {props.error ? props.error : ""}
      </span>
    </div>
  )
}

export default Input