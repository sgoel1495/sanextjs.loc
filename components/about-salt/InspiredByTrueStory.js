/**
 * @todo @Sambhav css pls
 * @param props
 * @returns {null|JSX.Element}
 * @constructor
 */

function InspiredByTrueStory(props) {
    const mobileView = null;
    const browserView = <div>
        <div>
            Inspired by a true story !
        </div>
    </div>;

    return props.isMobile ? mobileView : browserView

}

export default InspiredByTrueStory;