import React, { useEffect, useRef } from 'react'

function ContextMenu({options, cordinates, contextMenu, setContextMenu}) {
    const contextMenuRef = useRef(null);

    useEffect(()=>{
        const handleOutsideClick = (event)=>{
            if(event.target.id !== "context-opener"){
                if(contextMenuRef.current && !contextMenuRef.current.contains(event.target)){
                    setContextMenu(false);
                }
            }
        };
        document.addEventListener("click",handleOutsideClick);
        return()=>{
            document.removeEventListener("click",handleOutsideClick);
        }
    },[]);

    const handleClick = (e,callback)=>{
        e.stopPropagation();
        setContextMenu((prev)=> !prev);
        callback();
    }
  return (
    <div className={`bg-dropdown-background fixed p-2 rounded-b-md rounded-tl-md border-2 hover:border-red-200 z-[100] shadow-xl}`}
    ref={contextMenuRef}
    style={{
        top:cordinates.y,
        left: cordinates.x,
    }}
    >
        <ul>
            {
                options.map(({name, callback})=>(
                    <li key={name} onClick={(e)=>handleClick(e,callback)}
                    className='px-1 py-1 md:px-4 md:py-2 cursor-pointer hover:bg-background-default-hover'>
                        <span className='text-white text-base md:text-md'>{name}</span>
                    </li>
                ))
            }
        </ul>

    </div>
  )
}

export default ContextMenu