$(document).ready(function() {

    questionBlocks = $('.question-block');
    for (var i = 0; i < questionBlocks.length; i++) {
        $element = $(questionBlocks[i]);
        if ($element.data('title') !== undefined) {
            createLabel($element);
            createWaypoints($element);
        }
    }

    $('.popover').webuiPopover({
        width: 300,
    });


    window.onscroll = function() {
        removeLabelsIfNoSpace(questionBlocks);
    };

    function createLabel(element) {
        label = "<div class='label'>" + $(element).data('title') + "</div>";
        $(label).appendTo(element);
    }

    function createWaypoints($element) {

        var $label = $element.children('.label');

        var waypointDisplayLabel = new Waypoint.Inview({
            element: $element,
            enter: function(direction) {
                if (direction == "down") {
                    $label.addClass("floating");
                    $label.removeClass("fixed");
                } else {
                    $label.addClass("active");
                }
            },
            entered: function(direction) {
                if (direction == "down") {
                    $label.addClass("fixed");
                    $label.removeClass("floating");
                }
            },
            exit: function(direction) {
                if (direction == 'up') {
                    $label.removeClass("fixed");
                    $label.addClass("floating");
                } else {
                }
            },
            exited: function(direction) {
                console.log(direction)
                if (direction == 'up') {
                    $label.addClass('exited-up')
                } else {
                    $label.removeClass('exited-up')
                }
                $label.removeClass('floating');
                $label.addClass('fixed');
            }
        });
    }

    function removeLabelsIfNoSpace($questionBlocks, $label) {
        for (var i = 0; i < $questionBlocks.length; i++) {
            var $element = $(questionBlocks[i])
            var $label = $element.children('.label');
            if ($element.data('title') !== undefined) {
                var result = checkIfEnoughSpace($element, $label);
                if (result) {
                    $label.removeClass('active');
                } else {
                    $label.addClass('active');
                }
            }
        }
    }

    function checkIfEnoughSpace($questionBlock, $label) {
        var offset = 20;
        var heightOfLabel = $label.width();
        var eTopRelativeToWindow =  Waypoint.viewportHeight() - Math.abs($questionBlock.offset().top - $(window).scrollTop());

        var isTopVisible = $questionBlock.offset().top > $(window).scrollTop();
        var doesItFitInWindow = heightOfLabel + offset < eTopRelativeToWindow;
        var doesItFitInParent = heightOfLabel + offset < $questionBlock.height();

        if ((!isTopVisible && !doesItFitInWindow) || (doesItFitInParent && doesItFitInWindow)) { 
            return false; 
        } else { 
            return true;
        }
    }
});