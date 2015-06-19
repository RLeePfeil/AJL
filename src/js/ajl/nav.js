(function ($, window, document, undefined) {
    'use strict';

    /**
     * handles the main <header> and <nav> DOM manipulations
     */

    parlec.modules.nav = {

        tag: 'nav',

        init: function () {
            console.log(this.tag);

            // variables
            // ----------------------------------------

            var $header         = $('.header');
            var $logo           = $header.find('#logo');
            var $menu           = $('#main-menu');
            var $toggle         = $('.toggle-topbar');
            var $page_header    = $('.page-header');  // the big image + page title
                if (!$page_header.length) $page_header = $('.homepage-header');
                if (!$page_header.length) $page_header = $('.product-page-header');

            var page_header_offset = $page_header.height();  // how far to scroll before adding the 'active' class




            // functions
            // ----------------------------------------
            function toggle_active_class($_menu) {

                // $_menu should be a jquery objects
                if ($_menu.hasClass('active')) {

                    // close the menu
                    $_menu.removeClass('active');

                } else {

                    // open the menu
                    $_menu.addClass('active');

                }

            }


            // setup toggle
            // ----------------------------------------
            $toggle.on('click', function (event) {
                event.preventDefault();
                toggle_active_class($menu);
                if (!$header.hasClass('header-active')) {
                    toggle_active_class($header);
                }
            });
        }

    };

}($ || jQuery, window, window.document));
