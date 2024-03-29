function appSettings(key){
    const defData = {
        "uncut_count" : 0,
        "new_asset_path" : "",
        "hide_cod_opt" : false,
        "show_color_group" : false,
        "optinmonster" : true,
        "hide_sale" : true,
        "is_new_home" : true,
        "show_razorpay_option" : false,
        "multi_currency" : true,
        "show_change_currency_option" : true,
        "main_js_ctrls" : true,
        "promo_disc_for_strip" : "30%",
        "promo_name_for_strip" : "BIG DIWALI SALE!",
        "promo_info" : true,
        "new_navbar" : true,
        "promo_code_new_nav_margin_top" : "-75px",
        "promo_code_strip_margin_top" : "25px",
        "promo_code_new_navbar_margin_top" : "-75px",
        "promo_code_strip_margin_top_navbar" : "25px",
        "promo_code_for_strip" : "SALTSTAR",
        "checkout_pop_color" : "repeating-linear-gradient(45deg, #f5b839 0 10px, #f5b839 0 23px, #f5b839 0px 32px , #f5b839 0px 45px)",
        "offer_font_color" : "#000000",
        "offer_bg_color" : "repeating-linear-gradient(45deg, #ffffff 0 10px, #fee3ca 0 23px, #ffffff 0px 32px , #caf5c6 0px 45px)",
        "offer_border_color" : "#fee3ca",
        "promo_strip_font_color" : "#000000",
        "promo_strip_color_1" : "#f5b839",
        "promo_strip_color_2" : "#f5b839",
        "promo_strip_color_3" : "#f5b839",
        "promo_strip_color_4" : "#f5b839",
        "salt_sale_timer" : "03/08/2021",
        "salt_time_now" : "Date.today.strftime('%m/%d/%Y').to_s",
        "promo_name_for_promo_info" : "Save More!",
        "promo_code_for_promo_info" : "CART20",
        "strip_sale" : "Hash.new",
        "strip_sale['multi_discount']" : false,
        "strip_sale['two_discount']" : true,
        "strip_sale['strip_visible']" : false,
        "strip_sale['check_database']" : true,
        "category_nav" : "2px",
        "category_full_nav" : "2px",
        "cod_handling" : "80",
        "currencies": ["inr","usd"],
        "currency_data":{
            "inr" : {
                "shipping_int" : "100",
                "offer_shipping" : "1000",
                "ex_rate" : "1.000",
                "curr_symbol" : "₹"
            },
            "usd" : {
                "shipping_int" : "25",
                "offer_shipping" : "150",
                "ex_rate" : "0.015",
                "curr_symbol" : "$"
            },
        },
        "inr_symbol" : "<i class='fa fa-inr' style='margin-right: -1px;'></i>",
        "star_symbol" : "<i class='fa fa-star' aria-hidden=true style='margin-right: -1px;'></i>",
        "inr_symbol_img" : "<img src='https://saltattire.com/assets/ruppe_img.png' alt='Rs' style='width: 10px;margin-right: -3px;' />",
        "new_arrival_color" : "#b5ddf5",
        "truncate_length" : "14",
        "instagram_token" : "",
        "snow_effect" : false,
        "is_live" : true,
        "sequence_limit" : "30",
        "solr_path" : "'http://103.90.241.57:2022'",
        "userOrder" : "Hash.new",
        "orders" : "[]",
        "international_strip": false
    };

    return defData.hasOwnProperty(key) ? defData[key]:"";
}

export default appSettings;

