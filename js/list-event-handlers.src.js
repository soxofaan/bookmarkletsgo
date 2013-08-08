

(function(window, document, jQuery, undefined) {

    // This bookmarklet depends on jQuery (1.8+) being present on the page.
    if (typeof jQuery === 'undefined') {
        alert('Only works when jQuery is availbale');
        return;
    }
    // TODO: check for jQuery version


    /**
     * jQuery plugin to extract all event handlers and do something with them
     * through a user supplied function callback(element, eventName, handlerFunction).
     */
    jQuery.fn.eachEventHandler = function(callback) {

        // Use a fallback callback if none is supplied.
        callback = callback || function(element, name, handler) {
            console.log(element, name, handler);
        };

        return this.each(function(i, element) {

            // If there are events for this element: get a mapping of event name to array of handlers
            var events = jQuery._data(element, 'events');

            if (events) {
                jQuery.each(events, function(name, handlers) {
                    jQuery.each(handlers, function(i, handler) {
                        callback(element, name, handler.handler);
                    });
                });
            }
        });
    };


    // Get (and flush) or create container element.
    var container_id = 'event_handler_listing';
    var container = jQuery('#' + container_id);
    if (container.length > 0) {
        container.html('');
    }
    else {
        container = jQuery('<div></div>').attr('id', container_id);
    }
    // Create header and pointers to counter spans.
    var header = jQuery('<h3>Found <span class="handlercounter">0</span> active event handlers on <span class="elementcounter">0</span> elements.</h3>').appendTo(container);
    var listing = jQuery('<ol></ol>').appendTo(container);
    var handlerCounter = jQuery('.handlercounter', header);
    var elementCounter = jQuery('.elementcounter', header);
    var elementCounterRunId = (new Date()).getTime();

    // Helper function to add an entry to the listing
    function addEntry(element, name, handler)
    {
        // Update counters
        handlerCounter.text(parseInt(handlerCounter.text(), 10) + 1);
        if (jQuery(element).data('eventlisted') !== elementCounterRunId) {
            elementCounter.text(parseInt(elementCounter.text(), 10) + 1);
            jQuery(element).data('eventlisted', elementCounterRunId);
        }

        // Add entry to lising.
        listing.append(
            '<li>' +
                '"' + name + '"' +
                ' on <i>' + element.constructor.name +
                    (element.id ? ' id="' + element.id + '"' : '') +
                    (element.className ? ' class="' + element.className + '"' : '') +
                    '</i>: ' +
                '<code>' + handler.toString() + '</code>' +
            '</li>'
        );
    }


    jQuery(document).eachEventHandler(addEntry);
    jQuery(window).eachEventHandler(addEntry);
    jQuery('*').eachEventHandler(addEntry);

    jQuery('body').append(container);

    // Add some CSS rules of our own.
    jQuery('<style type="text/css">' +
        '#' + container_id + '{position:absolute;width:50%;top:10px;left:25%;border:1px solid #79a;background-color:#ace;z-index:100000;padding:1em;font-family:sans-serif;font-size:10pt;color:#000;}' +
        '#' + container_id + ' code {display:block;font-size:80%;overflow:scroll;}' +
        '</style>').appendTo("head");


})(window, document, window.jQuery);


