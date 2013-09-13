/**
 * @class Image
 */
/*globals define, window*/

define('Advert', ['Class'], function (Class) {
    'use strict';


    return Class.extend({

        options: {
            width: 600,
            height: 400,
            src: '',
            alt: '',
            target: '',
            url: ''
        },

        /**
         * @method init - starts the process by getting data from the Google document
         */
        init: function (id, options) {

            var me = this;
            
            this.options = options;
            this.el = window.document.getElementById(id);
            
            this.createImage();
        },
        
        createImage: function () {
            var img = window.document.createElement('img'),
                a = window.document.createElement('a');
            
            a.href = this.options.url;
            a.target = this.options.target;
            
            img.src = this.options.src;
            img.className = 'w1of1';
            //img.width = this.options.width;
            //img.height = this.options.height;
            img.alt = this.options.alt;
            
            a.appendChild(img);
            
            this.el.replaceChild(a, this.el.firstChild);
        }

    });

});
