
import SocialShare from "./SocialShare";
import Image from "next/image";

/**
 * @todo @Sambhav Css
 * @todo clicks on social and share
 * @param props have isMobile, main
 * @constructor
 */

function EthicalFairTreatment(props){
    const mobileView = null;
    const browserView = <div>
        <div>Ethical & Fair Treatment</div>
        {(props.main)
            ? <SocialShare isMobile={false}/>
            : null
        }
        <Image src={WEBASSETS + "/assets/images/ethical-fair_800.jpg"} width="300" height="300" alt="Ethical & Fair Treatment" />
        <p>
            We know that it is our duty to not only serve our customers but also our people who craft pieces for you. The people who make the clothes are as important as the people who wear them. The craftsmen tirelessly cutting, sewing, stitching your clothes are the real heroes behind the scenes.All our garments are made in-house in our workshop. These garments are carefully cut, stitched and finished by our in-house team of tailors. All our tailors are given monthly wages, healthcare benefits, and work in good working conditions. For example, the entire workshop is fully air-conditioned. The conditions our entire team works in is the same as that we would like to keep for ourselves.We believe in Ethical & Fair trade Clothing and have an answer to the popular movement #WhoMadeMyClothes.So the next time you are in a mall or tempted to buy something from an e-commerce site, ask yourself, why buy a garment which is probably made in a sweatshop when you can buy better quality, in-turn supporting your local community and being aware of #WhoMadeMyClothes?
        </p>
    </div>;

    return (props.isMobile)? mobileView : browserView;
}

export default EthicalFairTreatment;