import React from 'react';

export const NewTag = (props) => <span className={"!text-xs !capitalize font-400 leading-none px-1 ml-2 "+[props.white?"bg-transparent text-black":`bg-black text-white `]}>New</span>;
