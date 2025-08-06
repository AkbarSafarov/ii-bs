$(function() {

    const tmenu = $('.header'),
        tmenuOffset = tmenu.find('.header_top').offset();

    if (($(window).scrollTop() > tmenuOffset.top)) {
        tmenu.addClass('fixed_block');
    };

    $(window).scroll(function() {
        if (($(window).scrollTop() > tmenuOffset.top)) {
            tmenu.addClass('fixed_block');
        } else {
            tmenu.removeClass('fixed_block');
        };
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const html = document.documentElement;

    const menuBtn = document.querySelector('.burger');
    const menuWrapper = document.querySelector('.menu_burger');

    if (menuBtn && menuWrapper) {
        
        const menuClose = document.querySelector('.menuClose');

        const openedMenu = 'opened';
        const overflowHidden = 'oveflowHidden';

        function toggleMenu() {
            menuWrapper.classList.toggle(openedMenu);
            menuBtn.classList.toggle(openedMenu);
            html.classList.toggle(overflowHidden);
            html.classList.toggle('open_menu');
        }

        function closeMenu() {
            menuWrapper.classList.remove(openedMenu);
            menuBtn.classList.remove(openedMenu);
            html.classList.remove(overflowHidden);
            html.classList.remove('open_menu');
        }

        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        menuClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });

        document.addEventListener('click', function(e) {
            if (
                !menuBtn.contains(e.target) &&
                !menuWrapper.contains(e.target) &&
                menuBtn.classList.contains(openedMenu)
            ) {
                closeMenu();
            }
        });

        const menuAnchor = document.querySelectorAll('.anchor_menu li a');

        if(menuAnchor) {
            menuAnchor.forEach(button => {
                button.addEventListener('click', function (e) {
                    e.preventDefault();

                    closeMenu();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        const targetOffsetTop = targetElement.offsetTop;

                        window.scrollTo({
                            top: targetOffsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

    }


    const linkTop = document.querySelectorAll('.btn_top_link');

    if(linkTop) {
        linkTop.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                if (!document.scrollingElement._isScrolling) {
                    document.scrollingElement._isScrolling = true;

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                    setTimeout(() => {
                        document.scrollingElement._isScrolling = false;
                    }, 700);
                }
            });
        });
    }

    
    if (document.cookie.indexOf('cookies_accepted=true') !== -1) {
        const cookieBlock = document.querySelector('.cookie_block');
        if (cookieBlock) cookieBlock.remove();
    }

    if(document.querySelectorAll('.cookies-agree')) {
        document.querySelectorAll('.cookies-agree').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                // Установить куку на 1 год
                document.cookie = "cookies_accepted=true; path=/; max-age=" + (60 * 60 * 24 * 365);

                const cookieBlock = this.closest('.cookie_block');
                if (cookieBlock) cookieBlock.remove();
            });
        });

        if(document.querySelector('.cookies-close')){
            document.querySelector('.cookies-close').addEventListener('click', function (e) {
                e.preventDefault();
                const cookieBlock = this.closest('.cookie_block');
                if (cookieBlock) cookieBlock.remove();
            });
        }
    }

    const swiperSimilar = new Swiper(".mySwiper_images", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        lazy: true,
        navigation: {
            nextEl: ".swiper-images-next",
            prevEl: ".swiper-images-prev",
        }
    });

    const langBtn = document.querySelector('.dropdown-item-current');

    if(langBtn){
        langBtn.addEventListener('click', function(){
            document.querySelector('.lang_block').classList.toggle('active');
        })


        document.addEventListener('click', function(e) {
            if (
                !document.querySelector('.lang_block').contains(e.target) 
            ) {
                document.querySelector('.lang_block').classList.remove('active');
            }
        });
    }
})