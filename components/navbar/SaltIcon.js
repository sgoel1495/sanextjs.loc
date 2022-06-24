import Link from "next/link";
import Image from "next/image";

/**
 * @todo @Sambhav style the icon for type b
 * @param {isMobile} props
 * @constructor
 */

function SaltIcon(props) {
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    let sizeClass, logo;
    switch (props.type) {
        case "shopMenu":
            sizeClass = "w-20 h-12"
            logo = "SALT_attire_logo.png"
            break;
        case "minimal":
            sizeClass = "w-20 h-12"
            logo = "SALT_logo.png"
            break;
        default:
            sizeClass = "w-24 h-16"
            logo = "SALT_attire_logo.png"
    }
    const mobileView = <div>
        <Link href="/" passHref>
            <span className={`block relative cursor-pointer ${sizeClass}`}>
                <Image
                    src={WEBASSETS + `/assets/images/${logo}`}
                    alt="salt icon"
                    layout={`fill`}
                    priority={true}
                    objectFit={`contain`}
                />
            </span>
        </Link>
    </div>;

    switch (props.type) {
        case "shopMenu":
            sizeClass = "h-12 w-24"
            logo = "SALT_logo.png"
            break;
        default:
            sizeClass = "w-6 h-6"
            logo = "salticon.png"
    }

    const browserView = (
        <span className={`relative ${sizeClass}`}>
            <Link href="/" passHref>
                <span className={`block relative cursor-pointer ${sizeClass}`}>
                    <Image
                        src={WEBASSETS + `/assets/images/${logo}`}
                        alt="salt icon"
                        layout={`fill`}
                        priority={true}
                        objectFit={`contain`}
                    />
                </span>
            </Link>
            {
                props.type ==="menu" && <div className={"w-full h-full bg-white absolute top-0"}/>
            }
        </span>
    );

    return (
        (props.isMobile) ? mobileView : browserView
    )

}

export default SaltIcon;
