$(document).ready( function() {
    smoothScroll.init({
    	offset: 10,
    	easing: "easeInOutCubic",
    	callbackBefore: function (toggle, anchor) {
    		$('#navigation a.active').removeClass('active');
    		$(toggle).addClass('active');
    	}
    });
    $('em:contains("git-vogue")').addClass('git-vogue-branding');
    $('em:contains("Anchor")').addClass('anchor-branding');
});