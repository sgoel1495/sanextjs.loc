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
        <li><Link href="/new-arrivals/all"><a>New In</a></Link></li>
        <li><Link href="/looks"><a>Looks</a></Link></li>
        <li><Link href="/shop-tops"><a>Tops</a></Link></li>
        <li><Link href="/shop-sweaters"><a>Sweaters</a></Link></li>
        <li><Link href="/shop-shirts"><a>Shirts</a></Link></li>
        <li><Link href="/shop-tunics"><a>Tunics</a></Link></li>
        <li><Link href="/shop-jumpsuits"><a>Jumpsuits</a></Link></li>
        <li><Link href="/shop-shorts"><a>Shorts</a></Link></li>
        <li><Link href="/shop-tailored-pants"><a>Pants</a></Link></li>
        <li><Link href="/shop-tailored-skirts"><a>Skirts</a></Link></li>
        <li><Link href="/shop-dresses"><a>Dresses</a></Link></li>
        <li><Link href="/shop-outerwear"><a>Outerwear</a></Link></li>
        <li><SubMenu isMobile={false} menu="accessories" /></li>
      </ul>
    </div>
  ;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default Menu;