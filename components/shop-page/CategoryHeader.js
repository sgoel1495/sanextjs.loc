/**
 *
 * @param props has category
 * @returns {JSX.Element}
 * @constructor
 */

function CategoryHeader(props){
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;
    const category= props.category;

    return <div>
        <video autoplay="autoplay" muted>
            <source src={WEBASSETS + "/assets/videos/" + category + ".mp4"}
                    type="video/mp4"
                    poster={WEBASSETS + "/assets/videos/" + category + ".jpg"}
            />
            Your browser does not support video tag.
        </video>
        <div>{category.toUpperCase()}</div>
    </div>;
}
export default CategoryHeader;