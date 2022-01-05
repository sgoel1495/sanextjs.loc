import Link from "next/link";
/**
 * This is a band just above the nav
 * @params none at this time
 */

function InfoBand() {

  return (
    <div id="info-band" className={"bg-[#F1FF26] text-center py-2"}>
      <span>HOT DEAL:</span>
      <Link href="/end-of-season-sale"><span className={"underline"}>FLAT PRICES</span></Link>
    </div>
  )

}

export default InfoBand;
