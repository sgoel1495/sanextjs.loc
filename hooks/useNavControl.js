import {useCallback, useEffect, useState} from "react";

function useNavControl(val=0){
    const [navControl, setNavControl] = useState(false);
    const controller = useCallback(() => {
        const isSet = (window.scrollY > val)
        if (isSet !== navControl)
            setNavControl(isSet)
    }, [navControl,val])
    useEffect(() => {
        if(window) {
            if(val<0)
                val = window.innerHeight + val

            window.addEventListener("scroll", controller);
        }
        return () => {
            window.removeEventListener('scroll', controller)
        };
    }, [controller]);

    return navControl
}

export default useNavControl