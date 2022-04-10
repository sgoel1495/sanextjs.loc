import Link from "next/link";
import React, {useContext} from "react";
import AppWideContext from "../../store/AppWideContext";
import useApiCall from "../../hooks/useApiCall";

/**
 * This is a band just above the nav
 * @params none at this time
 */

function InfoBand() {

    const {dataStore} = useContext(AppWideContext);
    const resp = useApiCall("getTopStrip", dataStore.apiToken);

    if (resp && resp['homepage_top_strip'] && (resp['homepage_top_strip'].length > 0) && (resp['homepage_top_strip'][0]['strips'].length > 0))
        return (
            <div id="info-band" className={`text-center pt-1 pb-2 text-sm tracking-wide`} style={{background: resp['homepage_top_strip'][0]['bg_color_code']}}>
                <Link href={resp['homepage_top_strip'][0]['strips'][0]['href']} passHref>
                    <span style={{color: resp['homepage_top_strip'][0]['text_color_code']}}>
                        {resp['homepage_top_strip'][0]['strips'][0]['text']}
                    </span>
                </Link>
            </div>
        )
    else
        return <></>

}

export default InfoBand;
