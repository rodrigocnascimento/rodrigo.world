"use strict";
/**
 * main Object
 * @return this
 */
 let _main = function ()
 {
    
    let printer = function () {
        let printerWidth;

        function closePrint() {
            document.body.removeChild(this.__container__);
        }

        function setPrint() {
            this.contentWindow.__container__ = this;

            this.contentWindow.onbeforeunload = closePrint;
            this.contentWindow.onafterprint = closePrint;
            this.contentWindow.document.body.style.width = printerWidth;
            this.contentWindow.focus(); // Required for IE
            this.contentWindow.print();
        }

        return {
            print: function (sURL, bodyWidth) {
                console.log([sURL, bodyWidth])
                const oHiddenFrame = document.createElement("iframe");
                printerWidth = bodyWidth;
                oHiddenFrame.onload = setPrint;
                oHiddenFrame.style.visibility = "hidden";
                oHiddenFrame.style.position = "fixed";
                oHiddenFrame.style.right = "0";
                oHiddenFrame.style.bottom = "0";
                oHiddenFrame.src = sURL;

                if (sURL !== undefined) {
                    document.body.appendChild(oHiddenFrame);
                }

            }
        }
    }    

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

            curriculum().hide();
        } catch (e) {
            console.error(e);
        }
    };

    let curriculum = function ()
    {
        return {
            print: function(printUrl) {
                printer().print(printUrl);
            },
            show: function() {
                $('.curriculum').show('slow');
                $('#logo span').html('<a href="javascript:main.curriculum().hide()"><i class="fa fa-close"></i></a>');
            },
            hide: function () {
                $('#logo span').html('r!');
                $('.curriculum').hide('slow');
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

console.log(main)

main.init();







