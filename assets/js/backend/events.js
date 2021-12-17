if(controller == 'events'){

	$(document).on('change', '#x_events_organizer_id', function(){
		var organizer_id = $(this).val();
		if(organizer_id == ''){
			$('#x_events_circuit_id').prop('disabled', true).val('');
			$('#x_events_type_id').prop('disabled', true).val('');
		} else {
			$('#x_events_circuit_id').prop('disabled', false);
			$('#x_events_type_id').prop('disabled', true).val('');
			selectOrganizer(organizer_id);
		}
	});

	$(document).on('change', '#x_events_circuit_id', function(){
		var circuit_id = $(this).val();
		var organizer_id = $('#x_events_organizer_id').val();
		if(circuit_id == ''){
			$('#x_events_type_id').prop('disabled', true).val('');
		} else {
			$('#x_events_type_id').prop('disabled', false);
			selectCircuit(organizer_id, circuit_id);
		}
	});

	$(document).on('click', '.getDatesSlots', function(e){
		e.preventDefault();
		var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
		var uniqid = randLetter + Date.now();
		getDatesSlots(uniqid);
	});

	$(document).on('click', '.removeDatesSlots', function(e) {
		e.preventDefault();
		var uniqid = $(this).data('uniqid');
		removeDatesSlots(uniqid);
	});

	$(document).on('click', '.getServices', function(e){
		e.preventDefault();
		var uniqid = $(this).data('uniqid');
		var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
		var randid = randLetter + Date.now();
		var subUniqid = uniqid + '_' + randid;
		getServices(subUniqid);
	});

	$(document).on('click', '.removeServices', function(e) {
		e.preventDefault();
		var subUniqid = $(this).data('subuniqid');
		removeServices(subUniqid);
	});

	function selectOrganizer(organizer_id){
		var jqxhr = $.ajax({
		    url: urlbase + 'admin/events/selectOrganizer',
		    headers: {'X-Requested-With': 'XMLHttpRequest'},
		    method: 'post',
		    dataType: 'json', 
		    data: { organizer_id: organizer_id }, 
		    beforeSend: function(){
		        $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
		    }
		}).done(function(data){
			$('#x_events_circuit_id').html(data.output);
		}).fail(function(jqXHR, textStatus, error){
		    toastr.error(error);
		}).always(function(){
		    $('#showLoader').css('display', 'none').html('');
		});
	}

	function selectCircuit(organizer_id, circuit_id){
		var jqxhr = $.ajax({
		    url: urlbase + 'admin/events/selectCircuit',
		    headers: {'X-Requested-With': 'XMLHttpRequest'},
		    method: 'post',
		    dataType: 'json', 
		    data: { organizer_id: organizer_id, circuit_id: circuit_id }, 
		    beforeSend: function(){
		        $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
		    }
		}).done(function(data){
			$('#x_events_type_id').html(data.output);
		}).fail(function(jqXHR, textStatus, error){
		    toastr.error(error);
		}).always(function(){
		    $('#showLoader').css('display', 'none').html('');
		});
	}

	function getDatesSlots(uniqid){
	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/events/getDatesSlots',
	        headers: {'X-Requested-With': 'XMLHttpRequest'},
	        method: 'post',
	        dataType: 'json', 
	        data: { uniqid: uniqid },
	        beforeSend: function(){
	            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	        }
	    }).done(function(data){

	    	$('#datesSlotsRow').append($(data.output).hide().fadeIn(200));

	    }).fail(function(jqXHR, textStatus, error){
	        toastr.error(error);
	    }).always(function(){
	        $('#showLoader').css('display', 'none').html('');
	    });
	}

	function removeDatesSlots(uniqid){
	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/events/removeDatesSlots',
	        headers: {'X-Requested-With': 'XMLHttpRequest'},
	        method: 'get',
	        dataType: 'json', 
	        beforeSend: function(){
	            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	        }
	    }).done(function(data){
	    	if(data.result == true){
	    		$('#row_' + uniqid).fadeOut(200, function() {
	    		    $('#row_' + uniqid).remove();
	    		});
	    	}
	    }).fail(function(jqXHR, textStatus, error){
	        toastr.error(error);
	    }).always(function(){
	        $('#showLoader').css('display', 'none').html('');
	    });
	}

	function getServices(subUniqid){
	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/events/getServices',
	        headers: {'X-Requested-With': 'XMLHttpRequest'},
	        method: 'post',
	        dataType: 'json', 
	        data: { subUniqid: subUniqid },
	        beforeSend: function(){
	            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	        }
	    }).done(function(data){

	    	$('.selectServices').append($(data.output).hide().fadeIn(200));

	    }).fail(function(jqXHR, textStatus, error){
	        toastr.error(error);
	    }).always(function(){
	        $('#showLoader').css('display', 'none').html('');
	    });
	}

	function removeServices(subUniqid){
	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/events/removeServices',
	        headers: {'X-Requested-With': 'XMLHttpRequest'},
	        method: 'get',
	        dataType: 'json', 
	        beforeSend: function(){
	            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	        }
	    }).done(function(data){
	    	if(data.result == true){
	    		$('#row_' + subUniqid).fadeOut(200, function() {
	    		    $('#row_' + subUniqid).remove();
	    		});
	    	}
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
			var events_id = (localStorage.getItem('events_id')) ? localStorage.getItem('events_id') : ''; $('#events_id').val(events_id);
			(events_id != '') ? $('#events_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var events_name = (localStorage.getItem('events_name')) ? localStorage.getItem('events_name') : ''; $('#events_name').val(events_name);
			(events_name != '') ? $('#events_name').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['events_id'] = events_id;
			posts.searchFields['events_name'] = events_name;

			searchFieldsListener('keyup', ['events_id', 'events_name']);

			var events_organizer_id = (localStorage.getItem('events_organizer_id')) ? localStorage.getItem('events_organizer_id') : ''; $('#x_events_organizer_id').val(events_organizer_id);
			(events_organizer_id != '') ? $('#x_events_organizer_id').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			var events_circuit_id = (localStorage.getItem('events_circuit_id')) ? localStorage.getItem('events_circuit_id') : ''; $('#x_events_circuit_id').val(events_circuit_id);
			(events_circuit_id != '') ? $('#x_events_circuit_id').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			var events_type_id = (localStorage.getItem('events_type_id')) ? localStorage.getItem('events_type_id') : ''; $('#x_events_type_id').val(events_type_id);
			(events_type_id != '') ? $('#x_events_type_id').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			posts.searchIds['events_organizer_id'] = events_organizer_id;
			posts.searchIds['events_circuit_id'] = events_circuit_id;
			posts.searchIds['events_type_id'] = events_type_id;
			
			searchIdsListener('change', ['events_organizer_id', 'events_circuit_id', 'events_type_id']);

			// Calling to the main function to list all records
			showAllAction();
		break;
		case 'add':
			// Some code here
		break;
		case 'edit':
			showAttachements($("input[name='events_id']").val(), 'edit'); // this is the hidden field with id
		break;
		case 'show':
			showAttachements($("#show_events_id").data('value'), 'show'); // this is the hidden field with id
		break;
	}

}