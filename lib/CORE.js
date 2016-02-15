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
