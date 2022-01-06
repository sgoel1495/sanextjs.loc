/**
 * @params {isMobile} props
 * @constructor
 */

function UserLoginMenu(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default UserLoginMenu;