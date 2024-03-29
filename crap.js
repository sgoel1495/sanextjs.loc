import ParallaxBlock from "./components/common/parallax";
import React from "react";
import {gsap} from "gsap";

<div className="modal-dialog modal-lg">
    <div className="modal-content" uib-modal-transclude="">

        <div className="modal-body ng-scope" id="modal-loginmodal">
            <span className="close-modal" ng-click="closemodel()" style="top:1px;font-size:45px"> <img
                src="/assets/images/close-black.png" alt="close-black" style="width:18px;margin-top:20px"> </span>
            <!-- ngIf: issignup -->
            <!-- ngIf: issignin -->
            <div ng-if="issignin" className="ng-scope">
                <div className="panel panel-default" style="">
                    <div className="panel-heading"
                         style="border:0;box-shadow:none;font-size:13px;background-color:transparent">
                        <h4><span
                            style="text-decoration:underline;text-transform: uppercase;font-size:13px;">Sign In</span><span
                            style="font-size:13px;"> |</span> <br className="hidden-lg hidden-md">
                            <span
                                style="cursor:pointer;display:inline;font-size:13px;text-transform: uppercase;color: #888888;"> <span
                                ng-click="changeForm('signup')"> Sign Up | </span> <span ng-click="changeForm('forgot')"
                                                                                         style="cursor:pointer;display:inline;font-size:13px;text-transform: uppercase;">Forgot Your Password?</span> <br
                                className="hidden-lg hidden-md"> </span>
                        </h4></div>
                    <div className="panel-body" style="padding-bottom:0">
                        <form role="form" id="form1" className="mb-lg ng-pristine ng-valid">
                            <div className="row col-md-12 text-left">
                                <div className="row">
                                    <div className="col-lg-3 col-md-3">
                                        <!--              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group has-feedback"><div class="form-control" >*******997</div></div>-->
                                        <div className="form-group has-feedback"><input type="text"
                                                                                        className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                                                                                        ng-model="SignInuser.bothtype"
                                                                                        placeholder="email/phone (required)">
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                        <div className="form-group has-feedback">
                                            <!-- ngIf: !viaOTP --><input ng-if="!viaOTP" type="password"
                                                                         id="SignInPassword"
                                                                         className="form-control ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                                                                         ng-model="SignInuser.password"
                                                                         placeholder="enter your password"><!-- end ngIf: !viaOTP -->
                                            <!-- ngIf: viaOTP -->
                                        </div>
                                    </div>
                                    <!--<div class="row">
                                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group has-feedback"><input class="form-control" ng-model="otp" placeholder="enter your OTP"></div>
                                    </div>-->
                                    <div className="col-lg-6 col-md-6 col-sm-10 col-xs-12 form-validate hidden-xs"
                                         id="signindiv" style="display:block">
                                        <div className="form-group has-feedback"
                                             style="white-space:nowrap;margin: 0px;">
                                            <ul style="padding-left:0;margin:1px 0;float: left;display: flex;width: 100%;">
                                                <li style="display:inline-block;padding:0 5px">
                                                    <div className="has-feedback text-center">
                                                        <button type="submit" id="sign-in-btn"
                                                                className="btn btn-black white-btn waves-effect waves-light"
                                                                style="margin:12px 1px!important;width:auto;display:inline-block;font-size:16px;background-color:#222;color:white;padding:6px 12px;text-transform: uppercase!important;"
                                                                ng-click="sign_in_user()">SIGN IN
                                                        </button>
                                                        <button
                                                            className="btn btn-black white-btn waves-effect waves-light"
                                                            id="otp-verify-btn" ng-click="verifyOTP(SignInuser.otp)"
                                                            style="margin-left: auto !important;margin-right: auto !important;display: none;margin:12px 1px!important;width:auto;font-size:16px;background-color:#222;color:white;padding:6px 12px;text-transform: uppercase!important;">Verify
                                                            OTP
                                                        </button>
                                                        <div className="loader-div hide" id="verify-loader-div"
                                                             style="float: left;padding: 0;max-width: 122px;">
                                                            <img src="/assets/images/loader.gif"
                                                                 style="width: 35%;margin-top: 8px;display: inline"
                                                                 alt="loading...." className="img-responsive">
                                                        </div>
                                                    </div>
                                                </li>
                                                <li style="display:inline-block;padding:0 5px">
                                                    <div className="text-center" style="float: left;">
                                                        <div style="padding: 20px 0;">OR</div>
                                                    </div>
                                                </li>
                                                <li style="display:inline-block;padding:0 5px">
                                                    <div className="has-feedback text-center">
                                                        <div className="loader-div" id="loader-div"
                                                             style="display: none;float: left;padding: 0;max-width: 177px;min-width: 127px;">
                                                            <img src="/assets/images/loader.gif"
                                                                 style="width: 24%;margin-top: 8px;display: inline"
                                                                 alt="loading...." className="img-responsive">
                                                        </div>
                                                        <button
                                                            className="btn btn-black white-btn waves-effect waves-light"
                                                            id="send-otp-btn"
                                                            style="margin-left: auto !important; margin-right: auto !important;margin:12px 1px!important;width:auto;display:inline-block;font-size:16px;background-color:#222;color:white;padding:6px 12px;text-transform: uppercase!important;"
                                                            ng-click="loginVaiOtp()">Login Using OTP
                                                        </button>
                                                    </div>
                                                </li>
                                                <!-- ngIf: issociallogin -->
                                                <li ng-if="issociallogin" style="display:inline-block;padding:0 5px"
                                                    className="ng-scope">
                                                    <button
                                                        style="display:inline-block;margin:5px 0!important;width:auto;padding:0!important"
                                                        className="btn btn-black white-btn waves-effect waves-light"
                                                        ng-hide="loginedfb" type="button" ng-click="fbLogin()">
                                                        <span className="col-xs-4"
                                                              style="width:35px;padding:10px 6px!important;border-right:0 solid #777"><img
                                                            src="/assets/images/fb-icon.png" alt="fb-icon"></span>
                                                        <span className="col-xs-8"
                                                              style="width:60px;padding:10.5px 5px!important;text-transform: uppercase!important;">Login</span>
                                                    </button>
                                                </li>
                                                <!-- end ngIf: issociallogin -->
                                                <li style="display:inline-block;padding:0 3px" ng-show="isfromcheckout"
                                                    className="ng-hide"> OR
                                                </li>
                                                <li style="display:inline-block;padding:0 5px" ng-show="isfromcheckout"
                                                    className="ng-hide">
                                                    <button type="submit"
                                                            className="btn btn-black white-btn waves-effect waves-light"
                                                            ng-click="guestCheckout()"
                                                            style="width:auto;font-size:16px;background-color:#222;color:white;padding:6px 12px;margin:10px 0!important;text-transform: uppercase!important;">
                                                        Guest Checkout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 hidden-xs" id="loader"
                                         style="display:none;padding-top:0;padding-left:35px">
                                        <img src="/assets/images/loader.gif" alt="loader" className="img-responsive"
                                             style="width:60px"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- end ngIf: issignin -->
            <!-- ngIf: isforgot -->
            <!--<div ng-if="ischange">-->
            <!--<div class="panel panel-default">-->
            <!--<div class="panel-heading" style="border:0;box-shadow:none;font-size:18px;background-color:transparent">-->
            <!--<h4>Change Password-->
            <!--<br class="hidden-lg hidden-md"/><span style="display:inline;font-size:15px"> <span ng-click="changeForm('signup')" style="cursor:pointer;display:inline;font-size:15px;text-transform: uppercase;"> Sign Up </span>| <span ng-click="changeForm('signin')" style="cursor:pointer;text-transform: uppercase;"> Sign In</span> </span>-->
            <!--</h4></div>-->
            <!--<div class="panel-body" style="padding-bottom:0">-->
            <!--<form role="form" id="form1" class="mb-lg">-->
            <!--<div class="row col-md-12">-->
            <!--<div class="row">-->
            <!--<div class="col-md-3 form-validate">-->
            <!--<div class="form-group has-feedback">-->
            <!--<input type="password" placeholder="Password *" autocomplete="off" required="" class="form-control" ng-model="validuser.password" style="border:1px solid lightgrey;border-radius:0">-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="col-md-3 form-validate">-->
            <!--<div class="form-group has-feedback">-->
            <!--<input type="password" placeholder="Confirm Password *" autocomplete="off" required="" class="form-control" ng-model="validuser.confirm_password" style="border:1px solid lightgrey;border-radius:0">-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="col-md-2 form-validate">-->
            <!--<div class="form-group has-feedback">-->
            <!--<input type="text" placeholder="OTP" autocomplete="off" required="" class="form-control" ng-model="validuser.otp" style="border:1px solid lightgrey;border-radius:0">-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="col-md-2 form-validate">-->
            <!--<div class="form-group has-feedback">-->
            <!--<button class="btn btn-black waves-effect waves-light" style="background-color:#222;color:white;margin-top:10px" ng-click="validateOTP();">Reset-->
            <!--Password-->
            <!--</button>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</form>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!-- ngIf: ischange -->
            <div className="modal-inner modal-success hidden"></div>
        </div>
    </div>
</div>

import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let GSAPBlock = React.useRef(null);
let GSAPBlockAnimation = React.useRef(null);

gsap.fromTo(
    GSAPBlock,
    {
            x: -GSAPBlock.offsetWidth
        },
        {
            scrollTrigger: {
                trigger: GSAPBlockAnimation,
                start: "bottom bottom",
                end: "center center",
                toggleActions: 'play none none reverse',
                scrub: true
            },
            x: 0
        },
    )

<div
    className={`bg-white p-5 w-2/5`}
    ref={el => {
        GSAPBlock = el
    }}
>
    <div
        className={`font-cursive italic font-600`}
        ref={el => {
            GSAPBlockAnimation = el
        }}
    >
        <p className={`text-h5 text-black/70`}>After looking through a few work-wear racks, she thinks</p>
        <p className={`text-h3`}>"These styles are not even qualified for work-wear."</p>
    </div>
</div>
