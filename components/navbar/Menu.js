import Link from "next/link";
import SubMenu from "./SubMenu";

/**
 *
 * @param {isMobile} props
 * @constructor
 */

function Menu(props) {
  const mobileView = null;

  const browserView =
    <div>
      <ul>
        <li><Link href="/new-arrivals/all">New In</Link></li>
        <li><Link href="/looks">Looks</Link></li>
        <li><Link href="/shop-tops">Tops</Link></li>
        <li><Link href="/shop-sweaters">Sweaters</Link></li>
        <li><Link href="/shop-shirts">Shirts</Link></li>
        <li><Link href="/shop-tunics">Tunics</Link></li>
        <li><Link href="/shop-jumpsuits">Jumpsuits</Link></li>
        <li><Link href="/shop-shorts">Shorts</Link></li>
        <li><Link href="/shop-tailored-pants">Pants</Link></li>
        <li><Link href="/shop-tailored-skirts">Skirts</Link></li>
        <li><Link href="/shop-dresses">Dresses</Link></li>
        <li><Link href="/shop-outerwear">Outerwear</Link></li>
        <li><SubMenu isMobile={false} menu="accessories" /></li>
      </ul>
    </div>
  ;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default Menu;