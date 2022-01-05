import Link from "next/link";
/**
 * This is a band just above the nav
 * @params none at this time
 */

function InfoBand() {

  return (
    <div id="info-band">
      <span>HOT DEAL</span>
      <Link href="/end-of-season-sale">FLAT PRICES</Link>
    </div>
  )

}

export default InfoBand;