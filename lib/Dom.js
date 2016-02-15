/**
 * Created by Guanyu on 8/30/2014.
 */
CORE = {
    loadedModule: {}
};
CORE.loadModule = function(package, component) {
    var path = (package || "") + '/' + component;
    if (CORE.loadedModule[path]) {
        return;
    }
    CORE.loadedModule[path] = true;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement("script");
    script.type = 'application/javascript';
    var src = "assets/js/" + component + ".js";
    if (package) {
        src = package + "/" + src;
    }
    script.src = src;

    head.appendChild(script);

    if (CORE[component] && CORE[component]['hasCss']) {
        var css = document.createElement("link");
        css.rel = "stlyesheet";
        css.type = "text/css";
        var src = "assets/css/" + component + ".css";
        if (package) {
            src = package + "/" + src;
        }
        css.href = src;
        head.appendChild(css);
    }
    if (CORE[component] && CORE[component]['dependancies']) {
        _.each(
            CORE[component]['dependancies'],
            function(dependent) {
                if ( (typeof dependent) == "string") {
                    CORE.loadModule(package, dependent);
                }
                else {
                    CORE.loadModule(dependent.package, dependent.module);
                }

            }
        )
    }
}

CORE.Dom = Base.extend(
    null,
    {
        // create dom element using JQuery.
        // if typeof array, create each element recursively
        // if typeof string, create with innerhtml
        // if typeof object, create with attribute and child from cn
        create: function(o, parentNode) {
            var el,
                doc = document,
                useSet,
                attr,
                val,
                cn,
                confRe = /tag|children|cn|html$/i;

            if ($.isArray(o)) {                       // Allow Arrays of siblings to be inserted
                el = doc.createDocumentFragment(); // in one shot using a DocumentFragment
                for (var i = 0, l = o.length; i < l; i++) {
                    CORE.Dom.create(o[i], el);
                }
            }
            else if (typeof o == 'string') {         // Allow a string as a child spec.
                el = doc.createTextNode(o);
            }
            else {
                el = doc.createElement( o.tag || 'div' );
                useSet = !!el.setAttribute; // In IE some elements don't have setAttribute
                for (attr in o) {
                    if(!confRe.test(attr)) {
                        val = o[attr];
                        if(attr == 'cls') {
                            el.className = val;
                        }
                        else {
                            if(useSet) {
                                el.setAttribute(attr, val);
                            }
                            else {
                                el[attr] = val;
                            }
                        }
                    }
                }
                if (o.style) {
                    $(el).css(o.style);
                }
                if ((cn = o.children || o.cn)) {
                    CORE.Dom.create(cn, el);
                }
                else if (o.html) {
                    el.innerHTML = o.html;
                }
            }
            if(parentNode) {
                parentNode.appendChild(el);
            }
            return el;
        },

        hasCls: function(e, cls) {
            return $(e).hasClass(cls);
        },

        addCls: function(e, cls) {
            $(e).addClass(cls);
        },

        removeCls: function(e, cls) {
            $(e).removeClass(cls);
        },

        toggleCls: function(e, cls) {
            $(e).toggleClass(cls);
        },

        stopAndAnimate: function(e, options, duration, callback) {
            $(e).stop().animate(options, duration, callback);
        },

        fadeOut: function(e, duration, callback) {
            $(e).fadeOut(duration, callback);
        },

        clear: function(e) {
            e.innerHTML = '';
        },
    }
);