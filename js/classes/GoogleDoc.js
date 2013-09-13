/**
 * GoogleDoc
 * example module
*/

/*global define, window, document*/
/*jslint nomen:true*/

define('GoogleDoc', ['Class', 'Loader'], function (Class, Loader) {
    'use strict';
    
    return Class.extend({
        init: function (id, options) {
            var me = this,
                loader = new Loader();
            
            this.options = options;

            loader.load('//spreadsheets.google.com/feeds/list/0AnUyb0BTBC4NdE5OWWlweDljTkRWN1V2Mnp3R01OclE/od6/public/values?alt=json', function (data) {
                me.output(data.feed.entry);
            }, 'jsonp');
        },
        output: function (items) {
            for (var i = 0; i < items.length; i += 1) {
                console.log(i, items[i].gsx$url.$t, items[i].gsx$module.$t, items[i].gsx$data.$t);
            }
        }
    });
});