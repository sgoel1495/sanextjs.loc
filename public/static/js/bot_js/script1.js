var regex_order_id = new RegExp(/^\d{12,14}$/);
var emailregex = new RegExp(/\w+@[a-zA-Z_]+?(\.[a-zA-Z]{2,3})*\.[a-zA-Z]{2,3}$/);
var phnregex = new RegExp(/\d{10,15}/);
var otpregex = new RegExp(/^\d{4}$/);

var botui = new BotUI('my-botui-app');
var chat_initiated = false
var item_index = 0
var loader_index = -1
var order_id = ""
var id = ""
var selected_issue_init = ""
var return_type = ""
var user_orders = {}
var user = {
    name: "",
    email: "",
    contact: ""
}
var bank_details = {
    name: "",
    bank_name: "",
    account: "",
    ifsc: "",
    ac_type: ""
}
var contact_us_form = {
    name: "",
    email: "",
    phone: "",
    message: ""
}
var chat_shown = {
    min: 0,
    max: 0,
    range: 15,
    load_more_index: 0
}
var userchat = []
window.addEventListener('load', function () {
    if (sessionStorage.hasOwnProperty('openchat') && JSON.parse(sessionStorage.getItem('openchat'))) {
        document.getElementById('my-botui-app').style.display = 'block';
        initiate_bot();
        window.sessionStorage.setItem('openchat', false)
    }
    check_login();
})

document.getElementById('my-botui-app-btn').addEventListener('click', function () {
    document.getElementById('my-botui-app').style.display = 'block';
    initiate_bot()
});
/*document.getElementById('refresh-btn').addEventListener('click', function () {
botui.message.removeAll()
initiate_bot();
});*/
document.getElementById('close-chat-btn').addEventListener('click', function () {
    close_chat_bot();
});

function close_chat_bot() {
    // botui.message.removeAll()
    document.getElementById('my-botui-app').style.display = 'none';
}

function initiate_bot() {

    var prom = new Promise(function (resolve, reject) {
        resolve(get_chat())
    }).then(function (prev_chat) {
        if (typeof prev_chat != "string" && Array.isArray(prev_chat) && prev_chat.length > 0) {
            userchat = prev_chat
            chat_shown.max = prev_chat.length
            chat_shown.min = prev_chat.length
            if (chat_shown.min >= chat_shown.range && !chat_initiated) {
                botui.message.add({
                    type: 'html',
                    content: `<span id="load-more-btn" onclick="loadMore(userchat)">Load more</span>`
                }).then(function (index) {
                    chat_shown.load_more_index = index
                    document.getElementsByClassName('botui-message')[index].firstChild.firstElementChild.classList.add('load-more')
                })
            }
            if (!chat_initiated) {
                loadMore(prev_chat)
                chat_initiated = true
                show_issues_opt('init_bot')
            }
        } else {
            start_chat();
            chat_initiated = true
        }
    })
}

function limited_chat(start_index, end_index, chat) {
    if (start_index - chat_shown.range >= 0)
        chat_shown.min = start_index - chat_shown.range
    else
        chat_shown.min = 0
    return chat.slice(chat_shown.min, end_index)
}

function loadMore(chat) {
    botui.message.removeAll()
    var show_only = limited_chat(chat_shown.min, chat_shown.max, chat)
    if (chat_shown.min > 0) {
        botui.message.add({
            type: 'html',
            content: `<span id="load-more-btn" onclick="loadMore(userchat)">Load more</span>`
        }).then(function (index) {
            chat_shown.load_more_index = index
            document.getElementsByClassName('botui-message')[index].firstChild.firstElementChild.classList.add('load-more')
        })
    }
    show_only.forEach(function (e) {
        if (e.by == 'human')
            human = true
        else
            human = false
        botui.message.add({
            human: human,
            content: e.msg,
            sync: false
        });
    })

    //show last chat time stamp
    botui.message.add({
        type: 'html',
        content: `<hr><span id="last-timestamp">${moment(chat[chat.length - 1].datetime.split(' +0530')[0], "YYYY-MM-DD  HH:mm:ss +HHmm").fromNow()}</span><hr>`
    }).then(function (index) {
        document.getElementsByClassName('botui-message')[index].firstChild.firstElementChild.classList.add('last-timestamp')
    })

    if (chat_initiated) {
        show_issues_opt('init_bot')
        setTimeout(function () {
            document.getElementsByClassName("botui-container")[0].scrollTop = 0
        }, 1)
    }

}

function start_chat() {
    var chat = chat
    var prom = new Promise(function (resolve, reject) {
        resolve(check_prev_chat())
    }).then(function (res) {
            var promise = new Promise(function (resolve, reject) {
                if (check_login() && user.name != "") {
                    var name = ` ${user.name}`
                    botui.message.add({
                        content: `Hi!`
                    });
                    resolve(res.value)
                } else {
                    botui.message.add({
                        content: `Hi!`
                    });
                    resolve('')
                    /* botui.message.add({
                         content: 'Whats your name?'
                     }).then(function () {
                         document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
                         document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
                         setTimeout(function () {
                             var b = document.querySelectorAll('input.botui-actions-text-input')[0];
                             b.setAttribute("onkeyup", `changeIcon(this,event)`);
                             b.setAttribute("onfocus", `changeIcon(this,event)`);
                             b.nextElementSibling.addEventListener('click', function () {
                                 goBackOrNot(this)
                             })
                         }, 1000);
                         botui.action.text({
                             cssClass: 'email-phn-input',
                             action: {
                                 placeholder: 'Your name',
                                 button: {
                                     icon: 'arrow-left',
                                     label: ''
                                 }
                             }
                         }).then(function (res) {
                             document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
                             document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
                             user.name = res.value
                             resolve(res.value)
                         })
                     })*/
                }
            })
            promise.then(function (res) {
                botui.message.add({
                    content: 'How Can I Help You Today?'
                }).then(function () {
                    show_issues_opt('init_bot');
                })
            })

        }
    )
}

function show_issues_opt(call_for) {
    if (call_for != 'init_bot' && call_for != 'yes_no_opt') {
        botui.message.add({
            human: true,
            content: 'Go Back to Main Menu'
        }).then(function (index) {
            botui.message.remove(index - 1)
        })
    }
    botui.message.add({
        type: 'html',
        delay: 1000,
        content: '<ul class="issues-ul">' +
            '<li class="issue" onclick="javascript:issue_with(\'track_order\',this)">Track My Order / Alter</li>' +
            '<li class="opt-separator"></li>' +
            '<li class="issue" onclick="javascript:issue_with(\'return_refund\',this)">Alteration / Exchange / Return My Order</li>' +
            '<li class="opt-separator"></li>' +
            '<li class="issue" onclick="javascript:issue_with(\'change_order_details\',this)">Change My Order Details (Size/Delivery/Shipping Address)</li>' +
            '<li class="opt-separator"></li>' +
            '<li class="issue" onclick="javascript:issue_with(\'other\',this)">Other</li>' +
            '<li class="opt-separator"></li>' +
            '<li class="issue" onclick="javascript:issue_with(\'just_browsing\',this)">Nothing Just Browsing</li>' +
            // '<li class="issue" onclick="javascript:schedule_call()">Schedule a Call with a Customer Care Executive</li>' +
            '</ul>'
    });
}

function not_valid(type) {
    document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
    document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
    if (type == 'order_id') {
        setTimeout(function () {
            var b = document.querySelectorAll('input.botui-actions-text-input')[0];
            b.setAttribute("onkeyup", `changeIcon(this,event)`);
            b.setAttribute("onfocus", `changeIcon(this,event)`);
            b.nextElementSibling.addEventListener('click', function () {
                goBackOrNot(this)
            })
        }, 1000);
        botui.action.text({
            cssClass: 'email-phn-input',
            action: {
                placeholder: "order id",
                button: {
                    icon: 'arrow-left',
                    label: ''
                }
            }
        }).then(function (res) {
            document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
            document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
            if (res && regex_order_id.test(res.value)) {
                botui.message.add({
                    content: "Hold on a second..fetching your order details"
                });
                order_id = res.value
                return new Promise(function (resolve, reject) {
                    resolve(get_order())
                }).then(function (orders) {
                    if (orders.hasOwnProperty('Orders') && Object.keys(orders.Orders).length > 0 && Object.keys(orders.Orders).indexOf(order_id) > -1) {
                        user_orders = orders.Orders
                        if (selected_issue_init == "return_refund") {
                            botui.message.add({
                                content: 'Which Item In this Order do you want to return?'
                            });
                            show_order_items(order_id, orders, return_prod)
                        } else if (selected_issue_init == "change_order_details") {
                            show_change_opt(order_id);
                        } else {
                            get_order_status(order_id).then(function (status) {
                                botui.message.add({
                                    loading: true,
                                    delay: 1000,
                                    content: status,
                                    type: 'html'
                                });
                            }).then(function () {
                                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat']);
                            })
                        }
                    } else {
                        botui.message.add({
                            content: "Sorry! we could not find your order"
                        }).then(function () {
                            show_issues_opt('init_bot');
                        })
                    }
                })
            } else {
                botui.message.add({
                    content: "Please enter valid order id"
                })
                not_valid('order_id')
            }
        });
    } else if (type == 'email_id') {
        setTimeout(function () {
            var b = document.querySelectorAll('input.botui-actions-text-input')[0];
            b.setAttribute("onkeyup", `changeIcon(this,event)`);
            b.setAttribute("onfocus", `changeIcon(this,event)`);
            b.nextElementSibling.addEventListener('click', function () {
                goBackOrNot(this)
            })
        }, 1000);
        botui.action.text({
            cssClass: 'email-phn-input',
            action: {
                placeholder: "email id or phone",
                button: {
                    icon: 'arrow-left',
                    label: ''
                }
            }
        }).then(function (res) {
            document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
            document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
            if (res && (emailregex.test(res.value) || phnregex.test(res.value))) {
                if (emailregex.test(res.value))
                    user.email = res.value.toLowerCase()
                else
                    user.contact = res.value

                var data = {contact: user.contact, email: user.email, for: "Login", send_first_time: true}
                $.ajax({url: "/order/resend_otp", method: "post", data: data}).then(function success(response) {
                    if (response.msg == "Send") {
                        user.contact = response.contact
                        botui.message.add({
                            loading: true,
                            delay: 1000,
                            content: 'We have sent an OTP on your email & phone no.'
                        }).then(function () {
                            not_valid('otp')
                        })
                    } else {
                        botui.message.add({
                            content: "Please enter valid email id or phone"
                        })
                        not_valid('email_id')
                    }
                });
            } else {
                botui.message.add({
                    content: "Please enter valid email id or phone"
                })
                not_valid('email_id')
            }
        });
    } else if (type == 'otp') {
        setTimeout(function () {
            var b = document.querySelectorAll('input.botui-actions-text-input')[0];
            b.setAttribute("onkeyup", `changeIcon(this,event)`);
            b.setAttribute("onfocus", `changeIcon(this,event)`);
            b.nextElementSibling.addEventListener('click', function () {
                goBackOrNot(this)
            })
        }, 1000);
        botui.action.text({
            cssClass: 'email-phn-input',
            action: {
                placeholder: 'OTP',
                button: {
                    icon: 'arrow-left',
                    label: ''
                }
            }
        }).then(function (res) {
            document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
            document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
            checkOtp(res.value).then(function (res) {
                if (res) {
                    login(res).then(function () {
                        return new Promise(function (resolve, reject) {
                            resolve(get_order())
                        }).then(function (orders) {
                            user_orders = orders.Orders
                            ask_order_id(orders)
                        })
                    });
                } else {
                    botui.message.add({
                        content: "Please enter valid OTP"
                    })
                    not_valid('otp')
                }
            })

        })
    }
}

function ask_order_id(orders) {
    if (orders.hasOwnProperty('Orders') && Object.keys(orders.Orders).length > 0) {
        last_ord_id = orders.Orders[Object.keys(orders.Orders)[0]].id
        botui.message.add({
            content: 'Are you asking about your last order?'
        }).then(function () {
            botui.message.remove(loader_index - 1)
            loader_index = -1
            botui.message.add({
                // delay: 1000,
                content: `${last_ord_id}`
            })
        }).then(function () {
            botui.action.button({
                cssClass: 'bot-btn',
                action:
                    [
                        {
                            text: "Yes",
                            value: true
                        },
                        {
                            text: "No",
                            value: false
                        },
                        {
                            text: "Go Back to Main Menu",
                            value: 'go_back'
                        }
                    ]
            }).then(function (res) {
                if (res.value && res.value != 'go_back') {
                    botui.message.add({
                        content: "Hold on a second..fetching your order details"
                    });
                    if (selected_issue_init == "return_refund") {
                        ord_status = orders['Orders'][last_ord_id]['orderstatus'].toString().toLowerCase();
                        is_promo = orders['Orders'][last_ord_id]['have_promo_discount'];
                        if (is_promo) {
                            // if (ord_status == "dispatched" || ord_status == "delivered") {
                            if (ord_status == "delivered") {
                                botui.message.add({
                                    content: 'Which Item In this Order do you want to return?'
                                });
                                show_order_items(last_ord_id, orders, return_prod)
                            } else if (ord_status == "return initiated" || ord_status == "alteration initiated" || ord_status == "exchange initiated") {
                                botui.message.add({
                                    content: 'This order cannot be returned because it\'s already in return state!'
                                });
                                show_anything_else(['show_issues_opt', 'end_of_chat']);
                            } else if (ord_status == "order confirmed" || ord_status == "preparing for dispatch" || ord_status == "pending dispatch" || ord_status == "exchange confirmed" || ord_status == "alteration confirmed") {
                                botui.message.add({
                                    content: 'This order cannot be returned because it\'s not delivered to you yet!'
                                });
                                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                            } else if (ord_status == "refund processed") {
                                botui.message.add({
                                    content: 'Refund is being processed.'
                                });
                                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                            } else if (ord_status == "") {
                                botui.message.add({
                                    content: 'Sorry! can\'t process return for this order.'
                                });
                                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                            } else {
                                botui.message.add({
                                    content: 'This order cannot be returned!',
                                });
                                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                            }
                        } else {
                            botui.message.add({
                                content: 'Sorry! can\'t process return for this order.',
                            });
                            show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                        }
                    } else if (selected_issue_init == "change_order_details") {
                        show_change_opt(last_ord_id);
                    } else {
                        get_order_status(last_ord_id).then(function (status) {
                            botui.message.add({
                                loading: true,
                                delay: 1000,
                                content: status,
                                type: 'html'
                            });
                        }).then(function () {
                            show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat']);
                        })
                    }
                } else if (!res.value) {
                    botui.message.add({
                        content: "Please provide order id."
                    }).then(function () {
                        document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
                        document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
                        setTimeout(function () {
                            var b = document.querySelectorAll('input.botui-actions-text-input')[0];
                            b.setAttribute("onkeyup", `changeIcon(this,event)`);
                            b.setAttribute("onfocus", `changeIcon(this,event)`);
                            b.nextElementSibling.addEventListener('click', function () {
                                goBackOrNot(this)
                            })
                        }, 1000);
                        return botui.action.text({
                            cssClass: 'email-phn-input',
                            action: {
                                placeholder: 'order id',
                                button: {
                                    icon: 'arrow-left',
                                    label: ''
                                }
                            }
                        }).then(function (res) {
                            document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
                            document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
                            if (regex_order_id.test(res.value)) {
                                botui.message.add({
                                    content: "Hold on a second..fetching your order details"
                                });
                                order_id = res.value
                                if (Object.keys(orders.Orders).indexOf(order_id) > -1) {
                                    if (selected_issue_init == "return_refund") {
                                        ord_status = orders['Orders'][order_id]['orderstatus'].toString().toLowerCase();
                                        is_promo = orders['Orders'][order_id]['have_promo_discount'];
                                        if (is_promo) {
                                            // if (ord_status == "dispatched" || ord_status == "delivered") {
                                            if (ord_status == "delivered") {
                                                botui.message.add({
                                                    content: 'Which Item In this Order do you want to return?'
                                                });
                                                show_order_items(last_ord_id, orders, return_prod)
                                            } else if (ord_status == "return initiated" || ord_status == "alteration initiated" || ord_status == "exchange initiated") {
                                                botui.message.add({
                                                    content: 'This order cannot be returned because it\'s already in return state!'
                                                });
                                                show_anything_else(['show_issues_opt', 'end_of_chat']);
                                            } else if (ord_status == "order confirmed" || ord_status == "preparing for dispatch" || ord_status == "pending dispatch" || ord_status == "exchange confirmed" || ord_status == "alteration confirmed") {
                                                botui.message.add({
                                                    content: 'This order cannot be returned because it\'s not delivered to you yet!'
                                                });
                                                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                                            } else if (ord_status == "refund processed") {
                                                botui.message.add({
                                                    content: 'Refund is being processed.'
                                                });
                                                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                                            } else if (ord_status == "") {
                                                botui.message.add({
                                                    content: 'Sorry! can\'t process return for this order.'
                                                });
                                                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                                            } else {
                                                botui.message.add({
                                                    content: 'Sorry! can\'t process return for this order.',
                                                });
                                                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                                            }
                                        } else {
                                            botui.message.add({
                                                content: 'Sorry! can\'t process return for this order.',
                                            });
                                            show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat', 'hide']);
                                        }
                                    } else if (selected_issue_init == "change_order_details") {
                                        show_change_opt(order_id);
                                    } else {
                                        get_order_status(order_id).then(function (status) {
                                            botui.message.add({
                                                loading: true,
                                                delay: 1000,
                                                content: status,
                                                type: 'html'
                                            });
                                        }).then(function () {
                                            show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat']);
                                        })
                                    }
                                } else {
                                    botui.message.add({
                                        content: "Please enter valid order id"
                                    })
                                    not_valid('order_id')
                                }
                            } else {
                                botui.message.add({
                                    content: "Please enter valid order id"
                                })
                                not_valid('order_id')
                            }
                        })
                    })
                } else {
                    show_issues_opt('yes_no_opt')
                }
            })
        })
    } else {
        botui.message.remove(loader_index - 1)
        botui.message.add({
            content: "Sorry! we could not find your order"
        }).then(function () {
            show_issues_opt('init_bot');
        })
    }
}

/* Do here */
function ask_for_login() {
    botui.message.add({
        content: 'Enter your email/phone?'
    }).then(function () {
        botui.message.remove(loader_index - 1)
        loader_index = -1
        document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
        document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'

        setTimeout(function () {
            var b = document.querySelectorAll('input.botui-actions-text-input')[0];
            b.setAttribute("onkeyup", `changeIcon(this,event)`);
            b.setAttribute("onfocus", `changeIcon(this,event)`);
            b.nextElementSibling.addEventListener('click', function () {
                goBackOrNot(this)
            })
        }, 1000);
        return botui.action.text({
            cssClass: 'email-phn-input',
            action: {
                placeholder: 'email id or phone',
                button: {
                    icon: 'arrow-left',
                    label: ''
                }
            }
        })
    }).then(function (res) {
        document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
        document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
        if (res && (emailregex.test(res.value) || phnregex.test(res.value))) {
            if (emailregex.test(res.value))
                user.email = res.value.toLowerCase()
            else
                user.contact = res.value
            botui.message.add({
                loading: true,
            }).then(function (index) {
                var data = {contact: user.contact, email: user.email, for: "Login", send_first_time: true}
                $.ajax({url: "/order/resend_otp", method: "post", data: data}).then(function success(response) {
                    if (response.msg == "Send") {
                        botui.message.remove(index)
                        botui.message.add({
                            content: 'We have sent an OTP on your email & phone no.'
                        })
                        user.contact = response.contact
                        not_valid('otp')
                    } else {
                        botui.message.remove(index)
                        botui.message.add({
                            content: "Please enter valid email id or phone"
                        })
                        not_valid('email_id')
                    }
                });
            })
        } else {
            botui.message.add({
                content: "Please enter valid email id or phone"
            })
            not_valid('email_id')
        }
    })
}

function goBackOrNot(elem) {
    if (elem.firstElementChild.classList.contains('fa-arrow-left')) {
        botui.action.hide();
        document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
        show_issues_opt('');
    }
}

function changeIcon(elem, event) {
    if (elem.value != "") {
        elem.nextElementSibling.firstElementChild.classList.add('fa-send')
        elem.nextElementSibling.firstElementChild.classList.remove('fa-arrow-left')
        // elem.nextElementSibling.firstElementChild.classList.remove('fa-arrow-left')
    } else {
        elem.nextElementSibling.firstElementChild.classList.remove('fa-send')
        elem.nextElementSibling.firstElementChild.classList.add('fa-arrow-left')
    }
}

function ask_bank_details() {
    return new Promise(function (resolve, reject) {
        if (false && return_type == "return_bank" && user_orders[order_id].paymentmode == "COD") {
            botui.message.add({
                loading: true,
                delay: 1000,
                content: 'Sure. One last thing, since your payment was COD, we will need your bank account details to initiate the refund'
            })
            botui.message.add({
                delay: 2000,
                content: 'Enter Your Bank Details Below'
            })
            botui.message.add({
                type: 'html',
                delay: 2000,
                content: `<form name="bank_details" id="bank_details_form">` +
                    `<input type="text" id="beneficiary_name" placeholder="Beneficiary Name" required/></br>` +
                    `<input type="text" id="bank_name" placeholder="Bank Name" required/></br>` +
                    `<input type="text" id="account_no" placeholder="Account No" required/></br>` +
                    `<input type="text" id="ifsc_code" placeholder="IFSC Code" required/></<br>` +
                    `<input type="text" id="ac_type" placeholder="Account Type" required/></form>`
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
                        bank_details.name = document.getElementById('beneficiary_name').value
                        bank_details.bank_name = document.getElementById('bank_name').value
                        bank_details.account = document.getElementById('account_no').value
                        bank_details.ifsc = document.getElementById('ifsc_code').value
                        bank_details.ac_type = document.getElementById('ac_type').value
                        if (bank_details.name != '' && bank_details.bank_name != '' && bank_details.account != '' && bank_details.ifsc != "" && bank_details.ac_type != "") {
                            botui.message.add({
                                cssClass: 'line-break-wo-tag',
                                human: true,
                                content: `${bank_details.name}&#10;` +
                                    `${bank_details.bank_name}&#10;` +
                                    `${bank_details.account}&#10;` +
                                    `${bank_details.ifsc}&#10;` +
                                    `${bank_details.ac_type}`

                            }).then(function (index) {
                                botui.message.remove(index - 1)
                                botui.message.remove(index - 2)
                                send_chat_copy();
                                resolve(true)
                            })
                        } else {
                            resolve(false)
                        }
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
        } else {
            resolve(true)
        }
    })
}

function show_change_opt(id) {
    order_id = id
    botui.message.add({
        loading: true,
        delay: 1000,
        content: 'What Changes Do you need in this Order?'
    })
    botui.message.add({
        type: 'html',
        delay: 1000,
        content: '<ul class="issues-ul">' +
            '<li class="issue" onclick="javascript:init_changes(\'need_early\', order_id,this)">Need it early! I\'m traveling</li>' +
            '<li class="opt-separator"></li>' +
            '<li class="issue" onclick="javascript:init_changes(\'change_measurements\', order_id,this)">Need to Change My Size/Measurements</li>' +
            '<li class="opt-separator"></li>' +
            '<li class="issue" onclick="javascript:init_changes(\'change_address\', order_id,this)">Need to Change My Shipping Address</li>' +
            '<li class="opt-separator"></li>' +
            '<li class="issue" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
            '</ul>'
    });
}

function change_measurement(id, index, elem) {
    order_id = id
    item_index = index
    if (user_orders[order_id].order[item_index].Size.indexOf('T') > -1)
        size = "Tailored"
    else
        size = user_orders[order_id].order[item_index].Size
    botui.message.add({
        human: true,
        content: `${user_orders[order_id].order[item_index].Name} - ${size}`
    }).then(function (index) {
        botui.message.remove(index - 1)
    }).then(function () {
        if (size == "Tailored") {
            measurement = user_orders[order_id].order[item_index].Measurement
            botui.message.add({
                content: 'These are your current measurements.'
            })
            botui.message.add({
                cssClass: 'line-break-wo-tag',
                content: `Bust: ${measurement.bust}, Waist: ${measurement.waist}, Hips: ${measurement.hips}&#10;` +
                    `Biceps: ${measurement.biceps}, Length: ${measurement.length}, Shoulder: ${measurement.shoulder}`
            })
        } else {
            botui.message.add({
                type: 'html',
                content: `This is your current size <b>${size}</b>`
            })
        }
        botui.message.add({
            content: 'Enter the updated measurements/size'
        })
        document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
        document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
        setTimeout(function () {
            var b = document.querySelectorAll('input.botui-actions-text-input')[0];
            b.setAttribute("onkeyup", `changeIcon(this,event)`);
            b.setAttribute("onfocus", `changeIcon(this,event)`);
            b.nextElementSibling.addEventListener('click', function () {
                goBackOrNot(this)
            })
        }, 1000);
        botui.action.text({
            cssClass: 'email-phn-input',
            action: {
                placeholder: "enter measurements",
                button: {
                    icon: 'arrow-left',
                    label: ''
                }
            }

        }).then(function (res) {
            document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
            document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
            sendMail("change measurements", order_id, user, {
                measurements: res.value,
                item_name: user_orders[order_id].order[item_index].Name,
                item_index: item_index
            }).then(function (res) {
                if (res) {
                    botui.message.add({
                        loading: true,
                        delay: 1000,
                        content: 'Your Details Have Been Saved!'
                    }).then(function () {
                        show_anything_else(['show_issues_opt', 'end_of_chat']);
                    })
                } else {
                    botui.message.add({
                        content: `Please try again`
                    }).then(function () {
                        show_issues_opt('init_bot')
                    })
                }
            })
        })
    })
}

function show_order_items(order_id, orders, show_for) {
    var data_swiper = '';
    run_func = show_for
    if (orders.Orders.hasOwnProperty(order_id)) {
        build_html = ``
        var item_count = 0;
        orders.Orders[order_id]['order'].forEach(function (item, index) {
            ord_status = item.OrdStatus.toString().toLowerCase();
            is_returned = item.returned;
            is_sale = item.is_sale;
            if (item.Size.indexOf('T') > -1)
                is_tailored = true
            else
                is_tailored = false

            // if (ord_status != "order confirmed" && ord_status != "preparing for dispatch" && ord_status != "pending dispatch" && ord_status != "exchange confirmed" && ord_status != "alteration confirmed" && ord_status != "return initiated" && ord_status != "alteration initiated" && ord_status != "exchange initiated") {
            if (!is_sale && !is_returned && !is_tailored && ord_status != "order confirmed" && ord_status != "preparing for dispatch" && ord_status != "pending dispatch" && ord_status != "exchange confirmed" && ord_status != "alteration confirmed" && ord_status != "return initiated" && ord_status != "alteration initiated" && ord_status != "exchange initiated") {
                item_count = item_count + 1;
                if (item.Size.indexOf('T') > -1)
                    size = "Tailored"
                else
                    size = item.Size
                build_html += `<div class="swiper-slide items-images" data-index="${index}" style="background-image: url('/assets/${item.asset_id}/thumb.jpg'); cursor: pointer;" onclick="javascript:run_func(${order_id}, ${index},this)">
                                <span>${item.Name}</span></div>`
            }
        })
        if (item_count > 0) {
            botui.message.add({
                cssClass: 'show-item',
                type: 'html',
                delay: 1000,
                content: `<div style="width: 100%">
                <div class="data-bot-swiper-container">
                    <div class="swiper-wrapper">${build_html}</div>
                    <div class="swiper-pagination"></div>
                </div></div>`
            }).then(function () {
                data_swiper = new Swiper('.data-bot-swiper-container', {
                    slidesPerView: 2.45,
                    spaceBetween: 1,
                });
                // if (orders.Orders[order_id]['order'].length == 1)
                if (parseInt(item_count) == 1)
                    document.getElementsByClassName('items-images')[0].style.padding = '70% 0px'
            })
        } else {
            botui.message.add({
                content: 'Sorry, No eligible item found to be return!'
            }).then(function () {
                show_issues_opt('init_bot');
            })
        }

    }
}

function return_prod(id, index, elem) {
    order_id = id
    item_index = index
    if (user_orders[order_id].order[item_index].Size.indexOf('T') > -1)
        size = "Tailored"
    else
        size = user_orders[order_id].order[item_index].Size
    botui.message.add({
        human: true,
        content: `${user_orders[order_id].order[item_index].Name} - ${size}`
    }).then(function (index) {
        botui.message.remove(index - 1)
    }).then(function () {
        botui.message.add({
            loading: true,
            delay: 1000,
            content: 'Got it! Would you like to ?'
        })
    }).then(function () {
        if (size.toString().toLowerCase() == "tailored") {
            if (user_orders[order_id].promo_code.toString().toLowerCase() == "happyholi" || user_orders[order_id].promo_code.toString().toLowerCase() == "paydaysale" || user_orders[order_id].promo_code.toString().toLowerCase() == "saltmom" || user_orders[order_id].promo_code.toString().toLowerCase() == "supersummer") {
                botui.message.add({
                    type: 'html',
                    delay: 1000,
                    content: '<ul class="issues-ul">' +
                        '<li class="issue" onclick="javascript:init_return(\'alteration\', order_id, item_index,this)">Alter the Item</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:init_return(\'received_wrong_item\', order_id, item_index,this)">Received a Wrong Item</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
                        '</ul>'
                });
            } else if (user_orders[order_id].promo_code.toString().toLowerCase() == "happinesssale" || user_orders[order_id].promo_code.toString().toLowerCase() == "supersalt" || user_orders[order_id].promo_code.toString().toLowerCase() == "freedom") {
                botui.message.add({
                    type: 'html',
                    delay: 1000,
                    content: '<ul class="issues-ul">' +
                        '<li class="issue" onclick="javascript:init_return(\'alteration\', order_id, item_index,this)">Alter the Item</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
                        '</ul>'
                })
            } else {
                botui.message.add({
                    type: 'html',
                    delay: 1000,
                    content: '<ul class="issues-ul">' +
                        '<li class="issue" onclick="javascript:init_return(\'exchange\', order_id, item_index,this)">Exchange the Size</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:init_return(\'alteration\', order_id, item_index,this)">Alter the Item</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:init_return(\'received_wrong_item\', order_id, item_index,this)">Received a Wrong Item</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
                        '</ul>'
                });
            }
        } else {
            if (user_orders[order_id].promo_code.toString().toLowerCase() == "happyholi" || user_orders[order_id].promo_code.toString().toLowerCase() == "paydaysale" || user_orders[order_id].promo_code.toString().toLowerCase() == "saltmom" || user_orders[order_id].promo_code.toString().toLowerCase() == "supersummer") {
                botui.message.add({
                    type: 'html',
                    delay: 1000,
                    content: '<ul class="issues-ul">' +
                        '<li class="issue" onclick="javascript:init_return(\'exchange\', order_id, item_index,this)">Exchange the Size</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:init_return(\'return_store_credit\', order_id, item_index,this)">Return for a Store Credit</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:init_return(\'received_wrong_item\', order_id, item_index,this)">Received a Wrong Item</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
                        '</ul>'
                });
            } else if (user_orders[order_id].promo_code.toString().toLowerCase() == "happinesssale" || user_orders[order_id].promo_code.toString().toLowerCase() == "supersalt" || user_orders[order_id].promo_code.toString().toLowerCase() == "freedom") {
                botui.message.add({
                    type: 'html',
                    delay: 1000,
                    content: '<ul class="issues-ul">' +
                        '<li class="issue" onclick="javascript:init_return(\'exchange\', order_id, item_index,this)">Exchange the Size</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
                        '</ul>'
                })
            } else {
                botui.message.add({
                    type: 'html',
                    delay: 1000,
                    content: '<ul class="issues-ul">' +
                        '<li class="issue" onclick="javascript:init_return(\'exchange\', order_id, item_index,this)">Exchange the Size</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:init_return(\'alteration\', order_id, item_index,this)">Alter the Item</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:init_return(\'return_store_credit\', order_id, item_index,this)">Return for a Store Credit</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:init_return(\'return_bank\', order_id, item_index,this)">Return for a Bank Refund</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:init_return(\'received_wrong_item\', order_id, item_index,this)">Received a Wrong Item</li>' +
                        '<li class="opt-separator"></li>' +
                        '<li class="issue" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
                        '</ul>'
                });
            }
        }

    })
}

function successfully_init_return() {
    botui.message.add({
        content: 'Done! Your Return Has Been Initiated.'
    }).then(function (index) {
        botui.message.remove(index - 1)
    })
    if (return_type.toString().toLowerCase() == "alteration") {
        botui.message.add({
            content: "Received your details. Someone from our team will call you if needed."
        }).then(function () {
            botui.message.add({
                content: 'Your order will be picked up within 1-2 days. We will send you your tracking details. Alteration will be done once we receive your item back.'
            }).then(function () {
                show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat']);
            })
        })
    } else if (return_type.toString().toLowerCase() == "exchange") {
        botui.message.add({
            content: 'Your order will be picked up within 1-2 days. We will send you your tracking details. The New Size will be sent to you once we receive your item back and do a quality check.'
        }).then(function () {
            show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat']);
        })
    } else {
        botui.message.add({
            content: 'Your order will be picked up within 1-2 days. We will send you your tracking details. Refund will be processed to you once we receive your item back and do a quality check.'
        }).then(function () {
            show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat']);
        })
    }
}

function return_reason(return_reason, id, index, elem) {
    order_id = id
    item_index = index
    var user_return_reason = `RETURN: ${elem.innerText}`
    botui.message.add({
        human: true,
        content: elem.innerText
    }).then(function (index) {
        botui.message.remove(index - 1)
    });

    if (return_reason == 'not_fit') {
        botui.message.add({
            delay: 1000,
            content: 'Oh No! We are sorry about this!'
        })
        botui.message.add({
            loading: true,
            delay: 2000,
            loading: true,
            content: 'We can definitely fix this! Please tell us what went wrong with the fit?'
        }).then(function () {
            document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
            document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
            setTimeout(function () {
                var b = document.querySelectorAll('input.botui-actions-text-input')[0];
                b.setAttribute("onkeyup", `changeIcon(this,event)`);
                b.setAttribute("onfocus", `changeIcon(this,event)`);
                b.nextElementSibling.addEventListener('click', function () {
                    goBackOrNot(this)
                })
            }, 1000);
            botui.action.text({
                cssClass: 'email-phn-input',
                action: {
                    placeholder: "Type here",
                    button: {
                        icon: 'arrow-left',
                        label: ''
                    }
                }
            }).then(function (res) {
                document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
                document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
                if (res.value != "") {
                    botui.message.add({
                        loading: true,
                    }).then(function () {
                        return_type = 'alteration'
                        return_item(order_id, item_index, return_type, `ALTERATION : ${res.value}`).then(function (res) {
                            if (res) {
                                successfully_init_return();
                                // botui.message.add({
                                //     loading: true,
                                //     delay: 1000,
                                //     content: "Received your details. Someone from our team will call you if needed."
                                // }).then(function () {
                                //     show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat']);
                                // })
                            }
                        })
                    })
                }
                // sendMail("not_fit", order_id, user, {
                //     item_name: user_orders[order_id].order[item_index].Name,
                //     item_index: item_index,
                //     user_msg: res.value
                // }).then(function (res) {
                //     if (res) {
                //         botui.message.add({
                //             content: "Thanks! We have your details! Someone from the team will call you and fix the issue"
                //         })
                //     } else {
                //         botui.message.add({
                //             content: `Please try again`
                //         }).then(function () {
                //             show_issues_opt('init_bot')
                //         })
                //     }
                // })
            })
        })
        /*botui.message.add({
            type: 'html',
            delay: 1000,
            content: '<ul class="issues-ul">' +
                '<li class="issue return-reasons" onclick="javascript:fit_issue(\'tight_bust\', order_id, item_index,this)">Tight at the Bust</li>' +
                '<li class="issue return-reasons" onclick="javascript:fit_issue(\'tight_stomach\', order_id, item_index,this)">Tight on the Stomach</li>' +
                '<li class="issue return-reasons" onclick="javascript:fit_issue(\'loose_from_certain\', order_id, item_index,this)">Loose from certain places, tight from somewhere</li>' +
                '</ul>'
        })*/
    } else {
        if (user_return_reason.toString().toLowerCase() == "return: return this item") {
            user_return_reason = "RETURN: Received a Wrong Item"
            botui.message.add({
                loading: true,
            }).then(function () {
                initiate_return(order_id, item_index, 'return', user_return_reason)
            })

        } else {
            botui.message.add({
                delay: 1000,
                loading: true,
                content: 'Oh! I\'m so sorry about this. Anything in particular you didn\'t like, we would love to hear more'
            })
            document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
            document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
            setTimeout(function () {
                var b = document.querySelectorAll('input.botui-actions-text-input')[0];
                b.setAttribute("onkeyup", `changeIcon(this,event)`);
                b.setAttribute("onfocus", `changeIcon(this,event)`);
                b.nextElementSibling.addEventListener('click', function () {
                    goBackOrNot(this)
                })
            }, 2000);
            botui.action.text({
                delay: 1000,
                cssClass: 'email-phn-input',
                action: {
                    placeholder: "Type here",
                    button: {
                        icon: 'arrow-left',
                        label: ''
                    }
                }
            }).then(function (res) {
                document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
                document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
                if (res.value != '') {
                    user_return_reason += ` | User Reason: ${res.value}`
                    botui.message.add({
                        delay: 1000,
                        loading: true,
                        content: 'Any current favorite brand that you shop the standard size from?'
                    })
                    document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
                    document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
                    setTimeout(function () {
                        var b = document.querySelectorAll('input.botui-actions-text-input')[0];
                        b.setAttribute("onkeyup", `changeIcon(this,event)`);
                        b.setAttribute("onfocus", `changeIcon(this,event)`);
                        b.nextElementSibling.addEventListener('click', function () {
                            goBackOrNot(this)
                        })
                    }, 2000);
                    botui.action.text({
                        delay: 1000,
                        cssClass: 'email-phn-input',
                        action: {
                            placeholder: "Type here",
                            button: {
                                icon: 'arrow-left',
                                label: ''
                            }
                        }
                    }).then(function (res) {
                        document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
                        document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
                        if (res.value != '') {
                            user_return_reason += ` | Favorite Brand/Size: ${res.value}`
                            botui.message.add({
                                type: 'html',
                                delay: 1000,
                                loading: true,
                                content: `Noted your details!</br>I will initiate a return for Order No.<b>${order_id}-${item_index}</b>. Is that correct?`
                            }).then(function () {
                                botui.action.button({
                                    cssClass: 'bot-btn',
                                    action: [
                                        {
                                            value: true,
                                            text: 'Yes'
                                        }, {
                                            value: false,
                                            text: 'No'
                                        },
                                        {
                                            text: "Go Back to Main Menu",
                                            value: 'go_back'
                                        }
                                    ]
                                }).then(function (res) {
                                    if (res.value && res.value != 'go_back') {
                                        botui.message.add({
                                            loading: true,
                                        }).then(function () {
                                            initiate_return(order_id, item_index, 'return', user_return_reason)
                                        })
                                    } else if (!res.value) {
                                        show_issues_opt('yes_no_opt')
                                    } else {
                                        show_issues_opt('yes_no_opt')
                                    }
                                })
                            })
                        }
                    })
                }
            })
        }
    }
}

function fit_issue(fit_issue, id, index, elem) {
    order_id = id
    item_index = index
    var user_return_reason = `RETURN: Did Not like the Fit| User Reason: ${elem.innerText}`

    botui.message.add({
        human: true,
        content: elem.innerText
    }).then(function (index) {
        botui.message.remove(index - 1)
    });

    botui.message.add({
        delay: 1000,
        loading: true,
        content: 'Any current favorite brand that you shop the standard size from?'
    })
    document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
    document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
    setTimeout(function () {
        var b = document.querySelectorAll('input.botui-actions-text-input')[0];
        b.setAttribute("onkeyup", `changeIcon(this,event)`);
        b.setAttribute("onfocus", `changeIcon(this,event)`);
        b.nextElementSibling.addEventListener('click', function () {
            goBackOrNot(this)
        })
    }, 2000);
    botui.action.text({
        delay: 1000,
        cssClass: 'email-phn-input',
        action: {
            placeholder: "Type here",
            button: {
                icon: 'arrow-left',
                label: ''
            }
        }
    }).then(function (res) {
        document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
        document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
        if (res.value != '') {
            user_return_reason += ` | Favorite Brand/Size: ${res.value}`
            botui.message.add({
                type: 'html',
                delay: 1000,
                loading: true,
                content: `Noted your details!</br>I will initiate a return for Order No.<b>${order_id}-${item_index}</b>. Is that correct?`
            }).then(function () {
                botui.action.button({
                    cssClass: 'bot-btn',
                    action: [
                        {
                            value: true,
                            text: 'Yes'
                        }, {
                            value: false,
                            text: 'No'
                        },
                        {
                            text: "Go Back to Main Menu",
                            value: 'go_back'
                        }
                    ]
                }).then(function (res) {
                    if (res.value && res.value != 'go_back') {
                        initiate_return(order_id, item_index, 'return', user_return_reason)
                    } else if (!res.value) {
                        show_issues_opt('yes_no_opt')
                    } else {
                        show_issues_opt('yes_no_opt')
                    }
                })
            })
        }
    })
}

function initiate_return(id, index, type, reason) {
    order_id = id
    item_index = item_index
    user_return_reason = reason
    ask_bank_details().then(function (res) {
        if (res) {
            return_item(order_id, item_index, 'return', user_return_reason).then(function (res) {
                if (res) {
                    successfully_init_return();
                }
            })
        } else {
            botui.message.add({
                content: "Please enter valid bank details"
            }).then(function (index) {
                botui.message.remove(index - 1)
                botui.message.remove(index - 2)
                initiate_return(id, item_index, type, reason)
            })
        }
    })
}

function issue_with(selected_issue, elem) {
    selected_issue_init = selected_issue
    botui.message.add({
        human: true,
        content: elem.innerText
    }).then(function (index) {
        botui.message.remove(index - 1)
    });

    if (selected_issue == 'ship') {
        botui.message.add({
            delay: 2000,
            loading: true,
            type: 'html',
            content: '<ul class="issues-ul">' +
                '<li class="issue" onclick="javascript:issue_with(\'order_status\',this)">Where is my order?</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue" onclick="javascript:issue_with(\'ship\',this)">Pickup not done</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue" onclick="javascript:window.location = \'/salt/shipping-returns#ship_within_india\'">Do you ship within India?</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue" onclick="javascript:window.location = \'/salt/shipping-returns#ship_overseas\'">Do you ship overseas?</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue" onclick="javascript:window.location = \'/salt/shipping-returns#why_delivery_time\'">Why is the delivery time 6-10 days?</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue" onclick="javascript:window.location = \'/salt/shipping-returns#knw_order_status\'">How do i know the status of my order?</li>' +
                '</ul>'
        });
    } else if (selected_issue == 'return_refund' || selected_issue == 'change_order_details') {
        botui.message.add({
            content: 'Alright! Let me help you with this. I will need some details first'
        });
        botui.message.add({
            loading: true,
        }).then(function (index) {
            loader_index = index
        })  //show loader
        if (check_login()) {
            return new Promise(function (resolve, reject) {
                resolve(get_order())
            }).then(function (orders) {
                user_orders = orders.Orders
                ask_order_id(orders)
            })
        } else {
            ask_for_login();
        }
    } else if (selected_issue == "order_status") {
        botui.message.add({
            loading: true,
        }).then(function (index) {
            loader_index = index
        })
        if (check_login()) {
            return new Promise(function (resolve, reject) {
                resolve(get_order())
            }).then(function (orders) {
                user_orders = orders.Orders
                ask_order_id(orders)
            })
        } else {
            ask_for_login();
        }
    } else if (selected_issue == 'track_order') {
        botui.message.add({
            content: 'Alright! Let me help you with this. I will need some details first'
        });
        botui.message.add({
            loading: true,
        }).then(function (index) {
            loader_index = index
        })  //show loader
        if (check_login()) {
            return new Promise(function (resolve, reject) {
                resolve(get_order())
            }).then(function (orders) {
                user_orders = orders.Orders
                ask_order_id(orders)
            })
        } else {
            ask_for_login();
        }
    } else if (selected_issue == 'other') {
        botui.message.add({
            type: 'html',
            delay: 1000,
            loading: true,
            content: '<ul class="issues-ul">' +
                '<li class="issue" onclick="javascript:init_other(\'show_policy\',this)">What is your policy for returns & refunds?</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue" onclick="javascript:init_other(\'schedule_call\',this)">Schedule a Call with Customer Care</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue" onclick="javascript:init_other(\'no_any_opt\',this)">I do not see my Option</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue" onclick="javascript:init_other(\'leave_msg\',this)">Leave A Message</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
                '</ul>'
        });
    } else if (selected_issue == 'just_browsing') {
        setTimeout(function () {
            close_chat_bot();
            show_issues_opt('init_bot');
        }, 1000);
    }

}

function init_other(type, elem) {
    botui.message.add({
        human: true,
        content: elem.innerText
    }).then(function (index) {
        botui.message.remove(index - 1)
    });

    if (type == "show_policy") {
        botui.message.add({
            type: 'html',
            loading: true,
            delay: 1000,
            content: `Refer to <a href="https://saltattire.com/salt/shipping-returns">https://saltattire.com/salt/shipping-returns</a> for complete details about Shipping & Returns`
        }).then(function () {
            show_anything_else(['show_issues_opt', 'end_of_chat']);
        })
    } else if (type == "schedule_call") {
        schedule_call();
    } else if (type == "no_any_opt") {
        botui.message.add({
            content: "Oops! We're Sorry! Leave Us a Message and we will get back to you about this"
        }).then(function () {
            open_contact_us(type)
        })
    } else if (type == "leave_msg") {
        open_contact_us(type)
    }
}

function init_changes(type, id, elem) {
    botui.message.add({
        human: true,
        content: elem.innerText
    }).then(function (index) {
        botui.message.remove(index - 1)
    });
    if (type == 'need_early') {
        botui.message.add({
            loading: true,
            delay: 1000,
            content: "Alight! By when Do you need your items?"
        }).then(function () {
            date_picker().then(function (date) {
                sendMail("need early i am traveling", order_id, user, {date_time: date}).then(function (res) {
                    if (res) {
                        botui.message.add({
                            loading: true,
                            delay: 1000,
                            content: 'We have Noted Your Request! Someone on the team will call you to confirm if this is possible.'
                        }).then(function () {
                            send_chat_copy();
                            show_anything_else(['show_issues_opt', 'end_of_chat']);
                        })
                    } else {
                        botui.message.add({
                            content: `Please try again`
                        }).then(function () {
                            show_issues_opt('init_bot')
                        })
                    }
                })
            });
        })
    } else if (type == 'change_measurements') {
        botui.message.add({
            loading: true,
            delay: 1000,
            content: "Got it!"
        }).then(function () {
            if (user_orders.hasOwnProperty(id)) {
                if (user_orders[id].order.length > 1) {
                    show_order_items(order_id, {Orders: user_orders}, change_measurement)
                } else {
                    change_measurement(order_id, 0, '')
                }
            }
        })
    } else if (type == 'change_address') {
        if (user_orders.hasOwnProperty(id)) {
            address = user_orders[id].deliveryaddress
            botui.message.add({
                content: "This is your current address"
            }).then(function () {
                botui.message.add({
                    content: `${address.address}, ${address.landmark} ${address.city}, ${address.state}-${address.pincode}`
                })
            }).then(function () {
                botui.message.add({
                    content: "Please enter your Updated Shipping address"
                })
            }).then(function () {
                document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
                document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
                setTimeout(function () {
                    var b = document.querySelectorAll('input.botui-actions-text-input')[0];
                    b.setAttribute("onkeyup", `changeIcon(this,event)`);
                    b.setAttribute("onfocus", `changeIcon(this,event)`);
                    b.nextElementSibling.addEventListener('click', function () {
                        goBackOrNot(this)
                    })
                }, 1000);
                botui.action.text({
                    cssClass: 'email-phn-input',
                    action: {
                        placeholder: "Enter the new Shipping Address",
                        button: {
                            icon: 'arrow-left',
                            label: ''
                        }
                    }
                }).then(function (res) {
                    document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
                    document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
                    address = res.value
                    sendMail("change address", order_id, user, {address: address}).then(function (res) {
                        if (res) {
                            botui.message.add({
                                loading: true,
                                delay: 1000,
                                content: 'Your Details Have Been Saved!'
                            }).then(function () {
                                show_anything_else(['show_issues_opt', 'end_of_chat']);
                            })
                        }
                    })

                })
            })
        }
    }
}

function init_return(type, id, index, elem) {
    order_id = id
    item_index = index
    return_type = type
    exchange_size = ''
    botui.message.add({
        human: true,
        content: elem.innerText
    }).then(function (index) {
        botui.message.remove(index - 1)
    });

    if (type == 'exchange') {
        sizes_opt = [
            {value: "XS", text: "XS"},
            {value: "S", text: "S"},
            {value: "M", text: "M"},
            {value: "L", text: "L"},
            {value: "XL", text: "XL"},
            {value: "XXL", text: "XXL"},
        ]
        sizes_opt.forEach(function (e, index) {
            if (user_orders[order_id].order[item_index].Size == e.value)
                sizes_opt.splice(index, 1)
        })
        setTimeout(function () {
            var b = document.querySelectorAll('select.botui-actions-text-input')[0];
            b.setAttribute("onchange", `changeIcon(this,event)`);
            b.nextElementSibling.addEventListener('click', function () {
                goBackOrNot(this)
            })
        }, 2000);
        botui.action.select({
            cssClass: "botui-actions-text email-phn-input",
            action: {
                cssClass: "botui-actions-text-input",
                placeholder: "Select size",
                value: '',
                searchselect: false,
                label: 'size',
                options: sizes_opt,
                button: {
                    icon: 'arrow-left',
                    label: ''
                }
            }
        }).then(function (res) {
            exchange_size = res.value
            botui.message.add({
                type: 'html',
                loading: true,
                delay: 1000,
                content: `Noted your details!</br>I will initiate a size exchange for size-<b>${exchange_size}</b> for Order No.<b>${order_id}-${item_index}</b>. Is that correct?`
            }).then(function () {
                botui.action.button({
                    delay: 1000,
                    cssClass: 'bot-btn',
                    action: [
                        {
                            value: true,
                            text: 'Yes'
                        }, {
                            value: false,
                            text: 'No'
                        },
                        {
                            text: "Go Back to Main Menu",
                            value: 'go_back'
                        }
                    ]
                }).then(function (res) {
                    if (res.value && res.value != 'go_back') {
                        botui.message.add({
                            loading: true,
                        }).then(function () {
                            return_item(order_id, item_index, return_type, `${return_type.toUpperCase()}: ${exchange_size.toUpperCase()}`).then(function (res) {
                                if (res) {
                                    successfully_init_return();
                                }
                            })
                        })
                    } else if (!res.value) {
                        show_issues_opt('yes_no_opt')
                    } else {
                        show_issues_opt('yes_no_opt')
                    }
                })
            })
        });
    } else if (type == 'return_store_credit' || type == 'return_bank') {
        botui.message.add({
            delay: 1000,
            loading: true,
            content: 'Noted. Could you specify the Reason for Return?'
        })
        botui.message.add({
            type: 'html',
            delay: 1000,
            content: '<ul class="issues-ul">' +
                '<li class="issue return-reasons" onclick="javascript:return_reason(\'not_fit\', order_id, item_index,this)">Did Not like the Fit</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue return-reasons" onclick="javascript:return_reason(\'not_like_fab\', order_id, item_index,this)">Did Not like the Fabric</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue return-reasons" onclick="javascript:return_reason(\'not_like_color\', order_id, item_index,this)">Did Not like the Color</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue return-reasons" onclick="javascript:return_reason(\'not_as_per_except\', order_id, item_index,this)">Product Not As Per Expectations</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue return-reasons" onclick="javascript:return_reason(\'something_else\', order_id, item_index,this)">Something Else</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue  return-reasons" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
                '</ul>'
        })
    } else if (type == 'alteration') {
        botui.message.add({
            loading: true,
            delay: 1000,
            content: "Got it! Please mention the alterations you need"
        })
        document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '50px'
        document.getElementsByClassName('botui-actions-container')[0].style.position = 'absolute'
        setTimeout(function () {
            var b = document.querySelectorAll('input.botui-actions-text-input')[0];
            b.setAttribute("onkeyup", `changeIcon(this,event)`);
            b.setAttribute("onfocus", `changeIcon(this,event)`);
            b.nextElementSibling.addEventListener('click', function () {
                goBackOrNot(this)
            })
        }, 2000);
        botui.action.text({
            delay: 1000,
            cssClass: 'email-phn-input',
            action: {
                placeholder: 'Type here',
                button: {
                    icon: 'arrow-left',
                    label: ''
                }
            }

        }).then(function (res) {
            document.getElementsByClassName('botui-messages-container')[0].style['padding-bottom'] = '30px'
            document.getElementsByClassName('botui-actions-container')[0].style.position = 'relative'
            if (res.value != "") {
                botui.message.add({
                    loading: true,
                }).then(function () {
                    return_item(order_id, item_index, return_type, `${return_type.toUpperCase()}: ${res.value}`).then(function (res) {
                        if (res) {
                            successfully_init_return();
                            // botui.message.add({
                            //     loading: true,
                            //     delay: 1000,
                            //     content: "Received your details. Someone from our team will call you if needed."
                            // }).then(function () {
                            //     show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat']);
                            // })
                        }
                    })
                })
            }
        })
    } else if (type == 'received_wrong_item') {
        botui.message.add({
            delay: 1000,
            loading: true,
            content: "Uh oh! We're sorry about this."
        })
        botui.message.add({
            type: 'html',
            delay: 1000,
            content: '<ul class="issues-ul">' +
                '<li class="issue return-reasons" onclick="javascript:return_reason(\'received_wrong_item\', order_id, item_index,this)">Return this item</li>' +
                '<li class="opt-separator"></li>' +
                '<li class="issue  return-reasons" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li>' +
                '</ul>'
        })
        // sendMail(type, order_id, user, {
        //     item_name: user_orders[order_id].order[item_index].Name,
        //     item_index: item_index
        // }).then(function (res) {
        //     if (res) {
        //         botui.message.add({
        //             loading: true,
        //             delay: 1000,
        //             content: "Uh oh! We're sorry about this. We will call you to resolve this issue"
        //         }).then(function () {
        //             show_anything_else(['show_issues_opt', 'schedule_call', 'end_of_chat']);
        //         })
        //     }
        // })

    }
}

function open_contact_us(type) {
    getUserDetails().then(function (res) {
        botui.message.add({
            type: 'html',
            loading: true,
            delay: 1000,
            content: `<form id="contact_us_form">` +
                `<input type="text" placeholder="Name" id="name" value="${res.data.name}"/>` +
                `<input type="text" placeholder="Email" id="email" value="${res.data.email}"/>` +
                `<input type="text" placeholder="Phone" id="phone" value="${res.data.phone}"/>` +
                `<input type="text" placeholder="Message" id="message"/>` +
                `<form>`
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
                    contact_us_form.name = document.getElementById('name').value
                    contact_us_form.email = document.getElementById('email').value
                    contact_us_form.phone = document.getElementById('phone').value
                    contact_us_form.message = document.getElementById('message').value
                    if (contact_us_form.name != '' && contact_us_form.email != '' && emailregex.test(contact_us_form.email) && contact_us_form.phone != '' && contact_us_form.message != "") {
                        botui.message.add({
                            cssClass: "line-break-wo-tag",
                            human: true,
                            content: `${contact_us_form.name}&#10;` +
                                `${contact_us_form.email}&#10;` +
                                `${contact_us_form.phone}&#10;` +
                                `${contact_us_form.message}`

                        }).then(function (index) {
                            botui.message.remove(index - 1)
                            botui.message.remove(index - 2)
                            user.email = contact_us_form.email;
                            sendMail(type, '', user, {contact_us_param: contact_us_form}).then(function (res) {
                                if (res) {
                                    send_chat_copy();
                                    show_anything_else(['show_issues_opt', 'end_of_chat']);
                                } else {
                                    botui.message.add({
                                        content: `Please try again`
                                    }).then(function () {
                                        show_issues_opt('init_bot')
                                    })
                                }
                            })
                        })
                    } else {
                        botui.message.add({
                            content: "Please enter valid details"
                        }).then(function (index) {
                            botui.message.remove(index - 1)
                            botui.message.remove(index - 2)
                        })
                        open_contact_us(type)
                    }
                    // send_chat_copy();
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

function sync_chat(res) {
    if (res.hasOwnProperty('content') && res['content'] != '') {
        $.ajax({url: "/chat/sync_chat", method: "post", data: {msg: res, id: id}}).then(function success(res) {
        })
    }
}

function get_chat() {
    return new Promise(function (resolve, reject) {
        if (window.localStorage.hasOwnProperty('chat')) id = window.localStorage.getItem('chat')
        $.ajax({url: "/chat/get", method: "post", data: {id: id}}).then(function success(res) {
            if (res.msg == 'success' && res.chat.length > 0) {
                resolve(res.chat);
            } else {
                resolve("not found");
            }
        })
    })
}

function check_prev_chat() {
    if (window.localStorage.hasOwnProperty('chat'))
        id = window.localStorage.getItem('chat')
    return new Promise(function (resolve, reject) {
        $.ajax({url: "/chat/check_prev_chat", method: "post", data: {id: id}}).then(function success(res) {
            if (res.msg == "success") {
                id = res.id
                window.localStorage.setItem('chat', res.id)
                resolve(res.id);
            }
        });

    })
}

function show_anything_else(show) {
    var bulit_html = '<ul class="issues-ul">'
    if (show.indexOf('show_issues_opt') > -1)
        bulit_html += '<li class="issue" onclick="javascript:show_issues_opt(\'\')">Go Back to Main Menu</li><li class="opt-separator"></li>'
    if (show.indexOf('schedule_call') > -1)
        bulit_html += '<li class="issue" onclick="javascript:init_other(\'schedule_call\',this)">Schedule a Call with a Customer Care Executive</li><li class="opt-separator"></li>'
    if (show.indexOf('end_of_chat') > -1)
        bulit_html += '<li class="issue" onclick="javascript:end_of_chat()">No, that\'s it!</li>'
    bulit_html += '</ul>'

    if (show.indexOf('hide') > -1) {
        botui.message.add({
            type: 'html',
            delay: 1000,
            content: bulit_html
        });
    } else {
        botui.message.add({
            delay: 1000,
            content: "You're all set! Let me know if there is anything else I can help you with?"
        }).then(function () {
            botui.message.add({
                type: 'html',
                delay: 1000,
                content: bulit_html
            });
        })
    }

}

function schedule_call() {
    if (check_login()) {
        botui.message.add({
            content: "Pick your date and time preference and we will arrange a call then!"
        });
        date = new Date();
        date.setDate(date.getDate() + 1);
        min_date = moment(date).format("YYYY-MM-DDTkk:mm");
        botui.message.add({
            type: 'html',
            content: `<input type="datetime-local" id="schedule_call_time" value="${min_date}" min="${min_date}" onclick="disable_date()" onchange="disable_date()"/>`
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
    } else {
        ask_for_login()
    }
}

function end_of_chat() {
    botui.message.add({
        human: true,
        content: 'No, that\'s it!'
    });

    botui.message.add({
        loading: true
    }).then(function (index) {
        botui.message.update(index, {
            loading: false,
            content: 'Thank you! Have a great day!\n' +
                'I\'m right here if you there is anything else you need :)'
        }).then(function () {
            setTimeout(function () {
                close_chat_bot();
                show_issues_opt('init_bot');
            }, 1000);
            // show_issues_opt('init_bot');
        })
    });
}

function date_picker() {
    return new Promise(function (resolve, reject) {
        var date = moment(new Date()).format("YYYY-MM-DD");
        // date.setDate(date.getDate() + 1);
        botui.message.add({
            type: 'html',
            content: `<input type="date" id="pick_date" value="${date}" min="${date}"/>`
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
                    date = document.getElementById('pick_date').value
                    botui.message.add({
                        human: true,
                        content: document.getElementById('pick_date').value
                    }).then(function (index) {
                        botui.message.remove(index - 1)
                        botui.message.remove(index - 2)
                        resolve(date)
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

function send_chat_copy() {
    if (window.localStorage.hasOwnProperty('chat')) id = window.localStorage.getItem('chat')
    getUserDetails().then(function (res) {
        if (res.data.email.length > 0 || res.data.phone.length > 0) {
            $.ajax({
                url: "/chat/send_chat_copy",
                method: "post",
                data: {id: id, email: res.data.email, phone: res.data.phone, name: res.data.name}
            })
        } else {
            $.ajax({url: "/chat/send_chat_copy", method: "post", data: {id: id}})
        }
    });
}

/* botui.message.add({
content: 'choose ur language'
}).then(function () {
return botui.action.select({
action: {
placeholder: "Select Language",
value: 'TR,EN', // Selected value or selected object. Example: {value: "TR", text : "Türkçe" }
// searchselect: true, // Default: true, false for standart dropdown
multipleselect: true,
label: 'text', // dropdown label variable
options: [
{value: "EN", text: "English"},
{value: "ES", text: "Español"},
{value: "TR", text: "Türkçe"},
{value: "DE", text: "Deutsch"},
{value: "FR", text: "Français"},
{value: "IT", text: "Italiano"},
],
button: {
icon: 'check',
label: 'OK'
}
}
}).then(function (res) { // will be called when a button is clicked.
console.log(res.value); // will print "one" from 'value'
});
})*/

