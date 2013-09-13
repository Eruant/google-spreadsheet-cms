/*global define, window, document*/
/*jslint nomen:true*/

/**
 * Loader
 * load a url and callback a function with the loaded data
 *
 */

define('Loader', ['Class'], function (Class) {
    'use strict';
    
    return Class.extend({
        /**
         * load a url with callback
         * @param {String} url The url of the data you want to load
         * @param {Function} callback A function to be called once the data has been loaded
         * @param {String} filetype To load jsonp or normal json
         * @param {String} type Set either a GET or POST call
         */
        load: function (url, callback, filetype, type) {
            var me = this,
                success = null,
                error = null,
                timestamp = '',
                script = null,
                xhr = null;
            filetype = filetype || 'json';
            type = type || 'GET';
            success = function (e) {
                callback(e);
            };
            error = function (e) {
                window.alert('Please enabled CORS using access-control-allow-origin');
            };
            if (filetype === 'jsonp') {
                timestamp = 'callback' + new Date().getTime();
                window[timestamp] = function (e) { success(e); };
                script = window.document.createElement('script');
                script.src = url + '&callback=' + timestamp;
                window.document.getElementsByTagName('head')[0].appendChild(script);
            } else if (url !== '') {
                xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
                if (window.XDomainRequest && !this.sameOrigin(url)) { xhr = new window.XDomainRequest(); xhr.onload = function () { success(xhr.responseText); }; }
                if (filetype === 'image' && xhr.overrideMimeType) { xhr.overrideMimeType('text/plain; charset=x-user-defined'); }
                xhr.onerror = error;
                xhr.onreadystatechange = function (e) { if (xhr.readyState === 4 && xhr.status === 200) { success(xhr.responseText); } };
                try {
                    if (Object.prototype.hasOwnProperty.call(xhr, 'withCredentials')) { xhr.open(type, url, true); } else { xhr.open(type, url); }
                    xhr.send(null);
                } catch (e) { error(e); }
            }
        },
        /**
         * check if a url is on the same domain as the browser
         * @param {String} url The url you would like to check
         */
        sameOrigin: function (url) {
            var split = url.split('/');
            if (split[0] + '//' === window.location.protocol + '//') {
                return split[2] !== window.location.host ? false : true;
            } else {
                return true;
            }
        }
    });
});