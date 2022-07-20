
// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// MODAL FORM HOME PAGE

// $(document).ready(() => {
//     // /*------- button with class register -------*/
//     // let reg_btn:string = $('.container .register');

//     // /*------- back button ----------------------*/
//     // let back_btn:string = $('.container .back');

//     reg_btn.click(function(e){
//     e.preventDefault()
//     $(this).siblings('.reg').css({
//         'transform':'translateY(40%) scale(5)',
//         'border-radius':'0',
//         'width':'100%',
//         'height':'100%'
// }).end();


//     reg_btn.siblings('.container h3:nth-of-type(1)').css({
//         'top':'40%',
//         'z-index':'8',
//     }).end().end();   
//     });

//     sig_btn.on('click',function(e){
//     e.preventDefault();
//     $(this).siblings('.sig').css({
//         'transform':'translateY(40%) scale(5)',
//         'border-radius':'0',
//         'width':'100%',
//         'height':'100%'
//     }).end();

//     sig_btn.siblings('.container h3:nth-of-type(2)').css({
//         'top':'40%',
//         'z-index':'8',
//     }).end().end(); 

//     });
// });


// COUNTER HOME PAGE 

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = '<strong>' + Math.floor(progress * (end - start) + start) + '</strong>';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

$.fn.inView = function () {
    if (!this.length)
        return false;
    var rect = this.get(0).getBoundingClientRect(); // tells me at what point on screen is the id recalled bellow
        console.log(rect.top + rect.left)
    return (
        rect.top <= 150 &&
        rect.top >= 0 

        // if the coordinates of the rect containing the element ( signed with the id bellow ) are higher than 0 and smaller than the h&w of the screen it will start the animation on event

        //rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        //rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );

};

let done = false; //makes the animation start only once 

$(window).on('scroll', function () {
    console.log('done ' + done)
    console.log('counter' + $('#counter').inView())
    if ($('#counter').inView() && !done) {

        const objOras = document.querySelector("#valueOras");
        animateValue(objOras, 0, 20, 1500);

        const objCase = document.querySelector("#valueCase");
        animateValue(objCase, 0, 500, 1500);

        console.log('sono entrato, parte animazione')

        const objComercial = document.querySelector("#valueComercial");
        animateValue(objComercial, 0, 316, 1500);

        const objParc = document.querySelector("#valueParc");
        animateValue(objParc, 0, 80, 1500);
        done = true; // makes the animation start only once
    }

    if ($(this).scrollTop() > 500) {
        $('#fixed-modal-btn').addClass('fixed-btn');
    } else {
        $('#fixed-modal-btn').removeClass('fixed-btn');
    }
});

// CONTACT FORM

$(document).ready(function () {

    /*============================================
    Page Preloader
    ==============================================*/

    $(window).load(function () {
        $('#page-loader').fadeOut(500, function () {
            loadGmap();
        });

    })

    /*============================================
    Header
    ==============================================*/

    $('#home').height($(window).height() + 50);

    $.backstretch('assets/images/header-bg.jpg');

    $(window).scroll(function () {
        var st = $(this).scrollTop(),
            wh = $(window).height(),
            sf = 1.2 - st / (10 * wh);

        $('.backstretch img').css({
            'transform': 'scale(' + sf + ')',
            '-webkit-transform': 'scale(' + sf + ')'
        });

        $('#home .container').css({ 'opacity': (1.4 - st / 400) });

        if ($(window).scrollTop() > ($(window).height() + 50)) {
            $('.backstretch').hide();
        } else {
            $('.backstretch').show();
        }

    });

    var st = $(this).scrollTop(),
        wh = $(window).height(),
        sf = 1.2 - st / (10 * wh);

    $('.backstretch img').css({
        'transform': 'scale(' + sf + ')',
        '-webkit-transform': 'scale(' + sf + ')'
    });

    $('#home .container').css({ 'opacity': (1.4 - st / 400) });


    /*============================================
    Navigation Functions
    ==============================================*/
    if ($(window).scrollTop() < ($(window).height() - 50)) {
        $('#main-nav').removeClass('scrolled');
    }
    else {
        $('#main-nav').addClass('scrolled');
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() < ($(window).height() - 50)) {
            $('#main-nav').removeClass('scrolled');
        }
        else {
            $('#main-nav').addClass('scrolled');
        }
    });

    /*============================================
    ScrollTo Links
    ==============================================*/
    $('a.scrollto').click(function (e) {
        $('html,body').scrollTo(this.hash, this.hash, { gap: { y: -70 } });
        e.preventDefault();

        if ($('.navbar-collapse').hasClass('in')) {
            $('.navbar-collapse').removeClass('in').addClass('collapse');
        }
    });

    /*============================================
    Skills
    ==============================================*/
    $('.skills-item').each(function () {
        var perc = $(this).find('.percent').data('percent');

        $(this).data('height', perc);
    })

    $('.touch .skills-item').each(function () {
        $(this).css({ 'height': $(this).data('height') + '%' });
    })

    $('.touch .skills-bars').css({ 'opacity': 1 });

    /*============================================
    Project thumbs - Masonry
    ==============================================*/
    $(window).load(function () {

        $('#projects-container').css({ visibility: 'visible' });

        $('#projects-container').masonry({
            itemSelector: '.project-item:not(.filtered)',
            //columnWidth:370,
            isFitWidth: true,
            isResizable: true,
            isAnimated: !Modernizr.csstransitions,
            gutterWidth: 25
        });

        scrollSpyRefresh();
        waypointsRefresh();

    });

    /*============================================
    Filter Projects
    ==============================================*/
    $('#filter-works a').click(function (e) {
        e.preventDefault();

        if ($('#project-preview').hasClass('open')) {
            closeProject();
        }

        $('#filter-works li').removeClass('active');
        $(this).parent('li').addClass('active');

        var category = $(this).attr('data-filter');

        $('.project-item').each(function () {
            if ($(this).is(category)) {
                $(this).removeClass('filtered');
            }
            else {
                $(this).addClass('filtered');
            }

            $('#projects-container').masonry('reload');
        });

        scrollSpyRefresh();
        waypointsRefresh();
    });

    /*============================================
    Project Preview
    ==============================================*/
    $('.project-item').click(function (e) {
        e.preventDefault();

        var elem = $(this),
            title = elem.find('.project-title').text(),
            descr = elem.find('.project-description').html(),
            slidesHtml = '<ul class="slides">',
            elemDataCont = elem.find('.project-description');

        slides = elem.find('.project-description').data('images').split(',');

        for (var i = 0; i < slides.length; ++i) {
            slidesHtml = slidesHtml + '<li><img src=' + slides[i] + ' alt=""></li>';
        }

        slidesHtml = slidesHtml + '</ul>';

        $('#project-title').text(title);
        $('#project-content').html(descr);
        $('#project-slider').html(slidesHtml);

        openProject();

    });

    function openProject() {

        $('#project-preview').addClass('open');
        $('.masonry-wrapper').animate({ 'opacity': 0 }, 300);

        setTimeout(function () {
            $('#project-preview').slideDown();
            $('.masonry-wrapper').slideUp();

            $('html,body').scrollTo(0, '#filter-works',
                {
                    gap: { y: -20 },
                    animation: {
                        duration: 400
                    }
                });

            $('#project-slider').flexslider({
                prevText: '<i class="fa fa-angle-left"></i>',
                nextText: '<i class="fa fa-angle-right"></i>',
                animation: 'slide',
                slideshowSpeed: 3000,
                useCSS: true,
                controlNav: true,
                pauseOnAction: false,
                pauseOnHover: true,
                smoothHeight: false,
                start: function () {
                    $(window).trigger('resize');
                    $('#project-preview').animate({ 'opacity': 1 }, 300);
                }
            });

        }, 300);

    }

    function closeProject() {

        $('#project-preview').removeClass('open');
        $('#project-preview').animate({ 'opacity': 0 }, 300);

        setTimeout(function () {
            $('.masonry-wrapper').slideDown();
            $('#project-preview').slideUp();

            $('#project-slider').flexslider('destroy');
            $('.masonry-wrapper').animate({ 'opacity': 1 }, 300);


        }, 300);

        setTimeout(function () {
            $('#projects-container').masonry('reload');
        }, 500)
    }

    $('.close-preview').click(function () {
        closeProject();
    })

    /*============================================
    Contact Map
    ==============================================*/
    function loadGmap() {

        if ($('#gmap').length) {

            var map;
            var mapstyles = [{ "stylers": [{ "saturation": -100 }] }];

            var infoWindow = new google.maps.InfoWindow;

            var pointLatLng = new google.maps.LatLng(mapPoint.lat, mapPoint.lng);

            var mapOptions = {
                zoom: mapPoint.zoom,
                center: pointLatLng,
                zoomControl: true,
                panControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                overviewMapControl: false,
                scrollwheel: false,
                styles: mapstyles
            }

            map = new google.maps.Map(document.getElementById("gmap"), mapOptions);

            var marker = new google.maps.Marker({
                position: pointLatLng,
                map: map,
                title: mapPoint.linkText,
                icon: mapPoint.icon
            });

            var mapLink = 'https://www.google.com/maps/preview?ll=' + mapPoint.lat + ',' + mapPoint.lng + '&z=14&q=' + mapPoint.mapAddress;

            var html = '<div class="infowin">'
                + mapPoint.infoText
                + '<a href="' + mapLink + '" target="_blank">' + mapPoint.linkText + '</a>'
                + '</div>';

            google.maps.event.addListener(marker, 'mouseover', function () {
                infoWindow.setContent(html);
                infoWindow.open(map, marker);
            });

            google.maps.event.addListener(marker, 'click', function () {
                window.open(mapLink, '_blank');
            });

        }
    }
    /*============================================
    Waypoints Animations
    ==============================================*/
    $('#skills').waypoint(function () {

        $('.skills-item').each(function () {
            $(this).css({ 'height': $(this).data('height') + '%' });
        })

        $('.skills-bars').css({ 'opacity': 1 });

    }, { offset: '40%' });

    $('.scrollimation').waypoint(function () {
        $(this).addClass('in');
    }, { offset: '90%' });

    /*============================================
    Resize Functions
    ==============================================*/
    var thumbSize = $('.project-item').width();

    $(window).resize(function () {
        $('#home').height($(window).height() + 50);

        if ($('.project-item').width() != thumbSize) {

            $('#projects-container').masonry('reload');
            thumbSize = $('.project-item').width();
        }

        scrollSpyRefresh();
        waypointsRefresh();
    });

    /*============================================
    Refresh scrollSpy function
    ==============================================*/
    function scrollSpyRefresh() {
        setTimeout(function () {
            $('body').scrollspy('refresh');
        }, 1000);
    }

    /*============================================
    Refresh waypoints function
    ==============================================*/
    function waypointsRefresh() {
        setTimeout(function () {
            $.waypoints('refresh');
        }, 1000);
    }
});

$(document).ready(function () {
    $('#contact-form').submit(function () {

        var buttonCopy = $('#contact-form button').html(),
            errorMessage = $('#contact-form button').data('error-message'),
            sendingMessage = $('#contact-form button').data('sending-message'),
            okMessage = $('#contact-form button').data('ok-message'),
            hasError = false;

        $('#contact-form .error-message').remove();

        $('.requiredField').each(function () {
            if ($.trim($(this).val()) == '') {
                var errorText = $(this).data('error-empty');
                $(this).parent().append('<span class="error-message" style="display:none;">' + errorText + '.</span>').find('.error-message').fadeIn('fast');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).is("input[type='email']") || $(this).attr('name') === 'email') {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this).parent().append('<span class="error-message" style="display:none;">' + invalidEmail + '.</span>').find('.error-message').fadeIn('fast');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        if (hasError) {
            $('#contact-form button').html('<i class="fa fa-times"></i>' + errorMessage);
            setTimeout(function () {
                $('#contact-form button').html(buttonCopy);
            }, 2000);
        }
        else {
            $('#contact-form button').html('<i class="fa fa-spinner fa-spin"></i>' + sendingMessage);

            var formInput = $(this).serialize();
            $.post($(this).attr('action'), formInput, function (data) {
                $('#contact-form button').html('<i class="fa fa-check"></i>' + okMessage);

                $('#contact-form')[0].reset();

                setTimeout(function () {
                    $('#contact-form button').html(buttonCopy);
                }, 2000);

            });
        }

        return false;
    });
});

// FLIP CARDS

$(function () {
    $('#section-feature .sf-wrap')
        .hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        })
        .click(function (event) {
            //if (event.target.nodeName != 'A') {
            $(this).toggleClass('active');
            //}
        });
});


//// GALLERY MODAL /////


// Open the Modal

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}