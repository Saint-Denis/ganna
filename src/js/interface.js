$(document).ready(function() {




    //Навигация по страничкам сайта
    $('body').append(
        '<div style="position: fixed; z-index: 9999; bottom: 0; right: 0; background: #fff; border: solid 1px #000; width: 250px;"> \
            <a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px;position:relative;z-index:20;" onclick="$(this).parent().hide()">Закрыть X</a> \
        <ol> \
            <li><a href="./text.html" style="color:#000;">Текстовая</a></li> \
            <li><a href="./ganna_product_03.html" style="color:#000;">Карточка товара</a></li> \
            <li><a href="./ganna_spisok_tovara_01.html" style="color:#000;">Список товара</a></li> \
        </ol> \
    </div>');

    //Svg4everybody
    (function() {
        svg4everybody({});
    }());

    //Text truncat of product-card && Equal height 
    (function() {
        if ($('.product-card__preview').length > 0) {
            $('.product-card__preview').dotdotdot({
                height: 75,
                watch: 'window'
            });
        };

        if ($('.product-card').length > 0) {
            $('.product-card').matchHeight({
                byRow: true,
                property: 'min-height',
                target: null,
                remove: false
            });
        };

    }());

    //Slideshow (product-card)
    (function() {
        var $cardSlider = $('.card-slider'),
            $thumbnails = $('.card-thumbnails');

        $cardSlider.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            arrows: false,
            asNavFor: $thumbnails,
            fade: true,
            responsive: [{
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1

                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });


        $thumbnails.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            asNavFor: $cardSlider,
            centerMode: true,
            centerPadding: '0px',
            focusOnSelect: true,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 3
                }
            }]
        });

        // $('.card-thumbnails .slick-slide').removeClass('slick-active');
        // $('.card-thumbnails .slick-slide').eq(0).addClass('slick-active');

        // $('.card-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        //     var mySlideNumber = nextSlide;
        //     $('.card-thumbnails .slick-slide').removeClass('slick-active');
        //     $('.card-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
        // });

    }());

    //Mobile Menu
    (function() {
        $header = $('.page-header'),
            $menu = $('.burger-menu'),
            $mobileNav = $('.mobile-nav'),
            $mobileWrapper = $('.mobile-wrapper'),
            $breadcrumbs = $('.breadcrumbs'),
            $pageContent = $('.page-content'),
            $layout = $('.layout'),
            $mobileItem = $('.mobile-nav__list').find('.mobile-nav__item');


        $menu.on('click', function(e) {

            $(this).stop(true, true).delay(1000).toggleClass('open');

            //Задержка в появлении меню
            setTimeout(function() {
                $mobileWrapper.stop(true, true).toggleClass('open');
            }, 450);

            //Анимация пунктов меню
            setTimeout(function() {
                for (var i = 0; i < $mobileItem.length; i++) {
                    $mobileItem[i].classList.toggle('show');
                };

            }, 450)

            //Убираем скролл сайта, оставляем скролл меню
            setTimeout(function() {
                if ($mobileNav.hasClass('open')) {
                    $layout.addClass('hidden');
                } else {
                    $layout.removeClass('hidden');
                };
            }, 450);

            $mobileNav.stop(true, true).toggleClass('open');

            //Меняем z-index у хлебных крошек и контента
            $breadcrumbs.add($pageContent).toggleClass('z-index');
            e.stopImmediatePropagation();

        });

        //Аккордеон первого уровня
        $('.mobile-nav__link:not(.mobile-nav__link--empty)').on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                item = $this.closest('.mobile-nav__item'),
                list = $this.closest('.mobile-nav__list'),
                items = list.find('.mobile-nav__item'),
                content = item.find('.mobile-inner'),
                otherContent = list.find('.mobile-inner'),
                duration = 400;

            if (!item.hasClass('active')) {
                items.removeClass('active');
                items.find('.mobile-nav__link').removeClass('hovered');

                item.addClass('active');
                item.find('.mobile-nav__link').addClass('hovered').delay(100);

                otherContent.stop(true, true).slideUp(duration);
                content.stop(true, true).slideDown(duration);

            } else {
                content.stop(true, true).slideUp(duration);
                item.stop(true, true).removeClass('active');
                item.find('.mobile-nav__link').removeClass('hovered');

            };
        });


        //Аккордеон второго уровня
        $('.mobile-inner__title-link').on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                item = $this.closest('.mobile-inner__level2-item'),
                list = $this.closest('.mobile-inner__level2'),
                items = list.find('.mobile-inner__level2-item'),
                content = item.find('.mobile-inner__list'),
                otherContent = list.find('.mobile-inner__list'),
                duration = 400;

            if (!item.hasClass('active')) {
                items.removeClass('active');
                item.addClass('active');

                otherContent.stop(true, true).slideUp(duration);
                content.stop(true, true).slideDown(duration);
            } else {
                content.stop(true, true).slideUp(duration);
                item.stop(true, true).removeClass('active');
            };
        });


        //Аккордеон третьего уровня
        $('.mobile-inner__link--lv3').on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                item = $this.closest('.mobile-inner__item'),
                list = $this.closest('.mobile-inner__list'),
                items = list.find('.mobile-inner__item'),
                content = item.find('.mobile-inner__sub'),
                otherContent = list.find('.mobile-inner__sub'),
                duration = 400;


            if (!item.hasClass('active')) {
                items.removeClass('active');
                item.addClass('active');

                otherContent.stop(true, true).slideUp(duration);
                content.stop(true, true).slideDown(duration);
            } else {
                content.stop(true, true).slideUp(duration);
                item.stop(true, true).removeClass('active');
            };

        });
    }());

    //Select
    (function() {
        if ($('.page-select').length > 0) {

            $('.page-select').selectOrDie();
        }

    }());

    //Styling Scroll
    (function() {

        if ($('.sod_list').length > 0) {
            $('.sod_list').mCustomScrollbar({
                axis: "y",
                theme: "dark"
            });
        };



    }());

    //Photo gallery
    (function() {
        if ($('.preview-wrap__link').length > 0) {

            $('.preview-wrap__link').fancybox();
        }

    }());

    //Popup on text page
    (function() {
        if ($('.btn--call-js').length > 0) {

            $('.btn--call-js').fancybox();
        }

    }());

    //Tabs
    (function() {
        if ($('.tabs').length > 0) {

            $('.tabs').responsiveTabs({
                startCollapsed: 'accordion',
                animation: 'slide'
            });
        }

    }());

    //Page-slider
    (function() {
        if ($('.page-slider__wrapper').length > 0) {

            var $slider = $('.page-slider__wrapper');

            $slider.slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
            });
        }
    }());

});

//Remove Equal height on mobile
(function() {

    $(window).on('load resize', function() {
        if ($(window).width() <= 767) {
            $('.product-card').matchHeight({ remove: true });
        } else {
            if ($('.product-card').length > 0) {
                $('.product-card').matchHeight({
                    byRow: true,
                    property: 'min-height',
                    target: null,
                    remove: false
                });
            };
        }
    })
}());

//Preloader
(function() {
    $(window).on('load', function() {

        var $preloader = $('.preloader'),
            $images = document.images,
            $imagesCount = $images.length,
            $percentWindow = $('.preloader__percent'),
            $imagesLoadedCount = 0;


        for (var i = 0; i < $imagesCount; i++) {
            var $imageClone = new Image;
            $imageClone.onload = imageLoad;
            $imageClone.onerror = imageLoad;
            $imageClone.src = $images[i].src;
        };

        function imageLoad() {
            $imagesLoadedCount++;
            $percentWindow.html((((100 / $imagesCount) * $imagesLoadedCount) << 0) + '%');

            if ($imagesLoadedCount >= $imagesCount) {
                setTimeout(function() {
                    if (!$preloader.hasClass('done')) {
                        $preloader.addClass('done');
                    };
                }, 1000);
            };
        };



    });
}());

//Scroll on table
(function() {
    $(window).bind('load resize', function() {
        var $windowWith = $(window).width(),
            $table = $('.table');

        function makeScroll() {
            if ($windowWith < 768) {

                $table.mCustomScrollbar({
                    axis: "x",
                    theme: "dark"
                });
            }
        };


        makeScroll();
    });
}());




//Dropdown
(function() {
    $(window).bind('load resize', function() {
        var $windowWith = $(window).width(),
            $menu = $('.page-nav').find('.page-nav__list'),
            $items = $menu.find('.page-nav__item').not('.page-nav__item--empty'),
            $headerWrapper = $('.page-header__wrapper').width(),
            $headerBottonWidth = $('.page-header__bottom').width(),
            $pageNavItemPos = $('.page-nav__item--js').position().left,
            $dropDownFull = $('.dropdown--full'),
            $delay = 0;

        function makeDropDown() {
            if ($windowWith > 1110) {

                $dropDownFull.width($headerBottonWidth - 18 + "px");
                var leftPositionDrop = -($pageNavItemPos);


                $dropDownFull.css({
                    left: leftPositionDrop + "px"

                });

                $items.each(function() {
                    var $this = $(this),
                        $link = $this.find('>a');

                    $this.bind('mouseenter', function() {
                        $(this).find('.dropdown').stop(true, true).fadeIn({
                            complete: function() {
                                $(this).addClass('active');
                            }
                        });
                        $link.addClass("active");
                    }).bind('mouseleave', function() {
                        $(this).find('.dropdown').stop(true, true).removeClass('active');
                        $link.removeClass("active");
                    });
                });
            } else {
                $items.each(function() {
                    var $this = $(this);
                    $this.unbind('mouseenter mouseleave');
                });
            }

        };


        makeDropDown();
    });
}());


//Search on mobile
(function() {

    $(window).bind('load resize', function() {

        var $windowWith = $(window).width(),
            $searchInput = $(".page-header__input"),
            $headerTop = $('.page-header__top'),
            $sumbit = $('.page-header__submit'),
            $sumbitClose = $('.page-header__reset'),
            $form = $('.page-header__form'),
            $burderMenu = $('.burger-menu'),
            $searchCall = $('.search-call');



        function getSearch() {
            if ($windowWith > 1110) {


                $form.show();

                $searchCall.off('click');


                $headerTop.removeClass("in-search");

                $sumbit.stop(true, true).animate({
                    left: "0%"

                }, 500);


            } else if ($windowWith < 1110) {

                $form.hide();

                $searchCall.on('click', function(e) {
                    e.preventDefault();
                    $(this).hide();
                    $form.show();
                    $headerTop.addClass("in-search");
                    $sumbit.stop(true, true).animate({
                        left: "95%"

                    }, 500);
                });

                $sumbitClose.on('click', function(e) {
                    $headerTop.removeClass("in-search");
                    $searchCall.show();
                    $form.hide();
                    $sumbit.stop(true, true).animate({
                        left: "0%"
                    });

                });
            };
        };


        getSearch();


    });

}());
