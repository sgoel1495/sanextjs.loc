import React from 'react';

const safteyData = [
    {
        image: "https://source.unsplash.com/random",
        title: "EVERYONE",
        titleDescription: "WEARS A MASK& GLOVES",
        blockDescription: "Our manufacturing facility is sanitized and fumigated twice daily to ensure a clean and healthy environment"
    },
    {
        image: "https://source.unsplash.com/random",
        title: "EVERYONE",
        titleDescription: "WEARS A MASK& GLOVES",
        blockDescription: "Our manufacturing facility is sanitized and fumigated twice daily to ensure a clean and healthy environment"
    },
    {
        image: "https://source.unsplash.com/random",
        title: "EVERYONE",
        titleDescription: "WEARS A MASK& GLOVES",
        blockDescription: "Our manufacturing facility is sanitized and fumigated twice daily to ensure a clean and healthy environment"
    },
    {
        image: "https://source.unsplash.com/random",
        title: "EVERYONE",
        titleDescription: "WEARS A MASK& GLOVES",
        blockDescription: "Our manufacturing facility is sanitized and fumigated twice daily to ensure a clean and healthy environment"
    },
    {
        image: "https://source.unsplash.com/random",
        title: "EVERYONE",
        titleDescription: "WEARS A MASK& GLOVES",
        blockDescription: "Our manufacturing facility is sanitized and fumigated twice daily to ensure a clean and healthy environment"
    }
]

function Homepage(props){
    return(
        <section className={"bg-[#FFFAF7] py-20"}>
            <div className={"container"}>
                <div className="text-center mb-10">
                    <h2 className="text-h2 font-600 text-red-600/75">YOUR SAFETY IS OUR PRIORITY</h2>
                    <h4 className="text-h4">Here's everything we are doing to ensure your safety.</h4>
                </div>
                <div className="data flex gap-5">
                    {safteyData.map((item,index) => {
                        return(
                            <div className={"flex flex-col items-center text-center"}>
                                <img src={item.image} alt="" className={"w-32 h-32 object-cover mx-auto mb-4"}/>
                                <h4 className={"text-h4 font-600"}>{item.title}</h4>
                                <h6 className={"text-h6"}>{item.titleDescription}</h6>
                                <p className="mt-4 text-sm">{item.blockDescription}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Homepage;
