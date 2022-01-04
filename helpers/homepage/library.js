export function initiateNavBar() {
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

export function openUserMenu() {
    $('.button-collapse').sideNav('show');
    if ($('#islogin ul.collapsible li').hasClass('active')) {
    } else {
        $('#islogin ul.collapsible li a.collapsible-header').trigger('click');
    }
}