function return_item(id, item, type, reason) {
    return new Promise(function (resolve, reject) {
        var param = {
            orderid: id,
            itemat: item,
            reason: `${type.toUpperCase()}: ${reason}`,
            user: {orderid: id, itemat: item, reason: reason}
        }
        if (return_type == "return_bank") {
            param['refund_type'] = 'bank'
            param['bank_details'] = bank_details
            param['user']['refund_type'] = 'bank'
            param['user']['bank_details'] = bank_details
        }
        $.ajax({url: "/users/return_user_order", method: "post", data: param}).then(function success(response) {
            var data = response;
            if (data.msg == 'Order Returned') {
                resolve(true)
            } else if (data.msg == "Order Can't Be Returned") {
                resolve(false)
            } else {
                resolve(false)
            }
        })
    })
}

function sendMail(issue, order_id, user_details, extra) {
    return new Promise(function (resolve, reject) {
        if (issue != "" && user_details.email != "") {
            getUserDetails().then(function (res) {
                if (res.name.length > 0) {
                    user_details.name = res.name
                } else {
                    user_details.name = ""
                }
            });
            if (emailregex.test(user_details.email))
                user_details.email = user_details.email
            else
                user.contact = user_details.email
            var data = {
                id: id,
                issue: issue,
                order_id: order_id,
                user_details: user_details,
                extra: extra
            }
            $.ajax({url: "/help/check_issue", method: "post", data: data}).then(function success(response) {
                if (response.msg == "success") {
                    resolve(true)
                } else {
                    Materialize.toast(response.msg, 5000, '')
                    resolve(false)
                }
            })
        } else {
            resolve(false)
        }
    })
}

function get_order_status(order_id) {
    var data = user
    if (data.contact == "")
        data.contact = user.email
    data['tracking_params'] = {
        order_id: order_id,
        item_index: 0
    }
    return new Promise(function (resolve, reject) {
        $.ajax({url: '/users/get_tracking_info', method: 'post', data: data}).then(function success(res) {
            if (res.msg == "success") {
                // shubham sir line
                // last_status = res.track_info[Object.keys(res.track_info)[0]][Object.keys(res.track_info[Object.keys(res.track_info)[0]])[Object.keys(res.track_info[Object.keys(res.track_info)[0]]).length - 1]]
                // chandra sir line
                last_status = res.track_info[Object.keys(res.track_info)[Object.keys(res.track_info).length - 1]][Object.keys(res.track_info[Object.keys(res.track_info)[Object.keys(res.track_info).length - 1]])[Object.keys(res.track_info[Object.keys(res.track_info)[Object.keys(res.track_info).length - 1]]).length - 1]]
                // if (last_status.indexOf('@') > -1)
                //     last_status = last_status.split('@')[1]
                last_status = last_status.split('@').join(' ')
                if (last_status.indexOf('~') > -1) {
                    var shipping_text = last_status.split('~')[0]
                    var shipping_link = last_status.split('~')[1]
                    shipping_text = shipping_text.replace('Order Shipped', '');
                    last_status = shipping_text + `<a href="` + shipping_link + `" target="_blank" class=""> -` + res['shipping_details']['delivered_by'] + "-" + res['shipping_details']['tracking_id'] + `</a>`
                } else if (last_status.indexOf('Order Confirmed Thank You!') > -1) {
                    last_status = "Your order is being stitched."
                } else if (last_status.indexOf('Your return has been initiated.') > -1) {
                    last_status = "Your return has been initiated, it will be picked up shortly!"
                } else if (last_status.indexOf('Pickup has been scheduled for') > -1) {
                    last_status = last_status.replace('Pickup Scheduled', '');
                } else if (last_status.indexOf('Waiting for the garment') > -1) {
                    last_status = last_status.split('Waiting')[2]
                    last_status = "Waiting" + last_status;
                } else if (last_status.indexOf('Your item has been received. Your new size is being prepared and we will ship it out shortly') > -1) {
                    last_status = "We have received your item back and your new size is being prepared."
                } else if (last_status.indexOf('Item received at unit and is being examined') > -1) {
                    last_status = "Your item has been received at unit and is being examined."
                } else if (last_status.indexOf('We have credited the amount of') > -1) {
                    last_status = "We have received your item back and your refund has been processed."
                }
                resolve(last_status)
            } else {
                // resolve("Tracking information not found")
                resolve("Sorry! We don\'t find any order.")
            }
        })
    })
}

function get_order() {
    var data = user
    if (data.contact == "")
        data.contact = user.email
    return new Promise(function (resolve, reject) {
        $.ajax({url: '/users/get_orderhistory', method: 'post', data: data}).then(function success(res) {
            resolve(res)
        })
    })

}

function checkOtp(otp) {
    var otp = otp
    return new Promise(function (resolve, reject) {
        if (otpregex.test(otp)) {
            var data = {contact: user.contact, email: user.email, otp: otp, for: "Login"}
            $.ajax({
                url: "/order/verify_cod_otp",
                method: "post",
                data: data,
                async: false
            }).then(function success(response) {
                if (response.msg == "Matched")
                    resolve(true)
                else
                    resolve(false)
            });
        } else {
            resolve(false)
        }
    })

}

function check_login() {
    if (window.localStorage.hasOwnProperty("ngStorage-logined_user") && window.localStorage["ngStorage-logined_user"].length > 0) {
        user.email = window.localStorage["ngStorage-logined_user"].toString().split('"').join('');
        if (typeof window.localStorage["ngStorage-logined_username"] != 'undefined') user.name = window.localStorage["ngStorage-logined_username"].split('"').join()
        return true
    } else {
        return false
    }
}

function getUserDetails() {
    return new Promise(function (resolve, reject) {
        if (check_login()) {
            data = {email: "", contact: ""}
            if (emailregex.test(user.email))
                data.email = user.email
            else
                data.contact = user.email
            $.ajax({url: '/chat/getUserDetails', method: 'post', data: data}).then(function success(res) {
                if (res.msg == 'found') {
                    resolve({
                        msg: 'found',
                        data: {name: res.userdetails.name, email: res.userdetails.email, phone: res.userdetails.phone}
                    })
                } else {
                    resolve({msg: 'not found', data: {name: '', email: '', phone: ''}})
                }
            })
        } else {
            resolve({msg: 'not found', data: {name: '', email: '', phone: ''}})
        }
    })
}

function checkOrderId(issue, order_id, user_details) {
    if (issue != "" && regex_order_id.test(order_id) && user_details.email != "") {
        getUserDetails().then(function (res) {
            if (res.name.length > 0) {
                user_details.name = res.name
            } else {
                user_details.name = ""
            }
        });
        var data = {
            issue: issue,
            order_id: order_id,
            user_details: user_details
        }
        $.ajax({url: "/help/check_issue", method: "post", data: data}).then(function success(response) {
            if (response.msg == "success") {
                Materialize.toast("Successfully Submitted", 5000, '')
                showNext("ask-order-id", 'thankyou-msg', this)
            } else {
                Materialize.toast(response.msg, 5000, '')
            }
        })
    }
}

function validate(type, data) {
    if (type == "order_id") {
        var order_id = document.getElementById('contactUs_order_id').value
        if (regex_order_id.test(order_id)) {
            if (issue != "" && issue == "I want size exchange.")
                window.location = `/users/orderhistory?token=690771cba99b2b517edbaf7ae6fehghg-${order_id}&pop_up=exchange`
            else if (issue != "" && issue == "I want alteration.")
                window.location = `/users/orderhistory?token=690771cba99b2b517edbaf7ae6fehghg-${order_id}&pop_up=alteration`
            else if (issue != "" && issue == "I want to return.")
                window.location = `/users/orderhistory?token=690771cba99b2b517edbaf7ae6fehghg-${order_id}&pop_up=return_pop`
            else if (issue != "" && issue == "Pickup not done")
                sendMail(issue, order_id, user, {})
            else
                window.location = `/users/orderhistory?token=690771cba99b2b517edbaf7ae6fehghg-${order_id}`
        } else {
            botui.message.add({
                content: "Please enter valid order id"
            })
        }
    } else if (type == "call_schedule") {
        parse_date = new Date(data)
        if (data != "" && (parse_date.getHours() >= 10 && parse_date.getHours() < 19) && (parse_date.getMinutes() >= 0 && parse_date.getHours() <= 59)) {
            return true
        } else {
            botui.message.add({
                content: `Please enter time between 10am - 7pm`
            }).then(function (index) {
                botui.message.add({
                    type: 'html',
                    content: `<input type="datetime-local" id="schedule_call_time" value="${min_date}" min="${min_date}"/>`
                }).then(function (index) {
                    botui.action.button({
                        cssClass: 'bot-btn',
                        action:
                            [
                                {
                                    text: "Submit",
                                    value: 'submit'
                                },
                                {
                                    text: "Go Back to Main Menu",
                                    value: 'go_back'
                                }
                            ]
                    }).then(function (res, index) {
                        if (res.value == "submit") {
                            // send_chat_copy();
                            call_schedule = document.getElementById('schedule_call_time').value
                            botui.message.add({
                                human: true,
                                content: document.getElementById('schedule_call_time').value
                            }).then(function (index) {
                                botui.message.remove(index - 1)
                                botui.message.remove(index - 2)
                                botui.message.add({
                                    loading: true
                                }).then(function (index) {
                                    if (validate('call_schedule', call_schedule)) {
                                        botui.message.remove(index)
                                        sendMail("schedule a call", '', user, {date_time: call_schedule}).then(function (res) {
                                            if (res) {
                                                botui.message.add({
                                                    content: `Done! The customer care will call you on ${call_schedule}`
                                                }).then(function () {
                                                    send_chat_copy();
                                                    show_issues_opt('init_bot')
                                                })
                                            } else {
                                                botui.message.add({
                                                    content: `Please try again`
                                                }).then(function () {
                                                    show_issues_opt('init_bot')
                                                })
                                            }
                                        })
                                    } else {
                                        botui.message.update(index, {
                                            loading: false,
                                            content: `Invalid time!`
                                        })
                                    }
                                })

                            })
                        } else {
                            botui.message.add({
                                content: "go back",
                                sync: false
                            }).then(function (index) {
                                botui.message.remove(index)
                                botui.message.remove(index - 2)
                            })
                            show_issues_opt('yes_no_opt')
                        }
                    })
                })
            })
        }
    }
}

function login() {
    if (user.email != '')
        bothtype = user.email
    else
        bothtype = user.contact
    window.sessionStorage.setItem('openchat', true)
    return new Promise(function (resolve, reject) {
        if (typeof angular != "undefined") {
            angular.element(document.getElementById('LoginHomeCtrl')).scope().SignInuser = {
                phone: user.contact,
                email: user.email,
                password: '',
                bothtype: bothtype,
                otp: ''
            };
            angular.element(document.getElementById('LoginHomeCtrl')).scope().viaOTP = true;
            angular.element(document.getElementById('LoginHomeCtrl')).scope().sign_in_user();
            resolve(true);
        } else {
            var users_params = {contact: user.contact, password: "", viaOTP: true, user: {}};
            var Url = '/users/sign_in_user';
            if (user.email.length > 0) {
                users_params = {
                    email: user.email,
                    password: "",
                    viaOTP: true,
                    user: {email: user.email, password: ""}
                };
                Url = '/users/sign_in_Emailuser'
            } else {
                users_params = {
                    contact: user.contact,
                    password: "",
                    viaOTP: true,
                    user: {contact: user.contact, password: ""}
                };
            }

            $.ajax({url: Url, method: 'post', data: users_params}).then(function success(response) {
                data = response
                if (data.msg == 'Successfully Signin') {
                    if (user.email.length > 0) localStorage['ngStorage-logined_user'] = user.email; else localStorage['ngStorage-logined_user'] = user.contact;
                    localStorage['ngStorage-logined_username'] = data.username;
                    // Materialize.toast("Welcome " + data.username, 5000, '');
                    botui.message.add({
                        content: `Welcome ${data.username}`
                    })
                    location.reload();
                    resolve(true);
                }
            })
        }
    })

    // window.sessionStorage.setItem('redirect', JSON.stringify({url: '/help/support', issue: issue}))
    // window.sessionStorage.setItem('user', JSON.stringify(user))
    user = {
        email: user.email,
        contact: user.contact
    }
}

function disable_date() {
    var dateToday = new Date();
    dta = $('#schedule_call_time'),
        def_value = dta[0].defaultValue;
    curr_value = dta[0].value;
    if (curr_value != "") {
        if ((new Date(curr_value).getDate() <= dateToday.getDate()) || (new Date(curr_value).getMonth() < dateToday.getMonth()) || (new Date(curr_value).getFullYear() < dateToday.getFullYear())) {
            $('#schedule_call_time').val(def_value.toString());
        } else {
            $('#schedule_call_time').val(curr_value.toString());
        }
    } else {
        $('#schedule_call_time').val(def_value.toString());
    }
}
