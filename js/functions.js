const apiUrl = "php/contact";
var lastTextChange = "home";

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        if ($(this).scrollTop() > $nav.height()) {
            $($nav).addClass("scrolled");
        } else {
            $($nav).removeClass("scrolled");
        }
    });
});

$(document).ready(function () {
    $(document).on('submit', '#contactForm', function () {
        sendContactMail($("#name").val(), $("#email").val(), $("#subject").val(), $("#message").val(), document.getElementById('copy').checked);
        return false;
    });
    var $nav = $(".navbar-fixed-top");
    if ($(this).scrollTop() > $nav.height()) {
        $($nav).addClass("scrolled");
    } else {
        $($nav).removeClass("scrolled");
    }
    $(".navbar-brand, .contact").on('click', function (event) {
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - 50
            }, 1000, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
});

function scrollTo(element) {
    if (element) {
        $('html, body').animate({
            scrollTop: $('#' + element).offset().top - 50
        }, 500);
    }
    else {
        $('html, body').animate({
            scrollTop: $('#content').offset().top - 50
        }, 500);
    }
}

function changeActiveNavItem(itemID) {
    $(".selected").removeClass("selected");
    $("#" + itemID).addClass("selected");
}

function changeSiteValue(itemID, category) {
    if (category != lastTextChange) {
        changeActiveNavItem(itemID);
        $("#" + lastTextChange).collapse("hide");
        $("#" + category).collapse("show");
        lastTextChange = category;
    }
    scrollTo();
}

function sendContactMail(name, mailAddress, subject, message, copy) {
    var items;
    items = JSON.stringify({
        "name": name,
        "mail": mailAddress,
        "subject": subject,
        "message": message,
        "copy": copy
    });
    $.ajax({
        url: apiUrl,
        type: "POST",
        contentType: "json",
        async: "false",
        data: items,
        success: function (result) {
            if (result) {
                alert("Die E-Mail wurde versendet");
            }
            else alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut...");
        },
        error: function () {

        }
    });
}

function showNavbar() {
    $("#navbarValue").collapse("show");
}

function hideNavbar() {
    $("#navbarValue").collapse("hide");
}