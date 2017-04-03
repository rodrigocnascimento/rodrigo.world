// "use strict";

(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
        sendMessage('Hello Philip! :)');
        setTimeout(function () {
            return sendMessage('Hi Sandy! How are you?');
        }, 1000);
        return setTimeout(function () {
            return sendMessage('I\'m fine, thank you!');
        }, 2000);
    });
}.call(this));






/**
 * main Object
 * @return this
 */
 let _main = function ()
 {

    /**
     * Aplicação do efeito 3d no menu
     * @param  {[String]} menuSelector    Elemento que será aplicado o meu
     * @param  {[String]} contentSelector Elemento que contém o conteúdo
     * @return {[Void]}
     */
     let set3DMeny = function (menuSelector, contentSelector)
     {

        let toggleIconMenu = function () 
        {
            $('.icon-menu').children('i').toggleClass('fa-bars fa-arrow-right');    
        }

        let menu = Meny.create({
            // The element that will be animated in from off screen
            menuElement: document.querySelector(menuSelector),

            // The contents that gets pushed aside while Meny is active
            contentsElement: document.querySelector(contentSelector),

            // The alignment of the menu (top/right/bottom/left)
            position: 'left',
            threshold: 40,
        });

        $('.icon-menu').on('click', menu.open);
        $('.link-curriculum').on('click', menu.close);

        menu.addEventListener('open', toggleIconMenu);

        menu.addEventListener('closed', toggleIconMenu);
    }

    let maximageInit = function ()
    {

        $("#background-content").maximage({
            cycleOptions: {
                speed: 800,
                timeout: 8000
            }
        });

        /**
         * ainda não entendi pq o maximage precisa disso
         * @param {[type]} window Interface window
         */
         window.onload = function () 
         {
            document.querySelector('body').style.display = 'block';
        };
    }

    /**
     * Aplica o efeito de roll nos links selecionados
     * @return void
     */
     let rollinkify = function () 
     {

        let supports3DTransforms =  document.body.style['webkitPerspective'] !== undefined || 
        document.body.style['MozPerspective'] !== undefined;
        
        if( supports3DTransforms ) {

            let nodes = document.querySelectorAll('.linkify');

            for(let  i = 0, len = nodes.length; i < len; i++ ) {
                let node = nodes[i];

                if( !node.className || !node.className.match( /roll/g ) ) {
                    node.className += ' roll';
                    node.innerHTML = '<span data-title="'+ node.text +'">' + node.innerHTML + '</span>';
                }
            };
        }
    };


    /**
     * Método que inicializa a Classe
     * @return void
     */
     let init = function () 
     {

        try {

            maximageInit();

            set3DMeny('.meny', '.content');

            rollinkify();

            // curriculum().hide();
        } catch (e) {
            console.error(e);
        }
    };

    let curriculum = function ()
    {
        return {
            show: function() {
                $('.curriculum').slideDown();
                $('.cv-opts').slideDown();
                $('.logo span').html('<a href="javascript:main.curriculum().hide()"><i class="fa fa-close"></i></a>');
            },
            hide: function () {
                $('.curriculum').slideUp();
                $('.cv-opts').slideUp();
                $('.logo span').html('r!');
            }
        }
    };
     // Retorna somente os métodos públicos
     return {
        init: init,
        curriculum: curriculum
    };
};

let main = new _main();
main.init();
