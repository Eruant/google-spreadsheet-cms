/*globals window, require, document, Tabletop*/

require(['Player', 'Advert'], function (Player, Advert) {
    'use strict';
    
    var app = {
        
        rendered: {
        },
        
        init: function () {
            
            var me = this;
            
            Tabletop.init({
                key: '0Ah2ptCYiQhr8dHVOb2J1aldZOFJPa0tjVXVZNWVnUmc',
                simpleSheet: false,
                parseNumbers: true,
                callback: function (data) {
                    me.data = data;
                    me.locationChange();
                    me.setEvents();
                }
            });
        },
        
        setEvents: function () {
            
            var me = this;
            
            window.addEventListener('hashchange', function (ev) {
                me.locationChange();
            }, false);
        },
        
        render: function (data) {
            
            var	template, slots, len, item, i, slot;
            
            // check to see if there is already a rendered version of the page
            if (this.rendered[data.url]) {
                template = this.rendered[data.url];
            } else {
            
                // element to hold new data
                template = document.createElement('div');
                
                // add the template data
                template.innerHTML = document.getElementById(data.template).innerHTML;
                
                // find the slots
                slots = template.querySelectorAll('.col');
                
                len = slots.length;
                
                for (i = 0; i < len; i += 1) {
                    item = slots[i];
                    slot = data["slot" + i];
                    
                    if (slot) {
                        if (slot === 'Navigation') {
                            item.innerHTML = this.buildNavigation(data.url);
                        } else {
                            // replace this with gadget
                            item.innerHTML = this.loadGadget(slot, data["slot" + i + "-data"]);
                        }
                    }
                }
                
                this.rendered[data.url] = template; // save the outpu
            }
            
            // replace the template data
            document.getElementById('template').innerHTML = template.innerHTML;
        },
        
        loadGadget: function (sheet, data) {
            
            var dataset = this.data[sheet].elements,
                output;

            if (data === 'all') {
                output = sheet + ': Get all results ';
            } else if (typeof data === 'number') {
                
                
                output = sheet + ': Get number ' + data;
                if (dataset[data]) {
                	output += '<br/>' + dataset[data].videoid;
                }
            } else {
                output = sheet + ': do the default action';
            }
            
            return output;
        },
        
        buildNavigation: function (currentUrl) {
            
            var len, item, i, nav, data;
            
            data = this.data.config.elements;
            
            nav = ['<ul class="nav">'];
                            
            len = data.length;
            for (i = 0; i < len; i += 1) {
                item = data[i];
                if (item.published === 1) {
                    if (item.url === currentUrl) {
                        nav.push('<li>' + item.title + '</li>');
                    } else {
                        nav.push('<li><a href="#' + item.url + '">' + item.title + '</a></li>');
                    }
                }
            }
            
            nav.push('</ul>');
            
            return nav.join('');
        },
        
        locationChange: function () {
            var cfg = this.data.config.elements,
                path = window.location.hash.replace(/^\#\/?/, '/').replace(/\/$/, ''),
                items,
                item,
                len,
                i;
            
            items = cfg;
            len = items.length;
            for (i = 0; i < len; i += 1) {
                item = items[i];
                if (path === '' || (item.url === path && item.published === 1)) {
                    this.render(item);
                    return;
                }
            }
            
            this.render(cfg[0]); // location does not match show homepage
        }
    };
    
    app.init();
    
    
});
