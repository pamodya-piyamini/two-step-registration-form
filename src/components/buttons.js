function Button(props) {
    return (
        <button type={props.type} onClick={props.onClick} disabled={props.disabled} className={`mt-5 text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full disabled:bg-slate-500 sm:w-auto px-5 py-2.5 text-center ${props.styles}`}>{props.children}</button>
    )
}

export default Button