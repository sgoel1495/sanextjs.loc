/**
 * @params {isMobile} props
 * @constructor
 */

function DesignBlock(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default DesignBlock;