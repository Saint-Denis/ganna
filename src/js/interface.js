$(document).ready(function() {




    //Навигация по страничкам сайта
    $('body').append(
        '<div style="position: fixed; z-index: 9999; bottom: 0; right: 0; background: #fff; border: solid 1px #000; width: 250px;"> \
            <a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px;position:relative;z-index:20;" onclick="$(this).parent().hide()">Закрыть X</a> \
        <ol> \
            <li><a href="./text.html" style="color:#000;">Текстовая</a></li> \
            <li><a href="./ganna_product_03.html" style="color:#000;">Карточка товара</a></li> \
            <li><a href="./ganna_spisok_tovara_01.html" style="color:#000;">Список товара</a></li> \
            <li><a href="./ganna_produkcia_01.html" style="color:#000;">Продукция</a></li> \
            <li><a href="./ganna_siraya_01.html" style="color:#000;">Сырая продукция</a></li> \
            <li><a href="./index.html" style="color:#000;">Главная</a></li> \
             <li><a href="./ganna_map_02.html" style="color:#000;">Контакты</a></li> \
        </ol> \
    </div>');

    //Svg4everybody
    (function() {
        svg4everybody({});
    }());

    //Google cart on contacts page
    (function() {

        //Точка до основного магазина
        var latitude = 55.172596,
            longtitude = 30.270227,
            map_zoom = 12;

        //Координаты остальных городов
        var locations = [
            ["moskovskaya.99", 55.172596, 30.270227],
            ["ludnikova.16", 55.195460, 30.229291],
            ["chern.42", 55.168563, 30.199737],
            ["schkolnaya.16", 55.288131, 30.261349],
        ];



        //Создание точки на карте
        var map_options = {
            center: new google.maps.LatLng(latitude, longtitude),
            zoom: map_zoom,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false

        }

        //Инит карты
        var map = new google.maps.Map(document.querySelector('.map'), map_options);

        //Добавление маркеров

        //Добавление лейбла у маркера
        var infoWindowContent = [
            ['<div class="gm-style-wrapper"><div class="gm-wrapper"><div class="gm-address">пр-т Московский, 99</div></div>"Привет ганна 19!"</div>'],
            ['<div class="map-label">+ "Привет ганна 16!"</div>'],
            ['<div class="map-label">+ "Привет ганна 42!"</div>'],
            ['<div class="map-label">+ "Привет ганна 16!"</div>']
        ];

        var infoWindow = new google.maps.InfoWindow();
        var marker, i;
        var latlngbounds = new google.maps.LatLngBounds();  


        for (i = 0; i < locations.length; i++) {
            var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);

            //Добавляем координаты маркера в область
            latlngbounds.extend(myLatLng);

            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                visible: true,
                animation: google.maps.Animation.DROP,
                icon: '../assets/img/icons/chick-marker.png'
            });

            //Центрируем маркеры
            map.setCenter(latlngbounds.getCenter(), map.fitBounds(latlngbounds));  



            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));

     

        };



        //Добавление иконок зума и уменьшения
        function CustomZoomControl(controlDiv, map) {
            var controlZoomIn = document.querySelector('.map-icon--plus'),
                controlZoomOut = document.querySelector('.map-icon--minus');

            controlDiv.append(controlZoomIn);
            controlDiv.append(controlZoomOut);

            google.maps.event.addDomListener(controlZoomIn, 'click', function() {
                map.setZoom(map.getZoom() + 1);
            });


            google.maps.event.addDomListener(controlZoomOut, 'click', function() {
                map.setZoom(map.getZoom() - 1);
            });

        }

        var zoomControlDiv = document.createElement('div');
        var zoomControl = new CustomZoomControl(zoomControlDiv, map);
        map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);


    }());



    //Fancybox on index page 
    (function() {
        $('[data-fancybox]').fancybox();
    }());

    //Shares 
    (function() {
        if ($('.shares-slider__title').length > 0) {
            $('.shares-slider__title').dotdotdot({
                height: 120,
                watch: 'window'
            });
        }
    }());

    //Shares slider
    (function() {
        $('.shares-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            responsive: [{
                breakpoint: 767,
                settings: {
                    arrows: false
                }
            }]
        });
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

    //Slider (news-slider)
    (function() {
        var $newsSlider = $('.news-slider');
        $newsSlider.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            responsive: [{
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1

                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

    }());

    //Slideshow (production-slider)
    (function() {
        var $prodSlider = $('.production-slider'),
            $prodThumbnails = $('.production-thumbnails');

        if ($('.production-slider__desc').length > 0) {
            $('.production-slider__desc').dotdotdot({
                height: 75,
                watch: 'window'
            });
        };

        $prodSlider.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            arrows: false,
            asNavFor: $prodThumbnails,
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


        $prodThumbnails.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: $prodSlider,
            centerMode: true,
            centerPadding: '0px',
            focusOnSelect: true,
            verticalSwiping: true,
            vertical: true,
            responsive: [{
                breakpoint: 1100,
                settings: {
                    verticalSwiping: false,
                    vertical: false
                }
            }]
        });

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
