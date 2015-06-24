(function ($, window, document, undefined) {
    'use strict';

    /**
     * interaction for timeline widget
     */

    ajl.modules.timeline = {

        tag: 'timeline',

        init: function () {
            console.log(this.tag);

            // variables
            // ----------------------------------------

            var $timeline           = $('.timeline');
            var $timeline_controls  = $timeline.find('.timeline-controls');
            var $timeline_items     = $timeline.find('.timeline-items');
            var resize_timeout      = undefined;
            var timeline_height     = 0;
            
            // functions
            // ----------------------------------------
            function goto_timeline_item(item) {
                var index = 0;
                
                // Determine whether a timeline control or a timeline item button was clicked...
                if (item.isNumber()) {
                    index = item;
                } else if ($(this).closest('.timeline-controls').length) {
                    index = $timeline_controls.find('a').index(this);
                } else if ($(this).closest('.timeline-items').length) {
                    index = $timeline_items.find('button').index(this);
                }
                
                // ...then determine the index of the item and do the following:
                //  - unset the active timeline control bubble, set the new one active
                //  - scroll the timeline items to the appropriate spot
                //  - bonus points! parallax the background to the proper place
                $timeline_controls.find('li').removeClass('active');
                $timeline_controls.find('li:eq('+index+')');
                $next_item = $timeline_items.find('.info-box:eq('+index+')');
                $timeline_items.css('transform', 'translateY(-'+ ($next_item.offset().top + (timeline_height - $next_item.height) / 2) +'px)');
                //$timeline.find('.photo')
            }

            function timeline_adjust() {
                var tallest = 0;
                var margin = $timeline_items[0].css('margin-top').split("px")[0] * 2;
                $timeline_items.find('.info-box').each(function() {
                    var height = $this.height();
                    if (height > tallest) {
                        tallest = height;
                    }
                });
                
                // Adjust height of timeline
                timeline_height = tallest + margin;
                $timeline.css('height', timeline_height + "px");
                
                // Adjust position of timeline controls
                $timeline_controls.css('margin-top', (timeline_height - $timeline_controls.height) / 2);
                
                // Adjust position of timeline item (based on the active item)
                goto_timeline_item($timeline_controls.find('li').index($timeline_controls.find('li.active')));
            }
            
            // If the timeline exists on this page, set up event listeners
            if ($timeline.length) {
                // Set first timeline active
                $timeline_controls.find('li:first').addClass('active');
                
                // Set click handlers
                $timeline_controls.on("a", "click", goto_timeline_item);
                $timeline_items.on("button", "click", goto_timeline_item);
                
                // Resize event listener (with 50ms buffer window)
                $(window).on('resize', function(){
                    clearTimeout (resize_timeout);
                    resize_timeout = setTimeout(timeline_adjust, 50);
                }).trigger();
            }
            
        }
    };

}($ || jQuery, window, window.document));
