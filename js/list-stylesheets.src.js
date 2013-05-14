

(function(window, document, undefined) {

    // Minumum jQuery version we want
    var minimumJqueryVersion = "1.8.0";

    // Our custom bookmarklet code goes here
    function ourBookmarkletCode($)
    {
        // -----------------------------------------------------------------------------------------
        // Custom code goes from here ......

        var stylesheetCount = document.styleSheets.length;

        // Start with reporting the number of stylesheets.
        var logDiv =  $('<div>').css({
            position: 'absolute',
            top: '1em',
            left: '1em',
            padding: '1em',
            'background-color': '#ace',
            'z-index': 100000,
            'font-family':  'monospace',
            'font-size': '10pt'
        });

        logDiv.append($('<div>').text('Found ' + stylesheetCount + (stylesheetCount == 1 ? ' stylesheet' : ' stylesheets')));
        $('body').append(logDiv);

        // List the stylesheets.
        var theList = $('<ul>').css({
            'list-style': 'disc',
            'padding-left': '2em'
        });
        for (var s = 0; s < stylesheetCount; s++) {
            var stylesheet = document.styleSheets[s];
            if (stylesheet.href) {
                theList.append($('<li>').append($('<a>').attr('href', stylesheet.href).text(stylesheet.href)));
            }
            else {
                theList.append($('<li>').text('Internal stylesheet with ' + stylesheet.cssRules.length + ' rules'));
            }
        }
        logDiv.append(theList);

        // ... to here.
        // -----------------------------------------------------------------------------------------
    }

    // Helper function to load our own jQuery when it is not available yet (or version is not sufficient)
    // and trigger callback when jQuery is loaded.
    function noJqueryAvailableSoLoadOurOwn(callback) {
        // Boolean to avoid triggering the callback twice (when both script.onload and script.onreadystatechange work)
        var ourJqueryIsLoaded = false;
        // Build the script element.
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + minimumJqueryVersion + "/jquery.min.js";
        script.onload = script.onreadystatechange = function() {
            if (!ourJqueryIsLoaded && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                ourJqueryIsLoaded = true;
                var jQuery = window.jQuery.noConflict(true);
                callback(jQuery);
            }
        };
        // Add our jQuery script element to the document.
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Now glue everything together.
    if (window.jQuery === undefined || window.jQuery.fn.jquery < minimumJqueryVersion) {
        noJqueryAvailableSoLoadOurOwn(ourBookmarkletCode);
    } else {
        ourBookmarkletCode(window.jQuery);
    }

})(window, document);




