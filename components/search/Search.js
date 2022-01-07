/**
 * @params {isMobile} props
 * @constructor
 */

function Search(props){
  const mobileView = null;

  const browserView = null;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default Search;