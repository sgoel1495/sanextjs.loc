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
            <h3 className={`text-h4 font-600 mb-4 uppercase`}>{props.category}</h3>
        </BlockHeader>
    </>
}

export default GroupDesignHeader