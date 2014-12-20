ko.bindingHandlers.isotope = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var $el = $(element);
        var value = ko.utils.unwrapObservable(valueAccessor());

        var $container = $(value.container);

        $container.isotope({
            itemSelector: value.itemSelector,
			  layoutMode: "masonry",
			  masonry: {
			    isFitWidth: true  
			  }
        });

        $container.isotope("appended", $el);
    }
};

var layout = function () {

    var _items = ko.observableArray([]);

    return {
        items: _items,
        setCategory: setCat,
        resetCategory: resetCat
    }

    function setCat(category) {
        var $container = $("#isotope-container");
    	$container.isotope({ filter: '.' + category })
    }

    function resetCat() {
        var $container = $("#isotope-container");
    	$container.isotope({ filter: '*' })
    }

};

jQuery(document).ready(function($) {
    var vm = new layout();
    ko.applyBindings(vm);

    $.getJSON("data.json", function(data) { 
        // Now use this data to update your view models, 
        // and Knockout will update your UI automatically 
        vm.items(data);

        $imgs = $("img.lazy");

        $imgs.lazyload({
            threshold : 200,
            failure_limit: Math.max($imgs.length - 1, 0)
        });

        $('#isotope-container').isotope({
            onLayout: function() {
                $(window).trigger("scroll");
            }        
        });

        $(".fancybox").fancybox({
            helpers: {
                title: {
                    type: 'inside'
                }
            },
            beforeShow: function () {
                // Disable right click 
                $.fancybox.wrap.bind("contextmenu", function (e) {
                    return false; 
                });
            }
        });
    })

    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    $('.scroll-to-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});