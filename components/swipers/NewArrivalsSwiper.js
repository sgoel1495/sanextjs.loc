/**
 * @params {isMobile} props
 * @constructor
 */

function NewArrivalsSwiper(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default NewArrivalsSwiper;