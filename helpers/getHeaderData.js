/**
 *
 * @param url the url calling
 * @param id identify the page
 * @returns {{webDescription: string, webImage: string, webUrl: string, webTitle: string, webKeywords: string, webCanonical: string}}
 */

export default function getHeaderData(url, id) {
    const headerObject = {
        "webTitle": "Luxury Business Casuals & Formals - Dresses,Tops,Pants | Salt Attire",
        "webDescription": "SALT Attire brings to you the sharpest assortment of 9to9 clothing, formals and business casuals for women. We offer standard sizes &amp; tailored fits. The most loved brand by women, we offer premium quality, finish &amp; flattering fits.",
        "webKeywords": "Workwear For Women, Ladies Office-Wear, Ladies Workwear, Business Suits For Women, Formal Western Clothing For Women, Office Wear For Women, Business Attire For Women, Business Casual Clothes For Women, Women Formal Wear, Casual Clothes For Women, Formal Outfits For Women, Work Clothes For Women",
        "webCanonical": "https://saltattire.com",
        "webUrl": "https://saltattire.com/",
        "webImage": "https://saltattire.com/assets/videos/new_arrivals_christmas_v2.jpg"
    }

    let returnObject = null;

    switch (url){
        case "/":
            returnObject = {...headerObject};
            break;

        default:
            returnObject = {...headerObject};
            break;
    }

    return returnObject;

}
