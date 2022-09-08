import React, {useEffect, useState} from "react";

function Checkbox(props) {
    const [isChecked, setIsChecked] = useState(false)
    useEffect(() => {
        const result = !!(props.checkBoxes[props.item.name] && props.checkBoxes[props.item.name].includes(props.filter))
        if (result !== isChecked)
            setIsChecked(result)
    }, [props.checkBoxes, props.refresh])

    const handleCheckboxChange = (e) => {
        const newVal = !isChecked
        props.handleCheckboxChange(props.item.name, props.filter, newVal)
        setIsChecked(newVal)
    }

    const inputClass = `text-black border-black/20 focus:ring-offset-0 focus:ring-0 cursor-pointer`
    const inputMobileClass = `text-[#faf4f0] h-5 w-5 border-[#997756] bg-[#faf4f0] checked:!border-[2px] checked:!border-white checked:!bg-[#99775666] mobileCheckbox focus:ring-offset-0 focus:ring-0 cursor-pointer`

    return (
        <div className="relative flex gap-2 items-center justify-start leading-none" key={props.item.name + props.filter}>
            <input
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(e)}
                type="checkbox"
                className={props.isMobile?inputMobileClass:inputClass}
                id={props.item.name + props.filter}
                name={props.item.name + props.filter}
            />
            <label htmlFor={props.item.name + props.filter} className={`block capitalize text-sm`}>{props.filter}</label>
            <span className={`text-black/50 text-xs font-600`}>({props.count})</span>
        </div>
    );
}

const ShowFilters = ({originalData, filterData, checkedBoxes, setCheckedBoxes, refresh,isMobile}) => {
    const [filterExpand, setFilterExpand] = useState({});
    const resetFilterCategory = (cat) => {
        checkedBoxes[cat] = []
        setCheckedBoxes(checkedBoxes)
    }

    const handleCheckboxChange = (name, item, isTrue) => {
        //it is a toggle
        const index = checkedBoxes[name].indexOf(item)
        if (isTrue && index === -1)
            checkedBoxes[name].push(item)
        else if (!isTrue && index !== -1)
            checkedBoxes[name].splice(index, 1);
        // once another box is clicked, the reset gets reset
        setCheckedBoxes(checkedBoxes)
    }

    React.useEffect(() => {
        let filters = filterData.map(item => ({[item.name]: false}))
        setFilterExpand(filters)
    }, [filterData])

    return filterData.map((item, index) => {
        return (
            <div key={index}>
                <div className="flex gap-x-2 font-500 items-center mb-2">
                    <h6 className="text-h6 uppercase flex-1">{item.name}</h6>
                    <button
                        type="button"
                        className="text-sm underline underline-offset-2 leading-none"
                        onClick={() => resetFilterCategory(item.name)}
                    >
                        Reset
                    </button>
                </div>
                <div className={`flex flex-col gap-3`}>
                    {(filterExpand[item.name] ? item.filters : item.filters.slice(0, 4)).map((filter, i) => {
                        return (
                            <Checkbox
                                handleCheckboxChange={handleCheckboxChange}
                                filter={filter} item={item} count={originalData[item.key[i]]}
                                checkBoxes={checkedBoxes} refresh={refresh}
                                key={i}
                                isMobile={isMobile}
                            />
                        )
                    })}
                    {!filterExpand[item.name] && item.filters.length > 4
                        ? <button
                            type="button"
                            className="text-[#00aff0] w-fit inline-block ml-5"
                            onClick={() => setFilterExpand({...filterExpand, [item.name]: true})}
                        >+{item.filters.length - 4} more</button>
                        : null
                    }
                </div>
            </div>
        )
    })
}

export default ShowFilters