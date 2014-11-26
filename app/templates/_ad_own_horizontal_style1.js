Tagtoo = ( typeof Tagtoo === 'undefined' ) ? {} : Tagtoo;

$(Tagtoo).on({

    // 個別特殊事件
    customEvent: function () {
        if (window.console) { console.log('only trigger once at first render!!') }
        $(Tagtoo).trigger("horizontalStyle1AddClass", [0]);
    },

    horizontalStyle1AddClass: function () {

        var $that = $(".img_footer_page");

        $that.each(function(index) {
            $(this).removeClass("custom");
            $(this).removeClass("left");
            $(this).removeClass("right");
        });

        $that.eq(Tagtoo.layout.img_footer_num/2).addClass("custom");

        for(var i = 0 ; i < Tagtoo.layout.img_footer_num/2; i++) {
            $that.eq(i).addClass("left");
        }

        for(var i = Tagtoo.layout.img_footer_num/2 ; i < Tagtoo.layout.img_footer_num; i++) {
            $that.eq(i).addClass("right");
        }

    },

    horizontalStyle1MouseenterEvent: function(event, pages, obj) {

        // thumbnail
        var $that = obj.parent();
        var thumbnailWidth = $that.width();
        var $item = $that.find('.item');

        // 判斷是左邊還是右邊
        if(pages){
            if( $that.hasClass("left") && (pages[3]%Tagtoo.layout.item_num)<(Tagtoo.layout.item_num/2) ) {

                $item.css({
                    "marginLeft": thumbnailWidth
                });

            } else if ($that.hasClass("right")) {

                $item.css({
                    "marginRight": thumbnailWidth,
                    "float": "right"
                });
            }

            $item.animate({
                width: Tagtoo.layout.itemWidth
            }, 300);
        }
    },

    horizontalStyle1MouseleaveEvent: function (event, pages, obj) {
        var $that = obj.parent();
        var $item = $that.find('.item');
        $item.animate({
            width: 0
        }, 300);
    }
});