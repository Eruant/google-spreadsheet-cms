/**
 * Player
 * example module
*/

/*global define, window, document, YT*/
/*jslint nomen:true*/

define('Player', ['Class'], function (Class) {
    'use strict';
    
    return Class.extend({
        defaults: {
            height: '100%',
            width: '100%',
            videoId: '',
            events: {
                'onReady': function () {},
                'onStateChange': function () {}
            }
        },
        init: function (id, options) {
            this.el = document.getElementById(id);
            this.options = options || {};
            this.options.id = id;
            this._script();
        },
        _script: function () {
            var me = this,
                firstScriptTag = null,
                tag = document.createElement('script');
            
            tag.src = "//www.youtube.com/iframe_api";
            firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
            this.defaults.events.onReady = function (e) {
                me._ready(e);
            };
            this.defaults.events.onStateChange = function (e) {
                me._change(e);
            };
            window.onYouTubeIframeAPIReady = function () {
                me.player = new YT.Player(me.el, me.options);
            };
        },
        _ready: function (e) {
            this.el = document.getElementById(this.options.id);
            //console.log('ready', e);
        },
        _change: function (e) {
            //console.log('change', e);
            //if (e.data === YT.PlayerState.PLAYING) {
                //console.log('playing');
            //}
        },
        load: function (item) {
            this.player.cueVideoById(item.url);
        },
        hide: function () {
            this.el.style.display = 'none';
        },
        show: function () {
            this.el.style.display = 'block';
        }
    });
});