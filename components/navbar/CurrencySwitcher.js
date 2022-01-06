/**
 * @params {isMobile} props
 * @constructor
 */

function CurrencySwitcher(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default CurrencySwitcher;