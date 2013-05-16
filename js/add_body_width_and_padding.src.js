// Simple bookmarklet to add width and a bit of padding
// to pages with almost no styling and long line lengths.
(function(document){
	var style = document.body.style;
	style['width'] = '600px';
	style['padding'] = '2em';
})(document);