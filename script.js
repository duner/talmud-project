$(document).ready(function() {
    questionBlocks = $('.question-block');
    for (var i = 0; i < questionBlocks.length; i++) {
        $element = $(questionBlocks[i]);
        if ($element.data('title') !== undefined) {
            createLabel($element);
            createWaypoints($element);
        }
    }

    function createLabel(element) {
        label = "<div class='label'>" + $(element).data('title') + "</div>";
        $(label).appendTo(element);
    }

    function createWaypoints($element) {

        var $label = $element.children('.label');

        var waypointDisplayLabel = new Waypoint.Inview({
            element: $element,
            enter: function(direction) {
                $label.addClass("active");
                if (direction == "down") {
                    $label.addClass("floating");
                    $label.removeClass("fixed");
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
                }
            },
            exited: function(direction) {
                $label.removeClass("active");
            }
        });
    }

    function elementTopInViewport(el) {
        var top = el.offsetTop;
        return (top < window.pageYOffset);
    }

    function elementBottomInViewport(el) {
        var bottom = $(el).offset().top + $(el).height();
        return (bottom < window.pageYOffset);
    }
});