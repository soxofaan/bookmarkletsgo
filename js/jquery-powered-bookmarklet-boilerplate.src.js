

(function(window, document, undefined) {

    // Minumum jQuery version we want
    var minimumJqueryVersion = "1.8.0";

    // Our custom bookmarklet code goes here
    function ourBookmarkletCode($)
    {
        // -----------------------------------------------------------------------------------------
        // Custom code goes from here ......

        var message = $('<div>').css({
            position: 'fixed',
            top: '2em',
            left: '2em',
            padding: '2em',
            'background-color': '#ace',
            'z-index': 100000
        }).text('We have jQuery here!');

        $('body').append(message);

        message.animate({'font-size': '200%'}, {duration: 1000});

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


