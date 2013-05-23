(function($) {
	var menu = $('#headerNavigation a');
	var profilebar = $('#profileBar');
	$(menu[0]).text("stroei'tje trek'n");
	$(menu[1]).text('Ip den tast');
	$(menu[2]).text('blageur');
	$(menu[3]).text("'n klapken doan");
	profilebar.find('a[href="/profile/?view=visitors"]').text('overkomste');
	profilebar.find('a[href="/profile/matches?view=me"]').text('stief geestig');
	$('#header').find('a[href*="unlimited?r=topupgradelink"]').text("oog'n piet worden");

})(jQuery);