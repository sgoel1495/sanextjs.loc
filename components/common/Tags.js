import React from 'react';

export const NewTag = (props) => {
    let style = "!capitalize font-400 leading-none px-1 ml-2"
    if (props.white) {
        style += " bg-transparent text-black"
    } else {
        style += " bg-black text-white"
    }
    if (props.small) {
        style += " !text-[7.5px]"
    }
    else{
        style += " !text-xs"
    }
    return <span className={style}>New</span>
};
