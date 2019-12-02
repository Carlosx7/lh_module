$(document).ready(function() {
    //限制字符个数
    $(".ellipsis").each(function() {
        var maxwidth = 160;
        if ($(this).text().length > maxwidth) {
            $(this).text($(this).text().substring(0, maxwidth));
            $(this).html($(this).html() + "...");
        }
    });
    $(".ellipsis2").each(function() {
        var maxwidth = 50;
        if ($(this).text().length > maxwidth) {
            $(this).text($(this).text().substring(0, maxwidth));
            $(this).html($(this).html() + "...");
        }
    });
});