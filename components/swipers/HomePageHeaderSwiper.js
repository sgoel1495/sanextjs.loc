/**
 * @params {isMobile} props
 * @constructor
 */

function HomePageHeaderSwiper(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default HomePageHeaderSwiper;