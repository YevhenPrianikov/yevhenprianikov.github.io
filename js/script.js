
// Настройка СЛИк-слайдера
$(document).ready(function () {
    $('.carousel__inner').slick(
        {
            speed: 1000,
            // скорость перелистывания слайдера
            adaptiveHeight: true,
            // Адаптировать слайдер под высоту картинки
            prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left.png"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.png"></button>',
            // Подставляем свои картинки-стрелки вместо дєфолтных от СЛИКа
            responsive: [ // адаптация СЛИК-слайдера под разные разрешения экрана
                {
                    breakpoint: 900,
                    settings: {
                        dots: true, // включаем точки
                        infinite: true,
                        arrows: false // отключаем стрелки

                    }
                }

            ]
        }
    );



    // Табы при помощи библиотеки jquery (https://denis-creative.com/jquery-tabs/)
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function()
    // $('ul.catalog__tabs') - получаем ul элемент с классом .catalog__tabs (плашка с ТАБАМИ)
    // on('click', 'li:not(.catalog__tab_active) - кликаем по одному из элементов который находится внутри и у которого нет класса .catalog__tab_active
    // условие li:not(.catalog__tab_active) - кликаем на лист айтем у которого нет определённого класса .catalog__tab_active
     {
        $(this)
        // $(this) - ссылается на тот элемент на который только что нажали
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        //   .addClass('catalog__tab_active') - добавляем класс активности
        // siblings() - все соседние табы, не включая тот таб что мы нажали
        // .removeClass('catalog__tab_active') - удаляем такой класс если он в них присутствует
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        //   .closest('div.container') - находим ближайший єлемент (div-блок с классом container - родитель)
        // желательно было бы всю структуру с табами вынести в еще один отдельный блок что бы не использовать container
        // .find('div.catalog__content') - внутри этого контейнера ищем div-блок с классом catalog__content
        // .removeClass('catalog__content_active') - у тех элементов которые мы нашли - удаляем класс catalog__content_active
        // .eq($(this).index()) - получаем тот номер элемента на который мы нажали
        // .addClass('catalog__content_active') - и определённому контенту под определённым нмером добавляем класс catalog__content_active
      });



    //   Переключение информации внутри каждой карточки при помощи библиотеки jquery
    //   $() - функция которая помогает получать все элементы по определённому селектору со страницы. Селектор - это классы, теги, id...

    // $('.catalog-item__link').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__contetnt').eq(i).toggleClass('catalog-item__contetnt_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });

    // $('.catalog-item__back').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__contetnt').eq(i).toggleClass('catalog-item__contetnt_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });
    
    // при клике на определённые ссылки что бы что-то происходило
    // .each() - метод (перебор каждого элемента)
    // $(this) - ссыдаемся на каждую ссылку которую мы перебираем
    // on('click') - на каждую ссылку будем кликать
    // function(e) - что будет происходить после этого клика
    // preventDefault() - отмена стандартного поведения браузера при переходе по ссылкам - это особенно часто используется на ссылках, что бы не переходили по другому адресу а выполняли какие-то другие действия
    // .toggleClass() - переключение класса
    // eq() - получение элемента по определённому индексу, т.е. по порядку
    // i - отвечает за номер по порядку


    // Оптимизируем код, т.к. он почти весь повторяется
    // Создаём функцию с названием toggleSlide
    // item - аргумент который мы передаём (название придумываем сами)
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__contetnt').eq(i).toggleClass('catalog-item__contetnt_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');




    // МОДАЛЬНЫЕ ОКНА при помощи библиотеки jquery

    // $('[]') - получаем элементы по дата-атрибуту
    // .fadeOut() - красиво и анимированно скрывает элементы на странице
    // .on('click', function()) - при клике по єлементу запускаем функцию
    // $('.класс, id') - получаем элемент по классу
    // .fadeIn() - проявляем (показываем) элемент на странице
    // .fadeIn(slow, fast, кол-во милисекунд) - можно указать скорость анимации

        // Консультация
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

        // Закрываем модальное/ные окно/а
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

        // Купить
    $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn();
    });
    

        // Подставляем название товара в модальное окно
        // (если использовать скрипт снизу то скрипт КУПИТЬ не нужен)
        
    // .each - перебираем все кнопки
    // i - элемент отвечающий за номер по порядку
    // $(this) - та кнопка на которую сейчас нажал
    // $('#order .modal__descr') - внутри модального окна есть класс .modal__descr
    // .text() - вовнутрь хотим поместить текст
    // .text() получаем текст который есть внутри $('#order .modal__descr') элемента
    // но если внутри .text(какой-то текст), то этот текст помещаем вовнутырь этого элемента
    // .eq(i) - получаем определённый элемент по порядку
    $('.button_mini').each(function(i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        // мы получили то что находится внутри этого элемента $('.catalog-item__subtitle').eq(i).text()
        // и подставили вовнутырь $('#order .modal__descr') при помощи .text()
        $('.overlay, #order').fadeIn();
        });
    });


            // Валидация форм
            // $('.feed-form') - получаем элементы формы которую будем валидировать
            // .validate() - пользуемся методом который внутри плагина jquery.validate.min.js
    // $('#consultation-form').validate();
    // $('#consultation form').validate({
    //         // прописываем правила для инпутов
    //     rules: {
    //         name: "required",
    //         phone: "required",
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //         // можем сами прописывать нужные нам сообщения на нужном языке
    //     messages: {
    //         name: "Введите своё имя",
    //         phone: "Ввадите свой мобильный номер",
    //         email: {
    //           required: "Введите свою почту",
    //           email: "Введите почту в формате: name@domain.com"
    //         }
    //       }
        
    // });
    // $('#order form').validate();



    // Оптимизируем код валидации трёх форм и создаём функцию
    // после чего верхние три валидации можно удалить
    function validateForms(form) {
        $(form).validate({
            // прописываем правила для инпутов
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            // можем сами прописывать нужные нам сообщения на нужном языке
            messages: {
                name: "Введите своё имя",
                phone: "Ввадите свой мобильный номер",
                email: {
                  required: "Введите свою почту",
                  email: "Введите почту в формате: name@domain.com"
                }
            }
        });
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');



    // МАСКА ВВОДА ДЛЯ ТЕЛЕФОННОГО НОМЕРА при помощи библиотеки jquery
    // $('input[name=phone]') - берём тэг ИНПУТ у которого стоит name="phone"
    // данный плагин работать не будет если у ИНПУТА стоит type="number"
    $('input[name=phone]').mask("+7 (999) 999-99-99");




    // ПЕРЕНОС адреса и социальных сетей с карты вниз футера
    // -$('.footer__info__close').on('click', function() {
        // $('.footer__info_bottom').addClass('footer__info_bottom_active');
        // $('.footer__info_top').addClass('footer__info_top_active');
    
        // -$('.footer__info_top').fadeOut('slow');
        // показываем два других элемента .fadeIn('slow') - slow - скорость отображения
        // -$('.footer__info_bottom').fadeIn('slow');
    // });

    

        $('.footer__info__close').on('click', function() {
            if ($('.footer__info_bottom').hasClass("footer__info_bottom_active")) {

                $('.footer__info_top').addClass("footer__info_top_active");
                $('.footer__info_bottom').removeClass("footer__info_bottom_active");
            } else {
                $('.footer__info_bottom').addClass("footer__info_bottom_active");
                $('.footer__info_top').removeClass("footer__info_top_active");
            }
        });




    

    // СКРОЛЛ ВВЕРХ (появление/скрытие на экране)
    // $(window) - обращаемся к окну браузера
    // .scroll() - следим за СКРОЛЛ событием
    $(window).scroll(function() {
        // если наша страница (this) имеет отступ сверху при скролинге больше чем 700px
        if ($(this).scrollTop() > 700) {
            // если это условие выполнится то берём наш элемент .pageup и показываем/проявляем его на странице
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    // ПЛАВНЫЙ СКРОЛЛ ВВЕРХ (так же плавно будет работать по всем якарям на странице)
    // $("a[href^='#']") - получаем все ссылки с определёнными параметрами
    // ^ - говорим что наш атрибут начинается с решётки #
    // при клике по ссылке запускается функция
    // const _href - создаём переменную
    // получаем в эту переменную то значение которое было в атрибуте href - $(this).attr("href");
    // далее идет анимация которая написана при помощи jquery
    // у нас анимируется сам body и html


    // ==========
    // $("a[href^='#']").click(function () {
    //     const _href = $(this).attr("href");
    //     $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    //     return false;
    // });
    // ==========

    // что бы избежать ошибок чуть поправим код (под одну единственную кнопку)
    $("a[href=#up]").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });




    // Подключение wow.js
    new WOW().init();
    // далее к необходимым элементам в HTML документе добавляем класс wow чтобы элемент появлялся с анимацией при долистывании к нему пользователем

    // data-wow-duration="2s" data-wow-delay="5s" - можно добавить атрибуты с задержкой и временем отображения/воспроизседения этого элемента

    // эти данные можно найти в описании к wow.js - https://wowjs.uk/docs.html







    // https://github.com/PHPMailer/PHPMailer
    // Отправка почты при помощи библиотеки jquery
    // $('form') - бращаемся ко всем формам по ТЕГу
    // .submmit() - когда формы будут подтвержаться (когда все условия в инпутах выполнены),
    // когда прошли все валидации (у нас эта форма отправляется)
    // e.preventDefault() - отмена стандартного поведения браузера (нужно для технологии AJAX)
    // $.ajax() - метод отправки данных на сервер при помощи библиотеки jquery
    $('form').submit(function(e) {
        e.preventDefault();

        // функция валидатор
        // Если форма не прошла валидацию, то мы останавливаем эту функцию, т.е.
        // код не дойдёт до отправки запроса на smart.php
        if (!$(this).valid()) {
            return;
        }


        $.ajax({
            // настраиваем объект
            // type: "POST" - получить с сервера либо отдать
            // url: "mailer/smart.php" - указываем какой обработчик будет обрабатывать эту операцию
            // data: - те данные которые хотим отправить на сервер
            // .serialize() - метод, подготавливаем данные перед отправкой которые мы получили от пользователя
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
            // теперь нобходимо обработать ответ от сервера
        }).done(function() {
            // $(this).find("input") - внутри этой формы мы находим ИНПУТ тэги
            // .val("") - для value инпутов устанавливаем пустую строку (таким образом после отправки формы очищаются все ИНПУТы)
            $(this).find("input").val("");

            // Скрываем модальные окна после отправки письма
            $('#consultation, #order').fadeOut();
            // показываем два других элемента .fadeIn('slow') - slow - скорость отображения
            $('.overlay, #thanks').fadeIn('slow');
           
            
            // .trigger('reset') - метод (все формы должны очиститься)
            $('form').trigger('reset');
        });
        return false;
    });





});



// Тини Слайдер

// const slider = tns({
//     container: '.carousel__inner',
//     items: 1, // количество картинок которые будут отображаться в карусели
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false
//     // controlsText: [ // изменяем кнопки переключения на картинки-стрелки
//     //     '<img src="icons/arrow-left.png"></img>',
//     //     '<img src="icons/arrow-right.png"></img>'
//     // ]
// });


// document.querySelector('.prev').addEventListener('click', function () {
//     slider.goTo('prev'); 
// });
// document.querySelector('.next').addEventListener('click', function () {
//     slider.goTo('next'); 
// });





// AJAX - Когда происходят любые действия с сервером без перезагрузки страницы

// SHIFT + F5 - Сброс кэша