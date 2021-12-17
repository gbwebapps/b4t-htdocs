if(controller == 'organizers'){

	$(document).on('click', '.getCircuitsTypes', function(e){
		e.preventDefault();
		var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
		var uniqid = randLetter + Date.now();
		getCircuitsTypes(uniqid);
	});

	function getCircuitsTypes(uniqid){
	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/organizers/getCircuitsTypes',
	        headers: {'X-Requested-With': 'XMLHttpRequest'},
	        method: 'post',
	        dataType: 'json', 
	        data: { uniqid: uniqid },
	        beforeSend: function(){
	            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	        }
	    }).done(function(data){
	           
	    	$('#circuitsTypesCoinsRow').append($(data.output).hide().fadeIn(200));

	    }).fail(function(jqXHR, textStatus, error){
	        toastr.error(error);
	    }).always(function(){
	        $('#showLoader').css('display', 'none').html('');
	    });
	}

	$(document).on('click', '.removeCircuitsTypes', function(e) {
		e.preventDefault();
		var id = $(this).data('id');
		removeCircuitsTypes(id);
	});

	function removeCircuitsTypes(id){
	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/organizers/removeCircuitsTypes',
	        headers: {'X-Requested-With': 'XMLHttpRequest'},
	        method: 'get',
	        dataType: 'json', 
	        beforeSend: function(){
	            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	        }
	    }).done(function(data){
	    	if(data.result == true){
	    		$('#row_' + id).fadeOut(200, function() {
	    		    $('#row_' + id).remove();
	    		});
	    	}
	    }).fail(function(jqXHR, textStatus, error){
	        toastr.error(error);
	    }).always(function(){
	        $('#showLoader').css('display', 'none').html('');
	    });
	}

	$(document).on('change', '.circuit_id', function(e){
		var uniqid = $(this).data('uniqid');
		if($(this).val() == ''){
			$('#selectTypes_' + uniqid).prop("disabled", true).val('');
			$('#coins_' + uniqid).prop("disabled", true).val('');
		} else {
			$('#selectTypes_' + uniqid).prop("disabled", false);
			$('#coins_' + uniqid).prop("disabled", true).val('');
			selectTypes($(this).val(), uniqid);
		}
	});

	function selectTypes(id, uniqid){
		var jqxhr = $.ajax({
		    url: urlbase + 'admin/organizers/selectTypes',
		    headers: {'X-Requested-With': 'XMLHttpRequest'},
		    method: 'post',
		    dataType: 'json', 
		    data: { id: id, uniqid: uniqid }, 
		    beforeSend: function(){
		        $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
		    }
		}).done(function(data){
			$('#selectTypes_' + uniqid).html(data.output);
		}).fail(function(jqXHR, textStatus, error){
		    toastr.error(error);
		}).always(function(){
		    $('#showLoader').css('display', 'none').html('');
		});
	}

	$(document).on('change', '.type_id', function(e){
		var uniqid = $(this).data('uniqid');
		if($(this).val() == ''){
			$('#coins_' + uniqid).prop("disabled", true).val('');
		} else {
			$('#coins_' + uniqid).prop("disabled", false);
		}
	});

	switch(action){
		case 'index':
			// Some code here
		break;
		case 'showAll':
			// Advanced search posts
			var organizers_id = (localStorage.getItem('organizers_id')) ? localStorage.getItem('organizers_id') : ''; $('#organizers_id').val(organizers_id);
			(organizers_id != '') ? $('#organizers_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var organizers_name = (localStorage.getItem('organizers_name')) ? localStorage.getItem('organizers_name') : ''; $('#organizers_name').val(organizers_name);
			(organizers_name != '') ? $('#organizers_name').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var organizers_email = (localStorage.getItem('organizers_email')) ? localStorage.getItem('organizers_email') : ''; $('#organizers_email').val(organizers_email);
			(organizers_email != '') ? $('#organizers_email').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var organizers_phone = (localStorage.getItem('organizers_phone')) ? localStorage.getItem('organizers_phone') : ''; $('#organizers_phone').val(organizers_phone);
			(organizers_phone != '') ? $('#organizers_phone').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['organizers_id'] = organizers_id;
			posts.searchFields['organizers_name'] = organizers_name;
			posts.searchFields['organizers_email'] = organizers_email;
			posts.searchFields['organizers_phone'] = organizers_phone;
			
			searchFieldsListener('keyup', ['organizers_id', 'organizers_name', 'organizers_email', 'organizers_phone']);

			// Calling to the main function to list all records
			showAllAction();
		break;
		case 'add':
			// Some code here
		break;
		case 'edit':
			showAttachements($("input[name='organizers_id']").val(), 'edit'); // this is the hidden field with id
		break;
		case 'show':
			showAttachements($("#show_organizers_id").data('value'), 'show'); // this is the hidden field with id
		break;
	}

}