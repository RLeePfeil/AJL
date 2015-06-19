(function (window, document, undefined) {
    'use strict';


    window.parlec = {


        tag: 'P A R L E C',

        DATA: {},  // empty object we can populate after requesting JSON

        modules: {},  // empty object we can attach cusomt objects to


        init: function() {
            console.log(this.tag);

            // initialize all modules
            for (var module in this.modules) {
                this.modules[module].init();
            }
            
            /* * * * * * * * * *
             * Event handlers  *
             * * * * * * * * * */
            
            // Smooth scroll magellan links (to the appropriate spots)
            $('a[data-magellan-arrival]').on('click', function(){
                $('html,body').animate({
                    scrollTop: $('#' + $(this).attr('data-magellan-arrival')).offset().top - Math.floor($('.header').height())
                }, 1000);
                
                return false;
            });
            
            // Open dealer map (desktop and mobile)
            $('#btn-find-a-dealer').on('click', function(){
                $('#find-a-dealer').addClass('open');
                $('.dealer-map').slideDown();
                
                 $('html,body').animate({
                    scrollTop: $(this).offset().top - Math.floor($('.header').height() / 2)
                }, 1000);
            });
            
            // Open company info when bullet is clicked on
            $('.dealer-map').find('span.bullet').on('click', function(){
                // Hide others
                $('.dealer-map').find('li').removeClass('open');
                // Show this company info
                $(this).parent().addClass('open');
                return false; // Return false so the $(section) click event isn't triggered via event bubbling
            });
            
            // When clicking on a pointer on mobile, show the info block
            $('span.pointer').on('click', function(){
                $('.info-block').removeClass('open');
                $(this).next('.info-block').addClass('open');
                return false; // Return false so the $(section) click event isn't triggered via event bubbling
            }).filter(':eq(0)').trigger('click'); // Start with the first one open
            
            // When clicking next/prev in info blocks on mobile, show the next/prev info block and scroll to it
            $('.next, .prev', '#presetter').on('click', function(){
                var $this = $(this),
                    $nextPointer;
                
                // Find the next pointer
                if ($this.hasClass('prev')) {
                    $nextPointer = $('.pointer:eq('+ ($('.info-block').index($this.closest('.info-block')) - 1) +')');
                } else {
                    $nextPointer = $('.pointer:eq('+ ($('.info-block').index($this.closest('.info-block')) + 1) +')');
                }
                
                // Trigger next pointer and scroll to opening info box position
                setTimeout(function(){$nextPointer.trigger('click')}, 500);
                var $nextInfoBlock = $nextPointer.next('.info-block').show();
                $('html,body').animate({
                    scrollTop: $nextInfoBlock.offset().top - $nextInfoBlock.height() - 20
                }, 1000);
            });
            
            // Close open company info block when section#presetter is clicked
            $('section#find-a-dealer').on('click', function() {
                $('.dealer-map').find('li').removeClass('open');
            });
            
            // Close open info block when section#presetter is clicked
            $('section#presetter').on('click', function(){
                $('.info-block').removeClass('open');
            });
            
            $(window).on('resize', window.parlec.onResize)
                     .on('scroll', window.parlec.onScroll)
                     .trigger('resize')
                     .trigger('scroll');
        },
        
        onResize: function(e) {
            
        },
        
        onScroll: function(e) {
            
        },

        utils: {
            render_template: function(settings) {
                /**
                 * Dependencies: Handlebar.js, jQuery.js
                 *
                 * settings = {
                 *   template: '#script-id',
                 *   target: '#query-string',
                 *   context: {},
                 *   append: boolean (optional),
                 *   prepend: boolean (optional)
                 * }
                 */
                // get Handlebar template
                if (!settings.template || settings.template ==='') {
                  $(settings.target).html(''); // if template is empty, clear HTML of target
                  return;
                }
                var template = Handlebars.compile($(settings.template).html());

                // render it (check it we have a context)
                var html = template( settings.context ? settings.context : {} );

                if (settings.append) $(settings.target).append(html);
                else if (settings.prepend) $(settings.target).prepend(html);
                else $(settings.target).html(html);
            }

        }

    };


    $(document).ready(function () {
        $(document).foundation();
        parlec.init();
    });


}(window, window.document));