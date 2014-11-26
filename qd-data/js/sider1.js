// JavaScript Document
(function() {

    var Slider = function(opts){

        var me = this,
            defaults = {
                $elem: null,
                width: null,
                selector: {
                    play: '.play',
                    item: 'li',
                    next: '.next',
                    prev: '.prev'
                },
                speed: 2000,
                rollSpeed: 500,
                btn: true,
                direction: 'right'
            };

        me.opt = $.extend({}, defaults, opts);
        me.init();

    };

    Slider.prototype = {

        init: function(){
            var me = this, o = this.opt;

            o.cur = 0;
            o.running = false;
            o.timer = null;
            me._events = {};

            o.$play = o.$elem.find(o.selector.play);

            me.render(o);
            me.bindEvents();
            me.autoPlay();

            me.goTo(0);
        },

        render: function(o){
            var me = this,
                $play = o.$play,
                $item = $play.find(o.selector.item);

            o.count = $item.length;            
            $play.css('width', (o.count + 1) * 100 + '%');
            $item.css('width', (1 / (o.count + 1)) * 100 + '%');
            $item.first().clone().appendTo($item.parent());

            o.btn && me.createBtn(o);
        },

        createBtn: function(o){
            var me = this, span = '', btn;

            for(var i = 0; i < o.count; i++){
                span += '<span></span>';
            }

            btn = '<div class="btn" >'+ span +'</div>';

            var $elem = o.elem, $btn = $(btn).appendTo($elem), btnW = $btn.width();

            this.$btn = $btn;

            $btn.css('margin-left', -btnW*0.5);

            $btn.on('click', 'span', function() {
                me.goTo($(this).index());
            });

            this.on('beforeshow', function(cur) {
                $btn.find('span').eq(cur).addClass('cur').siblings().removeClass('cur');
            });
        },

        bindEvents: function() {
            var me = this,
                o = this.opt,
                $elem = o.$elem,
                $next = $elem.find(o.selector.next),
                $prev = $elem.find(o.selector.prev);

            $next.on('click', function() {
                me.goNext();
            });

            $prev.on('click', function() {
                me.goPrev();
            });
            
            $elem.mouseenter(function() {
                me.abort();
            }).mouseleave(function() {
                me.start();
            });
        },

        autoPlay: function() {
            this.start();
        },

        start: function() {
            var me = this,
                o = me.opt;

            o.timer = setInterval(function() {
                me[o.direction == 'right' ? 'goNext' : 'goPrev']();
            }, o.speed);

            me.fire('start');
        },

        abort: function() {
            var me = this, o = me.opt;

            clearInterval(o.timer);
            o.timer = null;
            me.fire('abort');
        },

        goTo: function(index){
            var o = this.opt;

            o.cur = index;
            this.roll(index);
        },

        goNext: function() {
            var o = this.opt, offset, i;
            if (o.running) return;

            if (o.cur == (o.count - 1)) {
                offset = o.count;
                o.cur = 0;
            } else {
                (o.cur == 0) && this.resetPosition(o, 0);
                offset = ++o.cur;
            }

            i = (offset == o.count) ? 0 : offset;

            this.roll(offset);
        },

        goPrev: function() {
            var o = this.opt;
            if (o.running) return;

            if (o.cur == 0) {
                o.cur = offset = o.count - 1;
                this.resetPosition(o, -o.count * 100 + '%');
            } else {
                offset = --o.cur;
            }

            this.roll(offset);
        },

        resetPosition: function(o, left) {
            o.$play.css({left: left});
        },

        roll: function(offset) {
            var me = this,
                o = this.opt,
                w = -offset * 100 + '%';

            o.running = true;
            me.fire('beforeshow', o.cur);

            o.$play.stop().animate({left: w}, o.rollSpeed, function() {
                o.running = false;
            });
        },

        on: function(event, func, scope) {
            !this._events[event] && (this._events[event] = []);
            this._events[event].push(func);
        },

        fire: function(event) {
            var events = this._events[event],
                args = Array.prototype.slice.call(arguments, 1),
                res;

            if (events) {
                for (var i = 0, len = events.length; i < len; i++) {
                    res = events[i].apply(undefined, args);
                    if (res === false) return res;
                }
            }
        },

        off: function(event, func) {
            if (func && this._events[event]) {
                var e = this._events[event], index = $.inArray(func, e);
                if (index !== -1) {
                    e.splice(index, 1);
                }
            } else {
                delete this._events[event];
            }
        }


    };

    $.fn.Slider = function(opts) {
        opts = opts || {};

        for(var i = 0, l = this.length; i < l; i++) {
            return new Slider($.extend({elem: this[i]}, opts));
        }
    };

} ())