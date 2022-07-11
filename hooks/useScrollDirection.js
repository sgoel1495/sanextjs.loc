import React, {useEffect, useState} from "react";

function useScrollDirection(){
    const [oldValue,setOldValue]=useState(0)
    const [scrollDirection, setScrollDirection] = React.useState(false);

    useEffect(() => {
        const scrollController= (_e)=>{
            const newValue = window.scrollY
            if (oldValue < newValue) {
                setScrollDirection(true)
                setOldValue(newValue)
            } else if (oldValue > newValue) {
                setScrollDirection(false)
                setOldValue(newValue)
            }
        }
        window.addEventListener('scroll', scrollController);

        return ()=>{
            window.removeEventListener("scroll",scrollController)
        }
    }, [oldValue]);

    return scrollDirection

}
export default useScrollDirection