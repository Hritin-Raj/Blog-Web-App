$(document).ready(function () {
    // Initialize the Slick slider
    $('.post-slider ul').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false, // Hide default arrows
    });

    // Event listener for custom left and right buttons
    $('#left-slider').click(function () {
        $('.post-slider ul').slick('slickPrev');
    });

    $('#right-slider').click(function () {
        $('.post-slider ul').slick('slickNext');
    });
});
