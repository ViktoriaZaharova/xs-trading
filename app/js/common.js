$('.btn-burger').click(function () {
    $('.overlay').fadeIn();
    $('.mobile-menu').fadeIn();
    $('.brokers-front').fadeOut();
});

$('.btn-close').click(function () {
    $('.mobile-menu').fadeOut();
    $('.overlay').fadeOut();
    $('.brokers-front').fadeIn();
});


$('.dropItem').click(function () {
    $(this).find('.dropDown-menu').fadeToggle();
});

$(document).mouseup(function (e) { // событие клика по веб-документу
    let div = $(".dropItem"); // тут указываем ID элемента
    if (!div.is(e.target) && div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.find('.dropDown-menu').fadeOut(); // скрываем его
    }
});

$('.strategy-slider').slick({
    slidesToShow: 1,
    fade: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="img/arrow-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/arrow-right.svg" alt=""></button>',
    appendArrows: '.strategy-slider-nav',
    responsive: [

        {
            breakpoint: 768,
            settings: {
                appendArrows: '.strategy-slider'
            }
        }
    ]
});