import Link from "next/link";
/**
 * This is a band just above the nav
 * @params none at this time
 */

function InfoBand() {

  return (
    <div id="info-band" className={"bg-[#F1FF26] text-center pt-1 pb-2 text-sm tracking-wide"}>
      <span>HOT DEAL : </span>
      <Link href="/end-of-season-sale">
        <a className={"underline"}>FLAT PRICES</a>
      </Link>
    </div>
  )

}

export default InfoBand;
