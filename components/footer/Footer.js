/**
 * @params {isMobile} props
 * @constructor
 */

function Footer(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default Footer;