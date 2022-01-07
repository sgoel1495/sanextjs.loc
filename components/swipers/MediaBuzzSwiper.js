/**
 * @params {isMobile} props
 * @constructor
 */

function MediaBuzzSwiper(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default MediaBuzzSwiper;