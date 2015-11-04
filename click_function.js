/**
 * Created by godson on 11/4/15.
 */

$('document').ready(function () {
    $(".back").on("click", function () {
        console.log('number button was clicked', $(this));
        $(this).hide();
    })
});
