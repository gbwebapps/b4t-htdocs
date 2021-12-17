if(controller == 'dashboard'){

	$(document).on('click', '.getGeneralStats', function(e){
		e.preventDefault();
		getGeneralStats();
	});

	function getGeneralStats(){
	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/dashboard/getGeneralStats',
	        headers: {'X-Requested-With': 'XMLHttpRequest'},
	        method: 'get',
	        dataType: 'json', 
	        beforeSend: function(){
	            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	        }
	    }).done(function(data){
	           
	    	$('#showGeneralStats').html($(data.output).hide().fadeIn(200));

	    }).fail(function(jqXHR, textStatus, error){
	        toastr.error(error);
	    }).always(function(){
	        $('#showLoader').css('display', 'none').html('');
	    });
	}

	switch(action){
		case 'index':
			getGeneralStats();
		break;
	}

}