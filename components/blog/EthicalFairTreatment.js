
import SocialShare from "./SocialShare";
import Image from "next/image";
import React from "react";


function EthicalFairTreatment(props){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const mobileView = (
        <section className={`flex flex-col gap-y-5 font-cursive text-2xl my-10 mx-4`}>
            <p className={`text-2xl font-400 text-center`}>Ethical & Fair Treatment</p>
            {(props.main)
                ? <SocialShare isMobile={true}/>
                : null
            }
            <span className="block relative w-4/5 aspect-square self-center">
                <Image src={WEBASSETS + "/assets/images/ethical-fair_800.jpg"} layout={`fill`} objectFit={`cover`} alt="Ethical & Fair Treatment" />
            </span>
            <p>
                We know that it is our duty to not only serve our customers but also our people who craft pieces for you. The people who make the clothes are as important as the people who wear them. The craftsmen tirelessly cutting, sewing, stitching your clothes are the real heroes behind the scenes.
                </p>
                <p>
                    All our garments are made in-house in our workshop. These garments are carefully cut, stitched and finished by our in-house team of tailors. All our tailors are given monthly wages, healthcare benefits, and work in good working conditions. For example, the entire workshop is fully air-conditioned. The conditions our entire team works in is the same as that we would like to keep for ourselves.
                    </p>
                    <p>
                        We believe in Ethical & Fair trade Clothing and have an answer to the popular movement #WhoMadeMyClothes.
                        </p>
                        <p>
                            So the next time you are in a mall or tempted to buy something from an e-commerce site, ask yourself, why buy a garment which is probably made in a sweatshop when you can buy better quality, in-turn supporting your local community and being aware of #WhoMadeMyClothes?
            </p>
        </section>
    );
    const browserView = (
        <section className={`flex flex-col gap-y-5 font-cursive text-2xl my-10`}>
            <p className={`text-4xl font-600 text-center`}>Ethical & Fair Treatment</p>
            {(props.main)
                ? <SocialShare isMobile={false}/>
                : null
            }
            <span className="block relative w-4/5 aspect-square self-center">
                <Image src={WEBASSETS + "/assets/images/ethical-fair_800.jpg"} layout={`fill`} objectFit={`cover`} alt="Ethical & Fair Treatment" />
            </span>
            <p>
                We know that it is our duty to not only serve our customers but also our people who craft pieces for you. The people who make the clothes are as important as the people who wear them. The craftsmen tirelessly cutting, sewing, stitching your clothes are the real heroes behind the scenes.All our garments are made in-house in our workshop. These garments are carefully cut, stitched and finished by our in-house team of tailors. All our tailors are given monthly wages, healthcare benefits, and work in good working conditions. For example, the entire workshop is fully air-conditioned. The conditions our entire team works in is the same as that we would like to keep for ourselves.We believe in Ethical & Fair trade Clothing and have an answer to the popular movement #WhoMadeMyClothes.So the next time you are in a mall or tempted to buy something from an e-commerce site, ask yourself, why buy a garment which is probably made in a sweatshop when you can buy better quality, in-turn supporting your local community and being aware of #WhoMadeMyClothes?
            </p>
        </section>
    );

    return (props.isMobile)? mobileView : browserView;
}

export default EthicalFairTreatment;
