/**
 * @params {isMobile} props
 * @constructor
 */

function ShopByLooksSwiper(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default ShopByLooksSwiper;

