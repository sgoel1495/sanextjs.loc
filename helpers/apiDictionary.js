/**
 *
 * @params word is the api dictionary word, apiToken is required to make calls, queryObject has special params as may be required
 * @returns {null}
 */
export const apiDictionary = (word, apiToken = "", queryObject = {}) => {
    const apiServer = "http://103.90.241.54:2023/api/v1";
    let url = apiServer;

    const headers = {
        'Accept': 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8'
    };
    let body = null;
    const getFetcher = {
        method: "GET",
        headers: headers
    };
    const postFetcher = {
        method: "POST",
        headers: headers,
        body: ""
    };
    let finalFetcher = null;

    switch (word) {
        case "getToken":
            url += "/get_authenticate_token";
            finalFetcher = {...getFetcher};
            break;

        case "getProducts":
            url += "/get_products";
            body = {
                product: {
                    token: apiToken,
                    category: queryObject.category,
                    skip: queryObject.skip || 0,
                    limit: queryObject.limit || 10
                }
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getProduct":
            url += "/get_product_by_id";
            body = {
                token: apiToken,
                product_id: queryObject.product_id
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getLooksData":
            url += "/get_looks_data";
            body = {
                token: apiToken,
                look_id: queryObject.look_id,
                skip: queryObject.skip || 0,
                limit: queryObject.limit || 10
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getTopStrip":
            url += "/home/get_homepage_top_strip";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getHomePageNewArrivals":
            url += "/get_home_page_new_arrivals";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "exploreNewArrivals":
            url += "/explore_new_arrivals";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "userLogin":
            url += "/login_user";
            body = {
                token: apiToken,
                contact: queryObject.username,
                password: queryObject.password,
                otp_login: queryObject.otp_login,

            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "userOTPLogin":
            url += "/login_by_otp";
            body = {
                token: apiToken,
                user: {
                    contact: queryObject.username,
                    otp: queryObject.otp
                }
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "userSignUp":
            url += "/create_new_user";
            body = {
                token: apiToken,
                user: {
                    user_name: queryObject.full_name,
                    email: queryObject.email,
                    password: queryObject.password,
                    phone_number: parseInt(queryObject.phone)
                },

            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "forgotPassword":
            url += "/reset_password";
            body = {
                token: apiToken,
                contact: queryObject.username,

            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "giftcards":
            url += "/giftcards/get_giftcards";
            finalFetcher = {...getFetcher}
            break;

        case "reviews":
            url += "/home/get_facebook_review";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "addExclusiveUser":
            url += "/salt/add_exclusive_user";
            body = {
                user: {
                    email: queryObject.email,
                    token: apiToken
                }
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getCategoryCircle":
            url += "/get_category_circle";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getMarketingData":
            url += "/get_marketing_data";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getLookSection":
            url += "/get_look_section";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getPreferencesData":
            url += "/get_preferences_data";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getMediaBuzz":
            url += "/get_home_page_media";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getHomePageCarousal":
            url += "/get_home_page_carousal";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "bookAppointmentMob":
            url += "/book_appointment_mob";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        default:
            url = null;
            break;
    }

    if (url == null || finalFetcher == null)
        return null;
    else
        return {
            url: url,
            fetcher: finalFetcher
        };
}

