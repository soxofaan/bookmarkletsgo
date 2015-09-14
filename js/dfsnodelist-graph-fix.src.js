// Bookmarklet to fix the broken/misleading usage bars on
// Hadoop DFS live data node listing (/dfsnodelist.jsp?whatNodes=LIVE)
(function(window, document) {

    var ourJqueryIsLoaded = false;
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    script.onload = script.onreadystatechange = function() {
        if (!ourJqueryIsLoaded && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            ourJqueryIsLoaded = true;
            var $ = window.jQuery.noConflict(true);
            $('td.pcused table').removeAttr('border').css('border-collapse', 'collapse');
            $('td.pcused table td').css({'border-width': '0', 'height': '1em', 'padding': '0'});
            $('td.pcused table td.perc_filled').css('background-color', '#66B');
            $('td.pcused table td.perc_nonfilled').css('background-color', '#CCD');
        }
    };
    document.getElementsByTagName("head")[0].appendChild(script);

})(window, document);
