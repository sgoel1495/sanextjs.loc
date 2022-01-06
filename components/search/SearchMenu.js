import Search from "./Search";

/**
 * @params {isMobile} props
 * @constructor
 */

function SearchMenu(props){
  const mobileView = null;

  const browserView =
    <Search isMobile={false} />;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default SearchMenu;