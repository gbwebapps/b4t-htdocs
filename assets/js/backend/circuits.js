if(controller == 'circuits'){

	$(document).on('click', '.getTypesServices', function(e){
		e.preventDefault();
		var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
		var uniqid = randLetter + Date.now();
		getTypesServices(uniqid);
	});

	function getTypesServices(uniqid){
	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/circuits/getTypesServices',
	        headers: {'X-Requested-With': 'XMLHttpRequest'},
	        method: 'post',
	        dataType: 'json', 
	        data: { uniqid: uniqid },
	        beforeSend: function(){
	            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	        }
	    }).done(function(data){

	    	$('#typesServicesRow').append($(data.output).hide().fadeIn(200));

	    }).fail(function(jqXHR, textStatus, error){
	        toastr.error(error);
	    }).always(function(){
	        $('#showLoader').css('display', 'none').html('');
	    });
	}

	$(document).on('click', '.removeTypesServices', function(e) {
		e.preventDefault();
		var id = $(this).data('id');
		removeTypesServices(id);
	});

	function removeTypesServices(id){
	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/circuits/removeTypesServices',
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

	$(document).on('change', '.type_id', function(e){
		var uniqid = $(this).data('uniqid');
		if($(this).val() == ''){
			$('.prices_' + uniqid).prop("disabled", true).val('');
			$('.selectServices_' + uniqid).fadeOut(200, function() {
			    $('.selectServices_' + uniqid).hide();
			});
		} else {
			$('.prices_' + uniqid).prop("disabled", false);
			selectServices($(this).val(), uniqid);
		}
	});

	function selectServices(id, uniqid){
		var jqxhr = $.ajax({
		    url: urlbase + 'admin/circuits/selectServices',
		    headers: {'X-Requested-With': 'XMLHttpRequest'},
		    method: 'post',
		    dataType: 'json', 
		    data: { id: id, uniqid: uniqid }, 
		    beforeSend: function(){
		        $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
		    }
		}).done(function(data){
			$('.selectServices_' + uniqid).html(data.output).hide().fadeIn(200);
		}).fail(function(jqXHR, textStatus, error){
		    toastr.error(error);
		}).always(function(){
		    $('#showLoader').css('display', 'none').html('');
		});
	}

	switch(action){
		case 'index':
			// Some code here
		break;
		case 'showAll':
			// Advanced search posts
			var circuits_id = (localStorage.getItem('circuits_id')) ? localStorage.getItem('circuits_id') : ''; $('#circuits_id').val(circuits_id);
			(circuits_id != '') ? $('#circuits_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var circuits_name = (localStorage.getItem('circuits_name')) ? localStorage.getItem('circuits_name') : ''; $('#circuits_name').val(circuits_name);
			(circuits_name != '') ? $('#circuits_name').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var circuits_email = (localStorage.getItem('circuits_email')) ? localStorage.getItem('circuits_email') : ''; $('#circuits_email').val(circuits_email);
			(circuits_email != '') ? $('#circuits_email').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var circuits_phone = (localStorage.getItem('circuits_phone')) ? localStorage.getItem('circuits_phone') : ''; $('#circuits_phone').val(circuits_phone);
			(circuits_phone != '') ? $('#circuits_phone').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['circuits_id'] = circuits_id;
			posts.searchFields['circuits_name'] = circuits_name;
			posts.searchFields['circuits_email'] = circuits_email;
			posts.searchFields['circuits_phone'] = circuits_phone;
			
			searchFieldsListener('keyup', ['circuits_id', 'circuits_name', 'circuits_email', 'circuits_phone']);

			// Calling to the main function to list all records
			showAllAction();
		break;
		case 'add':
			// Some code here
		break;
		case 'edit':
			showAttachements($("input[name='circuits_id']").val(), 'edit'); // this is the hidden field with id
		break;
		case 'show':
			showAttachements($("#show_circuits_id").data('value'), 'show'); // this is the hidden field with id
		break;
	}

}