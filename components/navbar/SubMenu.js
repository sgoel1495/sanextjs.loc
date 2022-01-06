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
      <li><Link href="/shop-scarves">Scarves</Link></li>
      <li><Link href="/shop-belts">Belts</Link></li>
      <li><Link href="/shop-jewellery">Jewellery</Link></li>
      <li><Link href="/shop-masks">Masks</Link></li>
    </ul>
  </div>


  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default SubMenu;