import Link from "next/link";

/**
 * @params {isMobile, menu} props
 * @constructor
 */

function SubMenu(props){
  const mobileView = null;
  let browserView = null;

  if(!props.isMobile && props.menu=="accessories")
  browserView = <div>
    <ul className="accessories-class">
      <li><Link href="/shop-scarves"><a>Scarves</a></Link></li>
      <li><Link href="/shop-belts"><a>Belts</a></Link></li>
      <li><Link href="/shop-jewellery"><a>Jewellery</a></Link></li>
      <li><Link href="/shop-masks"><a>Masks</a></Link></li>
    </ul>
  </div>


  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default SubMenu;