window.onload = function(){
    body = document.querySelector('body');
    body.style.display = 'block';
};

var menu = Meny.create({
    // The element that will be animated in from off screen
    menuElement: document.querySelector('.meny'),

    // The contents that gets pushed aside while Meny is active
    contentsElement: document.querySelector('.content'),

    // The alignment of the menu (top/right/bottom/left)
    position: 'left',
    threshold: 40,
});

var supports3DTransforms =  document.body.style['webkitPerspective'] !== undefined || document.body.style['MozPerspective'] !== undefined;

function linkify( selector ) {
    if( supports3DTransforms ) {

        var nodes = document.querySelectorAll( selector );

        for( var i = 0, len = nodes.length; i < len; i++ ) {
            var node = nodes[i];

            if( !node.className || !node.className.match( /roll/g ) ) {
                node.className += ' roll';
                node.innerHTML = '<span data-title="'+ node.text +'">' + node.innerHTML + '</span>';
            }
        };
    }
}

linkify( '.linkify' );

;(function($){
    $background = $("#background-image");
    $background.maximage({
        cycleOptions: {
            speed: 800,
            timeout: 8000
        }
    });

    menu.addEventListener( 'open', function() {
        $('.icon-menu').children('i').toggleClass('fa-bars fa-close')
    });

    menu.addEventListener( 'closed', function() {
        $('.icon-menu').children('i').toggleClass('fa-bars fa-close')
    });

    $('.icon-menu').on('click',function(){
        menu.open();
    });
})(jQuery);