/**
 * main Object
 * @return this
 */
function main()
{

    /**
     * Aplicação do efeito 3d no menu
     * @param  {[String]} menuSelector    Elemento que será aplicado o meu
     * @param  {[String]} contentSelector Elemento que contém o conteúdo
     * @return {[Void]}
     */
    let set3DMeny = function (menuSelector, contentSelector)
    {

        const iconMenu = document.querySelector('.icon-menu');

        let toggleIconMenu = function () 
        {

            $(iconMenu).children('i').toggleClass('fa-bars fa-arrow-right');    
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

        iconMenu.addEventListener('click', menu.open);

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
    let rollinkify = function () {
        
        let supports3DTransforms =  document.body.style['webkitPerspective'] !== undefined || 
                                    document.body.style['MozPerspective'] !== undefined;
        
        if( supports3DTransforms ) {

            let nodes = document.querySelectorAll('.rollinkify');

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
     this.init = function () {
        try {

            maximageInit();

            set3DMeny('.meny', '.content');

            rollinkify();
        } catch (e) {
            console.error(e);
        }
     };

     return this;
};

main().init();