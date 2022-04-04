import React, {useState} from 'react';
import Image from "next/image";

const ImageSwitcher = ({images}) => {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const [selected, setSelected] = useState(0)
    return (
        <div className={"flex py-5"}>
            <div className={"flex-[1] pl-11"}>
                {
                    images.map((image, index) => {
                        return <span className={"block relative h-[5.5rem] aspect-[2/3] mb-5 border " + [selected === index ? "border-[burlywood]" : "border-[gray]"]} key={index}
                                     onClick={() => setSelected(index)}>
                            <Image src={WEBASSETS + image} layout={"fill"} objectFit={`cover`}/>
                        </span>
                    })
                }

            </div>
            <div className={"flex-[11]"}>
                <span className={"block relative aspect-[2/3] h-[95vh]"}>
                    <Image src={WEBASSETS + images[selected]} layout={"fill"} objectFit={`cover`}/>
                </span>
            </div>
        </div>
    );
};

export default ImageSwitcher;