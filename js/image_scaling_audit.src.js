

(function(window, document, undefined) {

    // Minumum jQuery version we want
    var minimumJqueryVersion = "1.8.0";

    // Our custom bookmarklet code goes here
    function ourBookmarkletCode($)
    {
        // -----------------------------------------------------------------------------------------
        // Custom code goes from here ......

        // The image scaling audit table.
        var table_class = 'image_scaling_audit';
        var table = $('<table></table>').addClass(table_class);

        // Helper function to add a row to the table.
        function addRow()
        {
            var row = $('<tr/>');
            for (var i = 0; i < arguments.length; i++) {
                row.append('<td>' + arguments[i] + '</td>');
            }
            table.append(row);
        }

        // Table header.
        addRow('Scale ratio', 'Source size', 'Scaled size', 'Image url');

        // List of scale cases we already covered (to reduce duplication).
        var scale_cases = [];

        // Loop over all images in the document
        $('img').each(function() {
            // Get image url and initialize entry in image_scale_map if it is not there yet.
            var img_url = this.src;

            // Get scaled size.
            var scaled_width = this.width, scaled_height = this.height;

            // Get the original size of the image if we don't know it yet.
            // Get original size (with in memory copy of image to avoid css scaling.)
            $("<img/>").attr("src", img_url).on('load', function() {
                // Get original size.
                var orig_width = this.width;
                var orig_height = this.height;
                var scale_ratio = (scaled_width * scaled_height) / (orig_width * orig_height);

                // Report new image scaling cases.
                var scale_case = img_url + scaled_width + scaled_height;
                if (scale_cases.indexOf(scale_case) === -1)
                {
                    addRow(Math.round(100.0 * scale_ratio) + '%', orig_width + ' x ' + orig_height, scaled_width + ' x ' + scaled_height, img_url);
                    scale_cases.push(scale_case);
                }
            });
        });

        $('body').append(table);

        // Add some CSS rules of our own.
        $('<style type="text/css">' +
            'table.' + table_class + '{position:absolute;top:10px;left:10px;background-color:#ace;z-index:100000;font-family:sans-serif;font-size:10pt;color:#000;}' +
            'table.' + table_class + ' td{padding:2pt;}' +
            '</style>').appendTo("head");

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




