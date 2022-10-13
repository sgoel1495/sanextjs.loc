import BlockHeader from "../common/blockHeader";
import React, {useState} from "react";

const GroupDesignHeader = (props) => {
    const [showFilters,setShowFilters] = useState(false)
    const filters = () => {
        const filterInputs = <div>
            FILTERS ACITVE
        </div>
        return <div>
            <div>Filters</div>
            {showFilters ?filterInputs : null}
        </div>
    }
    return <>

        <BlockHeader
            space={"py-5"}
            titleStyle={"text-center"}
        >
            <div className={"flex items-center justify-center gap-2 mb-4"}>
                <hr className={"w-24 h-[1.2px] bg-[#707070]"}/>
                <h3 className={`text-xl uppercase`}>{props.category?props.category.replace("-"," "):""}</h3>
                <hr className={"w-24 h-[1.2px] bg-[#707070]"}/>
            </div>
        </BlockHeader>
    </>
}

export default GroupDesignHeader