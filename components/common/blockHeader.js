import React from "react";


const BlockHeader = (props) => {
    const blockData = (
        <div className={"container flex gap-10 items-center " + [props.space]}>
            {props.line ? <hr className={"flex-1 h-0.5 bg-black justify-self-end "+[props.hrStyle]}/> : <></>}
            <div className={"flex-auto text-center leading-none " + [props.titleStyle]}>
                {props.children}
            </div>
            {props.line ? <hr className={"flex-1 h-0.5 bg-black "+[props.hrStyle]}/> : <></>}
        </div>
    )
    return props.blockHeaderStyle ? <div className={props.blockHeaderStyle}>{blockData}</div> : blockData
}

export default BlockHeader;

// to style whole block use ** blockHeaderStyle **
// for padding or margin use ** space **
// to style title block use ** titleStyle **
// to show lines on both use ** line ** ## as boolean (by Default false)
