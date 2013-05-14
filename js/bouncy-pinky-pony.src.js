// Add a bouncing pinky pony to that page!
(function(window,document) {
	var img = document.createElement('img');
	img.src='http://25.media.tumblr.com/tumblr_m9le7kBGy51rf54jjo1_400.gif';
	var style = img.style;
	style.position='fixed';
	style.bottom='0';
	style.left='20%';
	style['z-index'] = 10000;
	document.body.appendChild(img);
})(window,document);
