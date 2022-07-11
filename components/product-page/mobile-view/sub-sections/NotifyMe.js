import React, {useState} from 'react';
import ReactDom from "react-dom";

const NotifyMe = () => {
    const [showNotify, setShowNotify] = useState(false)

    return (
        <>
            <button className={"bg-white py-2 px-8 mt-4 rounded-full font-500"} onClick={() => setShowNotify(true)}>
                Notify Me
            </button>
            {
                showNotify && ReactDom.createPortal(<div className={['bg-black/60 h-screen fixed inset-0 z-[100] grid place-items-center py-[8%] px-[5%]']}
                                                      onClick={() => setShowNotify(false)}>
                    <div className={"bg-white h-full w-full rounded-[8vw] border-4 border-[#b3aeab]"}>
                        <span>Notify Me!</span>
                    </div>
                </div>, document.getElementById('notifyModal'))
            }
        </>
    );
};

export default NotifyMe;