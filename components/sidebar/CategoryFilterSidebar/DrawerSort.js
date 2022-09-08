import React from "react";

const DrawerSort = props => {
    const drawerButtonClass = "block border-2 shadow-[4px_4px_6px_0.6px_rgba(0,0,0,0.1)] leading-none"
    const sortButtonClass = drawerButtonClass + " rounded-2xl font-cursive capitalize pb-3 pt-4 px-2"
    return (
        <div className="grid grid-cols-2 gap-4">
            <button
                className={sortButtonClass + [props.sortBy === "price-asc" ? " bg-white border-[#faf4f0]" : " bg-[#faf4f0] border-white"]}
                onClick={() => props.setSorting("price-asc")}
            >
                Price low to high
            </button>
            <button
                className={sortButtonClass + [props.sortBy === "price-desc" ? " bg-white border-[#faf4f0]" : " bg-[#faf4f0] border-white"]}
                onClick={() => props.setSorting("price-desc")}
            >
                Price high to low
            </button>
            <button
                className={sortButtonClass + [props.sortBy === "best-selling-count-desc" ? " bg-white border-[#faf4f0]" : " bg-[#faf4f0] border-white"]}
                onClick={() => props.setSorting("best-selling-count-desc")}
            >
                Most popular
            </button>
            <button
                className={sortButtonClass + [props.sortBy === "created-at-desc" ? " bg-white border-[#faf4f0]" : " bg-[#faf4f0] border-white"]}
                onClick={() => props.setSorting("created-at-desc")}
            >
                New arrivals
            </button>
            {props.sortBy && <button className={sortButtonClass + " bg-[#faf4f0] border-white"} onClick={() => props.setSorting("")}>Reset</button>}
        </div>
    )
}

export default DrawerSort;