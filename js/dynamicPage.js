const apiUrl = "php/contact";
var startseiteTextShown = true,
    abholmarktTextShown = false,
    getraenkefachgrosshandelTextShown = false,
    heimserviceTextShown = false,
    skydancerTextShown = false,
    sortimentTextShown = false;
var lastTextChange = "startseite";

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        var $active = $(".selected");
        if ($(this).scrollTop() > $nav.height()) {
            $($nav).addClass("scrolled");
            //$($active).addClass("selectScroll");
        } else {
            $($nav).removeClass("scrolled");
            //$($active).removeClass("selectScroll");
        }
    });
});

$(document).ready(function() {
    $(document).on('submit', '#contactForm', function() {
        sendContactMail($("#name").val(),$("#email").val(),$("#subject").val(),$("#message").val(), document.getElementById('copy').checked);
        return false;
    });
});

function scrollTo(element) {
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 500);
}

function changeActiveNavItem(itemID) {
    $(".selected").removeClass("selected");
    $("#" + itemID).addClass("selected");
}

function getShownTextID() {
    if (startseiteTextShown) {
        startseiteTextShown = false;
        return "startseite";
    }
    else if (abholmarktTextShown) {
        abholmarktTextShown = false;
        return "abholmarkt";
    }
    else if (getraenkefachgrosshandelTextShown) {
        getraenkefachgrosshandelTextShown = false;
        return "getränkefachgroßhandel";
    }
    else if (heimserviceTextShown) {
        heimserviceTextShown = false;
        return "heimservice";
    }
    else if (skydancerTextShown) {
        skydancerTextShown = false;
        return "skydancer";
    }
    else if (sortimentTextShown) {
        sortimentTextShown = false;
        return "sortiment";
    }
}

function showTextArea(area) {
    $("#" + area).collapse("show");
    switch (area) {
        case "startseite":
            startseiteTextShown = true;
            break;
        case "abholmarkt":
            abholmarktTextShown = true;
            break;
        case "getränkefachgroßhandel":
            getraenkefachgrosshandelTextShown = true;
            break;
        case "heimservice":
            heimserviceTextShown = true;
            break;
        case "skydancer":
            skydancerTextShown = true;
            break;
        case "sortiment":
            sortimentTextShown = true;
            break;
    }
}

function changeSiteValue(itemID, category) {
    if (category != lastTextChange) {
        changeActiveNavItem(itemID);
        $("#" + getShownTextID()).collapse("hide");
        showTextArea(category);
        lastTextChange = category;
        scrollTo("#content");
    }
}

function sendContactMail(name, mailAddress, subject, message, copy) {
    var items;
    items = JSON.stringify({
        "name" : name,
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
            if (result.success) {
                var obj = JSON.parse(result.data);
            }
        },
        error: function () {

        }
    });
}