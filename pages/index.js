import {Fragment} from 'react';
import PageHead from '../components/PageHead';
import Link from 'next/link';
import Script from 'next/script';
import {
  mobileGlobalCss,
  customMobileGlobalCss,
  browserGlobalCss,
  commonGlobalCss
} from '../components/rootpage/styles.js';
import {initiateNavBar, openUserMenu} from '../helpers/homepage/library';
import ChangeCurrencyView from '../components/change-currency-view/ChangeCurrencyView';
import AppWideContext from "../store/AppWideContext";
import {useContext} from "react";
import InternationalStrip from "../components/international-strip/InternationalStrip";
import FestiveOffers from "../components/festive-offers/FestiveOffers";
import SearchButton from "../components/search-button/SearchButton";
import HomepageSirStyleV1 from "../components/rootPage/HomepageSirStyleV1";
import SidenavbarLight from "../components/sidenavbar-light/SidenavbarLight";


/**
 *
 */

function RootPage() {
  const ASSETSURL = process.env.NEXT_PUBLIC_ASSETSURL;

  const {dataStore} = useContext(AppWideContext);
  const isMobile = dataStore["@isMobile"];
  const internationalStrip = dataStore["@international_strip"];
  const hideClock = dataStore["@hide_clock"];

  console.log("internationstrip", internationalStrip);
  console.log("hideClock", hideClock);

  const mobileJs = `
        var click_nav = true;
        var click = false;

        function resume_state() {
            var btn = document.getElementsByName('submit-btn')[0];
            var loader = document.getElementsByClassName('query-loader')[0];
            btn.style.display = "unset";
            loader.className = "query-loader";
        }

        function navbar_visit() {
            // document.getElementById('blinking').classList.add("blinking");
            // document.getElementById('bling-img').classList.add("bling-img");
            document.getElementById('sidenav-salt').classList.add("zoom");
            document.getElementById('sonar-wave-animate').classList.add("sonar-wave");
            document.getElementById('sonar-wave-animate-inner').classList.add("sonar-wave-inner");
        }

        function initiate_nav_bar() {
            document.getElementById('slide-salt-nav').style.transform = 'translateX(-105%)';
            if (click_nav) {
                if (document.getElementById('slide-salt-nav').style.transform == 'translateX(-105%)') {
                    document.getElementById('slide-salt-nav').style.transform = 'translateX(0%)'
                    click = true;
                } else {
                    document.getElementById('slide-salt-nav').style.transform = 'translateX(-105%)'
                    click = false;
                }
            }
            document.getElementById('sidenav-salt').classList.remove("zoom");
            document.getElementById('sonar-wave-animate').classList.remove("sonar-wave");
            document.getElementById('sonar-wave-animate-inner').classList.remove("sonar-wave-inner");
        }

        window.onload = (function () {
            if (!sessionStorage.getItem('firstVisit')) {
                sessionStorage.setItem('firstVisit', '0');
            }

            if (!(sessionStorage.getItem('firstVisit') == "1")) {
                navbar_visit();
                sessionStorage.setItem('firstVisit', '1');
            }
            /*  setTimeout(function () {
                  document.getElementById('sidenav-salt').classList.add("mob_burgur_animation");
              }, 1000);
              setTimeout(function () {
                  document.getElementById('blinking').classList.add("blinking");
                  document.getElementById('sidenav-salt').classList.add("zoom");
                  document.getElementById('sonar-wave-animate').classList.add("sonar-wave");
                  document.getElementById('sonar-wave-animate-inner').classList.remove("sonar-wave-inner");


              }, 2000);*/
            setTimeout(function () {
                // document.getElementById('blinking').classList.remove("blinking");
                document.getElementById('sidenav-salt').classList.remove("zoom");
                document.getElementById('sonar-wave-animate').classList.remove("sonar-wave");
                document.getElementById('sonar-wave-animate-inner').classList.remove("sonar-wave-inner");
            }, 4000);
        });

        function shop_tab(str) {
            $('.toggle-button-li').removeClass('active_tab');
            $('.nav-tab').removeClass('active_detail');
            $('#' + str + '.toggle-button-li').addClass('active_tab');
            $('#' + str + '-tab.nav-tab').addClass('active_detail');
        };

        function signup_exclusive_user() {

            var email = document.getElementById('signup_email').value;
            if (email.length > 0) {
                $.ajax({
                    url: '/salt/add_exclusive_user',
                    method: 'post',
                    data: {email: email}
                }).then(function success(response) {
                    var data = response;
                    if (data["msg"] == "sign up successfull") {
                        hide_real_color();
                        Materialize.toast("Thank you for your interest.", 3000, 'blue');
                        $('#signup_email').val('');
                        show_real_color();
                    } else {
                        hide_real_color();
                        Materialize.toast(data["msg"], 3000, 'blue');
                        show_real_color();
                    }
                })

            } else {
                hide_real_color();
                Materialize.toast("Please enter your Email", 3000);
                show_real_color();
            }
        }

        function show_real_color() {
            setTimeout(function () {
                $('#material_css').html("");
            }, 3000);
        }

        function hide_real_color() {
            $('#material_css').append("<style>.toast{background-color: #ffffff!important;color:#000000!important;}</style>")
        }

        function contact_home_mob() {
            var btn = document.getElementsByName('submit-btn')[0];
            var loader = document.getElementsByClassName('query-loader')[0];
            btn.style.display = "none";
            loader.className = "query-loader show-query-loader";

            if (localStorage.hasOwnProperty("ngStorage-cart") && (localStorage.getItem("ngStorage-cart_count") > 0)) {
                // local_cart = $localStorage.cart;
                cart = localStorage.getItem("ngStorage-cart");
                // for(var item in local_cart) {
                //     cart = cart + local_cart[item]['id'] + ", " + local_cart[item]['size'] + ", " + local_cart[item]['qty'] + ", " ;
                // }
            } else {
                cart = "No Item In Cart";
            }
            var name = document.getElementsByName('contact_mob_name')[0].value;
            var email = document.getElementsByName('contact_mob_email')[0].value;
            var phone = document.getElementsByName('contact_mob_phone')[0].value;
            var msg = document.getElementsByName('contact_mob_msg')[0].value;
            var msg = msg + ", Cart : " + cart.toString();
            // var contactchoice = $('input[name="contact_choice_via"]:checked').val();
            if (name.length > 0) {
                if (email.length > 0) {
                    if (phone.length > 0) {
                        var phnrgx = /^[\\d + -]+$/;
                        if (phnrgx.test(phone)) {
                            if (msg.length > 0) {
                                var user_info = {
                                    name: name,
                                    email: email,
                                    contact: phone,
                                    // 'Contact me by: ' + contactchoice.toString() + ', ' +
                                    message: msg.toString(),
                                    from: "home footer"
                                }
                                $.ajax({
                                    url: "/salt/user_contact_us",
                                    method: "post",
                                    data: {salt: user_info}
                                }).then(function success(response) {
                                    var data = response;
                                    if (data["msg"] == "Submit") {
                                        Materialize.toast('Thank you for Contacting Us! We will get back to you shortly!', 3000, '');
                                        document.getElementsByName('contact_mob_name')[0].value = "";
                                        document.getElementsByName('contact_mob_email')[0].value = "";
                                        document.getElementsByName('contact_mob_phone')[0].value = "";
                                        document.getElementsByName('contact_mob_msg')[0].value = "";
                                        btn.style.display = "";
                                        loader.className = "query-loader";
                                    } else if (data["msg"] == "Not Submit Invalid") {
                                        Materialize.toast('Invalid name or email id', 3000, '');
                                        btn.style.display = "unset";
                                        loader.className = "query-loader";
                                    } else {
                                        Materialize.toast('Please Try Again', 3000, '');
                                        btn.style.display = "unset";
                                        loader.className = "query-loader";
                                    }
                                }, function error(response) {
                                    btn.style.display = "unset";
                                    loader.className = "query-loader";
                                })
                            } else {
                                Materialize.toast("Please enter your Message", 3000);
                                btn.style.display = "unset";
                                loader.className = "query-loader";
                            }
                        } else {
                            Materialize.toast("Please enter a valid Phone Number", 3000);
                            btn.style.display = "unset";
                            loader.className = "query-loader";
                        }
                    } else {
                        Materialize.toast("Please enter your Phone Number", 3000);
                        btn.style.display = "unset";
                        loader.className = "query-loader";
                    }
                } else {
                    Materialize.toast("Please enter your Email", 3000);
                    btn.style.display = "unset";
                    loader.className = "query-loader";
                }
            } else {
                Materialize.toast("Please enter your Name", 3000);
                btn.style.display = "unset";
                loader.className = "query-loader";
            }
        }

        function hide_mob_burger_menu() {
            if (click_nav) {
                if (document.getElementById('slide-salt-nav').style.transform == 'translateX(-105%)') {
                    document.getElementById('slide-salt-nav').style.transform = 'translateX(0%)'
                    click = true;
                } else {
                    document.getElementById('slide-salt-nav').style.transform = 'translateX(-105%)'
                    click = false;

                }
            } else {
                $('.button-collapse').sideNav('hide');
            }
        }

        function openUserMenu() {
            $('.button-collapse').sideNav('show');
            if ($('#islogin ul.collapsible li').hasClass('active')) {
            } else {
                $('#islogin ul.collapsible li a.collapsible-header').trigger('click');
            }
        }

        function check_user_visit() {
            if (window.localStorage.hasOwnProperty("ngStorage-user_visit")) {
                if (window.localStorage["ngStorage-user_visit"].toString().toLowerCase() == 'true') {
                } else {
                    // Materialize.toast("Hello", 5000, '');
                    // navbar_visit();
                    console.log('Hello');
                    window.localStorage["ngStorage-user_visit"] = true;
                }
            } else {
                // Materialize.toast("Hello", 5000, '');
                // navbar_visit();
                console.log('Hello');
                window.localStorage["ngStorage-user_visit"] = true;
            }
        }

        var user_privilege = false;

        function check_user_login() {
            if (window.localStorage.hasOwnProperty("ngStorage-cart_count")) {
                var cartcount = window.localStorage["ngStorage-cart_count"];
            } else {
                var cartcount = 0;
            }
            if (window.localStorage.hasOwnProperty("ngStorage-logined_user") && window.localStorage["ngStorage-logined_user"].length > 0) {
                var loginuseremail = window.localStorage["ngStorage-logined_user"];
                if (window.localStorage.hasOwnProperty("ngStorage-privilege")) {
                    if (window.localStorage["ngStorage-privilege"].toString().toLowerCase() == 'true') {
                        user_privilege = true;
                    } else {
                        user_privilege = false;
                    }
                } else {
                    var prev_params = {
                        email: '',
                        phone: ''
                    }
                    if (window.localStorage["ngStorage-logined_user"].toString().split('@').length > 1) {
                        prev_params['email'] = window.localStorage["ngStorage-logined_user"];
                    } else {
                        prev_params['phone'] = window.localStorage["ngStorage-logined_user"];
                    }
                    $.ajax({
                        url: '/users/check_users_privilege',
                        method: 'post',
                        data: {user_email_id: prev_params['email'], user_phone: prev_params['phone']}
                    }).then(function success(response) {
                        if (response.msg == 'success') {
                            user_privilege = true;
                            window.localStorage["ngStorage-privilege"] = true;
                        } else {
                            user_privilege = false;
                            window.localStorage["ngStorage-privilege"] = false;
                        }
                    });
                }

                var loginusername = window.localStorage["ngStorage-logined_username"];
                loginusername = loginusername.split(' ')[0].split('"').join('');
                if (window.localStorage.hasOwnProperty("ngStorage-cart")) {
                    var loginuseremail = window.localStorage["ngStorage-logined_user"].toString().split('"').join('');
                    var user_cart = {};
                    user_cart = JSON.parse(window.localStorage["ngStorage-cart"]);
                    var userdet = {
                        email: loginuseremail,
                        cart: user_cart
                    }
                    $.ajax({
                        url: '/users/update_login_Emailuser_cart',
                        method: 'post',
                        data: {user: userdet}
                    }).then(function success(response) {

                    });
                }
                if (window.localStorage.hasOwnProperty("ngStorage-login_via")) {
                    var logintype = window.localStorage["ngStorage-login_via"];
                    if (logintype == 'facebook') {
                        $('#loginweb').css({'display': 'none'});
                        $('#logingplus').css({'display': 'none'});
                        $('#loginfb').css({'display': 'block'});
                    } else if (logintype == 'googleplus') {
                        $('#loginweb').css({'display': 'none'});
                        $('#logingplus').css({'display': 'block'});
                        $('#loginfb').css({'display': 'none'});
                    } else {
                        $('#loginweb').css({'display': 'block'});
                        $('#logingplus').css({'display': 'none'});
                        $('#loginfb').css({'display': 'none'});
                    }
                } else {
                    $('#loginweb').css({'display': 'block'});
                    $('#logingplus').css({'display': 'none'});
                    $('#loginfb').css({'display': 'none'});
                }

                $('#islogin').css({'display': 'block'});
                $('#show-user-name-side').text(loginusername);
                $('#isloginnav').text(loginusername[0]);
                $('#isloginnav').css({'display': 'block'});
                $('#cart-count').text(cartcount);
                $('#navFavLink').attr('href','/users/favourites');
                $('#isnotlogin').css({'display': 'none'});
                $('#isnotloginnav').css({'display': 'none'});

            } else {
                $('#islogin').css({'display': 'none'});
                $('#isloginnav').css({'display': 'none'});
                $('#cart-count').text(cartcount);
                $('#navFavLink').attr('href','/homepage/signin')
                $('#isnotlogin').css({'display': 'inline-block'});
                $('#isnotloginnav').css({'display': 'unset'});
            }
        }

        function check_usd() {
            var currency;
            if(window.localStorage.hasOwnProperty("ngStorage-saltcurrency")){
                currency = JSON.parse(window.localStorage["ngStorage-saltcurrency"]);
            }else{
                currency = "inr";
                window.localStorage["ngStorage-saltcurrency"] = JSON.stringify(currency.toString().toLowerCase());
            }
            $('#' + currency + '-nav').addClass('active-curr-nav');
            $('#' + currency + '-nav-opt').addClass('active-curr');
        }

        function open_change_currency() {
            var disp = document.getElementById('curreny-option-nav-id');
            if (disp.style.display == 'block') {
                disp.style.display = 'none';
            } else {
                disp.style.display = 'block';
            }
        }

        function logout_user() {
            if (window.localStorage.hasOwnProperty("ngStorage-logined_user") && window.localStorage["ngStorage-logined_user"].length > 0) {

                delete window.localStorage["ngStorage-logined_user"];
                delete window.localStorage["ngStorage-privilege"];
                user_privilege = false;
                delete window.localStorage["ngStorage-logined_username"];
                delete window.localStorage["ngStorage-cart"];
                delete window.localStorage["ngStorage-login_via"];
                if (window.localStorage.hasOwnProperty("ngStorage-Gift_Reciver_Details")) {
                    delete window.localStorage["ngStorage-Gift_Reciver_Details"];
                }
                if (window.localStorage.hasOwnProperty("ngStorage-mySize")) {
                    delete window.localStorage["ngStorage-mySize"];
                }

                if (window.localStorage.hasOwnProperty("ngStorage-login_via")) {
                    delete window.localStorage["ngStorage-login_via"];
                }
                delete window.localStorage["ngStorage-iscartview"];

                window.localStorage["ngStorage-cart_count"] = 0;

                window.location.href = '/';
            } else {
                window.location.href = '/';
            }
        }

        function update_logs() {
            var previous_page = document.referrer;
            var current_page = window.location.href;
            var processing = "Visited " + current_page + " page";
            var user_log = {previous: previous_page, current: current_page, process: processing};
            $.ajax({
                url: '/users/user_flow_logs',
                method: 'post',
                data: {user: user_log}
            }).then()
            $.ajax({
                url: '/users/user_event_logs',
                method: 'post',
                data: {user: user_log}
            }).then()
        }

        window.addEventListener('load', function () {
            $('.button-collapse').sideNav();
            if (click) {
                $('.button-collapse').sideNav('show');
            }
            click_nav = false;
            check_user_login();
            if (user_privilege) {
                $('.prices').removeClass('active');
                $('.discount_prices').addClass('active');
            } else {
                $('.prices').addClass('active');
                $('.discount_prices').removeClass('active');
            }
            update_logs();
            check_usd();
            check_user_visit();
        });
        /*window.addEventListener('click',function(e){
            var id = e.path[0].id;
            if(id !='inr-nav' && id !='usd-nav'){
                $('#curreny-option-nav-id').css({'display':'none'});
            }
        });*/
      var hang_by = document.getElementById('hang-by-icons-div');
      var hang_this = document.getElementById('hang-this-icons-div');
      var window_scroll_top = 0;
      var currency = "";
      var add_scroll = 24;
      window.addEventListener('scroll', function () {
          if (window.localStorage.hasOwnProperty('ngStorage-saltcurrency') && currency == "") {
              currency = JSON.parse(window.localStorage['ngStorage-saltcurrency']);
              if (currency == 'usd') {
                  add_scroll = -4;
              }
          }
          window_scroll_top = window.pageYOffset;
          if (window_scroll_top >= (hang_by.offsetTop + add_scroll)) {
              if (hang_this.classList.contains('hang-add-to-bag-size')) {
              } else {
                  hang_this.classList.add('hang-add-to-bag-size');
              }
          }else{
              hang_this.classList.remove('hang-add-to-bag-size');
              hang_this.classList.remove('show_nav_clone');
          }
      })
      
      document.getElementById("close-black").addEventListener("click",hide_mob_burger_menu);
  `;

  const mobileHeaderView = <header>
    <div className="header-swiper-container price_c_inr" id="home-salt-header">
      <div className="swiper-wrapper festive_offer">
        {(internationalStrip)
          ? <InternationalStrip/>
          : (hideClock)
            ? <FestiveOffers/>
            : <div className="swiper-slide swiper-slide-img" data-index="2">
        <span className="header-tag">
          <span id="inr-title" className="price_c inr">
            <Link href="/salt/shipping-returns">6-10 day delivery</Link>
          </span>
          <span className="price_c usd">Free International Shipping For Orders Above $100</span>
        </span>
            </div>
        }
      </div>
    </div>
    {/*nav block */}
    <nav className="nav">
      <div className="center-div-v1">
        <Link href="/some">
          <a data-method="get">
            <img src={ASSETSURL + "/assets/images/SALT_attire_logo.png"} className="salt-logo" alt="logo"/>
          </a>
        </Link>
        <div className="left-div-v1">
          <ul className="rigth-ul new_right_ul">
            <ChangeCurrencyView pageFrom="home"/>
          </ul>
        </div>
      </div>
      <div className="center-div-v1">
        <span className="nav_bar_title">bespoke & custom clothing</span>
      </div>
      <div id="hang-this-icons-div" className="center-div-v1 hang-this-icons">
        <ul className="rigth-ul-v1">
          <li>
            {/* initiate_nav_bar() */}
            <div id="sidenav-salt" data-activates="slide-salt-nav"
                 className="button-collapse side-nav-img noSelect svg_icons_link"
                 onClick={initiateNavBar}>
              <div className="salt-menuicon sonar-emitter-v1">
                <div className="" id="sonar-wave-animate">
                </div>
                <div className="" id="sonar-wave-animate-inner">
                </div>
              </div>
            </div>
          </li>
          <li>
            <span id="isloginnav" className="user-name" onClick={openUserMenu}>
            <Link href="/homepage/signin">
              <a data-method="get" className="svg_icons_link noSelect">
                <img id="isnotloginnav" src={ASSETSURL + "/assets/images/user_icon.svg"} className="salt-user svg_icons"
                     alt="user"/>
              </a>
            </Link>
          </span>
          </li>
          <li>
            <Link href="/new-arrivals/all">
              <a data-method="get" className="svg_icons_link noSelect">
                <img id="" src={ASSETSURL + "/assets/images/new_icon.svg"} className="salt-user svg_icons" alt="new"/>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a id="navFavLink" data-method="get" className="svg_icons_link noSelect">
                <img src={ASSETSURL + "/assets/images/fav_icon.svg"} className="salt-user svg_icons" alt="fav"/>
              </a>
            </Link>
          </li>
          <li>
            {/*<%= render :partial => '/search/search_button', :locals => {:from_nav => 'home_new_v1'} %>*/}
            <SearchButton pageFrom="nav" isMobile={isMobile}/>
          </li>
          <li>
            <Link href="/homepage/cart">
              <a className="svg_icons_link noSelect tc102homepage" data-method="get">
                <img src={ASSETSURL + "/assets/images/cart_icon.svg"} className="salt-cart svg_icons" alt="cart"/>
                <sup className="cart_count" id="cart-count">0</sup>
              </a>
            </Link>
          </li>

        </ul>
      </div>
      <div className="hang-this-clone-div" id="hang-by-icons-div"/>
    </nav>
    {/*<%= render :partial => '/rootpage/homepage_sir_style_v1',
      :locals => {:trans_color_set => 'var(--white-two)', :color_set => 'var(--white-two)'} %> */}
    <HomepageSirStyleV1 />
  </header>;
  const mobileMainView = <main>
    <div>
      {/*<%= render :partial => '/layouts/sidenavbar_light' %>*/}
      <SidenavbarLight />
    </div>
  </main>;

  const browserView = null;

  return (
    <Fragment>
      <PageHead url="/" id="home" isMobile={isMobile}/>

      {isMobile && <Fragment>
        <Script async src={ASSETSURL + "/assets/javascripts/home_v0.2.min.js"}/>
        <style jsx global>{commonGlobalCss}</style>
        <style jsx global>{mobileGlobalCss}</style>
        <style jsx global>{customMobileGlobalCss}</style>
        <link rel="stylesheet" href={ASSETSURL + "/assets/stylesheets/swiper_min.css"}/>
        <script dangerouslySetInnerHTML={{
          __html: mobileJs
        }}
        />
        {mobileHeaderView}
        {mobileMainView}
        <h1>Mobile VIEW</h1>
      </Fragment>}
      {!isMobile && <Fragment>
        {/* if browser script */}
        <style jsx global>{commonGlobalCss}</style>
        <style jsx global>{browserGlobalCss}</style>
        {browserView}
        <h1>BROWSER VIEW</h1>
      </Fragment>}
    </Fragment>
  )
}


export default RootPage;
