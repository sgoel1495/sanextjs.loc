/**
 * @params {isMobile} props
 * @constructor
 */

function AboutSalt(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default AboutSalt;