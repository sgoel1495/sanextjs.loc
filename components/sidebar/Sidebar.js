/**
 * @params {isMobile} props
 * @constructor
 */

function Sidebar(props){
  const mobileView = null;

  const browserView = null;

  return props.isMobile ? mobileView : browserView

}

export default Sidebar;