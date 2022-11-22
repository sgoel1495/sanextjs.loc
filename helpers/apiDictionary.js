/**
 *
 * @params word is the api dictionary word, apiToken is required to make calls, queryObject has special params as may be required
 * @returns {null}
 */
export const apiDictionary = (word, apiToken = "", queryObject = {}) => {
    const apiServer = "http://216.48.180.99:8443/api/v1";
    let url = apiServer;

    const headers = {
        'Accept': 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8'
    };

    const formDataHeaders = {
        'Accept': 'application/json; charset=UTF-8',
        'Content-Type': 'multipart/form-data; charset=UTF-8'
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
    const formDataFetcher = {
        method: "POST",
        body: ""
    };

    let finalFetcher = null;

    switch (word) {
        case "getToken":
            url += "/get_authenticate_token";
            finalFetcher = {...getFetcher};
            break;

        //------------------------PRODUCTS
        case "getProducts":
            url += "/get_products";
            body = {
                product: {
                    token: apiToken,
                    ...queryObject
                }
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getProduct":
            url += "/get_product_by_id";
            body = {
                token: apiToken,
                ...queryObject
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

        //------------------------General
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

        case "datedNewArrivals":
            url += "/get_new_items_by_date";
            body = {
                ...queryObject,
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getSaleItems":
            url += "/sale/get_sale_items";
            body = {
                ...queryObject,
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;


        //------------------------USER
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
                ...queryObject,
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "validateOTP":
            url += "/validate_forgot_OTP";
            body = {
                token: apiToken,
                contact: queryObject.username,

            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "userServe":
            url += "/user_serve";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "updateUserDetails":
            url += "/users/update_user_details"
            body = {
                token: apiToken,
                ...queryObject
            }
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

        case "getHomePageMenu":
            url += "/get_home_page_menu";
            body = {
                home: {
                    token: apiToken
                }
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

        //===================== WALLET
        case "userWallet":
            url += "/get_user_wallet";
            body = {
                token: apiToken,
                user: {...queryObject}
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //===================== FAVORITES
        case "addToFav":
            url += "/add_to_fav";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "removeFromFav":
            url += "/remove_from_fav";
            body = {
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //===================== Addresses
        case "userAddresses":
            url += "/get_address_book";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "addAddressBook":
            url += "/add_address_book";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "removeAddressBook":
            url += "/remove_address_book";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "updateAddressBook":
            url += "/update_address_book";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getDefaultAddress":
            url += "/get_default_address";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //===================== Measurements
        case "userMeasurements":
            url += "/get_measurment_profile";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "addMeasurements":
            url += "/add_measurment_profile";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "removeMeasurements":
            url += "/remove_measurment_profile";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "updateMeasurements":
            url += "/update_measurment_profile";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "cityByZipcode":
            url += "/users/get_city_by_zipcode";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //====================== MIMOTO
        case "getMimotoCollection":
            url += "/get_mimoto_collection";
            body = {
                mimoto: {
                    token: apiToken,
                    skip: 0,
                    limit: 100
                }

            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getMimotoProducts":
            url += "/get_mimoto_products";
            body = {
                mimoto: {
                    token: apiToken,
                    ...queryObject
                }
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //====================== CART
        //same link for adding tailored and non tailored
        case "addToCart":
            url += "/add_to_cart";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getCart":
            url += "/get_cart";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "updateCart":
            url += "/update_cart";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "removeCart":
            url += "/remove_from_cart";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //====================== ORDERS
        case "userOrderHistory":
            url += "/get_user_orderhistory";
            body = {
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getOrderSummary":
            url += "/checkout/get_order_summary";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "measurmentForReview":
            url += "/checkout/add_measurment_for_review";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;



        //====================== INSTAGRAM
        case "instagramToken":
            url += "/get_instagram_token";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //====================== Address for Delivery
        case "deliveryAddress":
            url += "/checkout/address_for_delivery";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //====================== COUPON
        case "applyCoupon":
            url += "/checkout/apply_coupon_code";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //====================== CC/DC Payment
        case "savePayment":
            url += "/checkout/save_payment_details";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;
        case "saveFinalPayment":
            url += "/checkout/save_final_payment_details";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //====================== COD Payment
        case "codCheckout":
            url += "/checkout";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "codOtp":
            url += "/checkout/send_otp_for_cod";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "verifyOtp":
            url += "/checkout/verify_otp_for_cod";
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        //========================== NOTIFY

        case "notifyMe":
            url += "/notify_user";
            formDataFetcher.body = queryObject;
            finalFetcher = {...formDataFetcher}
            break;

        //========================== NOTIFY

        case "search":
            url += "/get_search_view";
            formDataFetcher.body = queryObject;
            finalFetcher = {...formDataFetcher}
            break;

        case "checkGiftAmount":
            url += "/check_gift_amount"
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case  "addGiftToCart":
            url += "/giftcards/add_giftcard_to_cart"
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case  "redeemVoucher":
            url += "/users/redeem_voucher"
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;
        case  "saveRating":
            url += "/save_rating_review"
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;
        case  "getRating":
            url += "/get_rating_review_data"
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;
        case  "editShippingAddress":
            url += "/editshippingaddress"
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;
        case  "cancelOrder":
            url += "/cancel_user_order"
            body = {
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;
        case  "getTrackingInfo":
            url += "/get_tracking_info"
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case  "askStylist":
            url += "/askstylist"
            body = {
                token: apiToken,
                ...queryObject
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case  "privilegedUser":
            url += "/check_users_privilege"
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

