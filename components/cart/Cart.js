/**
 * @params {isMobile} props
 * @constructor
 */

function Cart(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default Cart;