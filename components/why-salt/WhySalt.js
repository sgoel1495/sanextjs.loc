/**
 * @params {isMobile} props
 * @constructor
 */
import {Fragment} from "react";
import Link from "next/link";

function WhySalt(props) {
  const mobileView = null;

  const browserView = <Fragment>
      <div id="why-salt">
        <Link href="/salt/about-us/why-salt"><a>
          <div>
            <div>Why</div>
            <div>Salt</div>
            <div>?</div>
          </div>
          <div>
            <div>Elegant</div>
            <div>Thoughtful</div>
            <div>&amp; Classy</div>
            <div>Clothing from desk to dinner</div>
          </div>
        </a>
        </Link>
      </div>
    </Fragment>;

  return (
    (props.isMobile) ? mobileView : browserView
  )

}

export default WhySalt;