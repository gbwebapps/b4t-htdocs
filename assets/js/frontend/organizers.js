if(controller == 'organizers'){

	switch(action){
		case 'index':
			// Advanced search posts
			var organizers_name = (localStorage.getItem('organizers_name')) ? localStorage.getItem('organizers_name') : ''; $('#organizers_name').val(organizers_name);
			(organizers_name != '') ? $('#resetSearch').prop('disabled', false) : null;

			posts.searchFields['organizers_name'] = organizers_name;

			searchFieldsListener('keyup', ['organizers_name']);

			// Calling to the main function to list all records
			indexAction();
		break;
		case 'show':
			// Setting the organizer's id for searching the related events
			var showID = $('#organizers_sub_id').data('id');

			/// THE EVENTS

			// Parameters for data list sorting
			var subEventsColumn = 'events_id';
			var subEventsOrder = 'desc';
			var subEventsPage = 1;

			// The posts sent with showAll
			var subEventsPosts = { showID : showID, subColumn: subEventsColumn, subOrder: subEventsOrder, subPage: subEventsPage, subSection: 'events', subSearchFields: {} }

			// Advanced search posts
			var organizers_events_name = ''; $('#organizers_events_name').val(organizers_events_name);
			(organizers_events_name != '') ? $('#resetSubEventsSearch').prop('disabled', false) : null;

			subEventsPosts.subSearchFields['events_name'] = organizers_events_name;

			// Listener for pagination data
			$(document).on('click', '.events.pagination li a', function(e){
			    e.preventDefault();

			    var subEventsPage = $(this).data('page');
			    subEventsPosts['subPage'] = subEventsPage;

			    getSubAction(subEventsPosts, 'Events');
			});

			// Listener for resetting sorting data
			$(document).on('click', '#resetSubEventsSearch', function(e){
			    e.preventDefault();
			    subEventsPosts = subEventsResetSearch();
			    getSubAction(subEventsPosts, 'Events');
			});

			// Function for removing sorting data sessions
			function subEventsResetSorting(){
			    subEventsPosts['subPage'] = 1;

			    return subEventsPosts;
			}

			// Function for removing sorting data and advanced search sessions
			function subEventsResetSearch(){
			    subEventsPosts['subPage'] = 1;
			    $('#' + controller + '_events_name').val('');
			    subEventsPosts.subSearchFields['events_name'] = '';
			    $('#resetSubEventsSearch').prop('disabled', true);

			    return subEventsPosts;
			}

			$('#organizers_events_name').on('keyup', function(){
				subEventsPosts = subEventsResetSorting();
				var organizers_events_name = $(this).val();
				subEventsPosts.subSearchFields['events_name'] = organizers_events_name;
				if(organizers_events_name != ''){
				    $('#resetSubEventsSearch').prop('disabled', false);
				} else {
				    $('#resetSubEventsSearch').prop('disabled', true);
				}
				callSubAction(subEventsPosts, 'Events');
			});

			getSubAction(subEventsPosts, 'Events');

			/// THE NEWS

			// Parameters for data list sorting
			var subNewsColumn = 'news_id';
			var subNewsOrder = 'desc';
			var subNewsPage = 1;

			// The posts sent with showAll
			var subNewsPosts = { showID : showID, subColumn: subNewsColumn, subOrder: subNewsOrder, subPage: subNewsPage, subSection: 'news', subSearchFields: {} }

			// Advanced search posts
			var organizers_news_name = ''; $('#organizers_news_name').val(organizers_news_name);
			(organizers_news_name != '') ? $('#resetSubNewsSearch').prop('disabled', false) : null;

			subNewsPosts.subSearchFields['news_name'] = organizers_news_name;

			// Listener for pagination data
			$(document).on('click', '.news.pagination li a', function(e){
			    e.preventDefault();

			    var subNewsPage = $(this).data('page');
			    subNewsPosts['subPage'] = subNewsPage;

			    getSubAction(subNewsPosts, 'News');
			});

			// Listener for resetting sorting data
			$(document).on('click', '#resetSubNewsSearch', function(e){
			    e.preventDefault();
			    subNewsPosts = subNewsResetSearch();
			    getSubAction(subNewsPosts, 'News');
			});

			// Function for removing sorting data sessions
			function subNewsResetSorting(){
			    subNewsPosts['subPage'] = 1;

			    return subNewsPosts;
			}

			// Function for removing sorting data and advanced search sessions
			function subNewsResetSearch(){
			    subNewsPosts['subPage'] = 1;
			    $('#' + controller + '_news_name').val('');
			    subNewsPosts.subSearchFields['news_name'] = '';
			    $('#resetSubNewsSearch').prop('disabled', true);

			    return subNewsPosts;
			}

			$('#organizers_news_name').on('keyup', function(){
				subNewsPosts = subNewsResetSorting();
				var organizers_news_name = $(this).val();
				subNewsPosts.subSearchFields['news_name'] = organizers_news_name;
				if(organizers_news_name != ''){
				    $('#resetSubNewsSearch').prop('disabled', false);
				} else {
				    $('#resetSubNewsSearch').prop('disabled', true);
				}
				callSubAction(subNewsPosts, 'News');
			});

			getSubAction(subNewsPosts, 'News');
		break;

		case 'set_password':

			$(document).on('submit', '#organizersSetPassword', function(e){
				e.preventDefault();
				var formData = new FormData(this);
				organizerSetPassword(formData);
			});

			function organizerSetPassword(formData){
				// CSRF Hash
				var csrfName = $('.csrfname').attr('name'); // CSRF Token name
				var csrfHash = $('.csrfname').val(); // CSRF hash

				formData.append([csrfName], csrfHash);

				var jqxhr = $.ajax({
				    url: urlbase + 'organizers/setPasswordAction',
				    headers: {'X-Requested-With': 'XMLHttpRequest'},
				    method: 'post',
				    dataType: 'json', 
				    data: formData, 
				    contentType: false, 
				    cache: false,
				    processData: false,
				    beforeSend: function(){
				        $(".btn-primary, .btn-danger, .btn-success, .btn-info").prop("disabled", true);
				        $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
				    }
				}).done(function(data){

			        // Update CSRF hash
			        $('.csrfname').val(data.token);

			        if(data.errors){
			            $("div[class^='error_']").empty();
			            $.each(data.errors, function(key, value) {
			                var element = $(".error_" + key);
			                element.html(value);
			            });
			            toastr.error(data.message);
			        } else {
			            $("div[class^='error_']").empty();
			            $('#organizersSetPassword').get(0).reset();
			            if(data.result == true) {
			                toastr.success(data.message);
			            } else if(data.result == false){
			                toastr.error(data.message);
			            }
			        }

				}).fail(function(jqXHR, textStatus, error){
				    toastr.error(error);
				}).always(function(){
				    $(".btn-primary, .btn-danger, .btn-success, .btn-info").prop("disabled", false);
				    $('#showLoader').css('display', 'none').html('');
				});
			}

		break;

		case 'login':

			$(document).on('submit', '#organizersLogin', function(e){
				e.preventDefault();
				var formData = new FormData(this);
				organizerLogin(formData);
			});

			function organizerLogin(formData){
				// CSRF Hash
				var csrfName = $('.csrfname').attr('name'); // CSRF Token name
				var csrfHash = $('.csrfname').val(); // CSRF hash

				formData.append([csrfName], csrfHash);

				var jqxhr = $.ajax({
				    url: urlbase + 'organizers/loginAction',
				    headers: {'X-Requested-With': 'XMLHttpRequest'},
				    method: 'post',
				    dataType: 'json', 
				    data: formData, 
				    contentType: false, 
				    cache: false,
				    processData: false,
				    beforeSend: function(){
				        $(".btn-primary, .btn-danger, .btn-success, .btn-info").prop("disabled", true);
				        $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
				    }
				}).done(function(data){

			        // Update CSRF hash
			        $('.csrfname').val(data.token);

			        if(data.errors){
			            $("div[class^='error_']").empty();
			            $.each(data.errors, function(key, value) {
			                var element = $(".error_" + key);
			                element.html(value);
			            });
			            toastr.error(data.message);
			        } else {
			            $("div[class^='error_']").empty();
			            $('#organizersLogin').get(0).reset();
			            if(data.result == true) {
			                window.location.href = urlbase + 'organizers/account/dashboard';
			            } else if(data.result == false){
			                toastr.error(data.message);
			            }
			        }

				}).fail(function(jqXHR, textStatus, error){
				    toastr.error(error);
				}).always(function(){
				    $(".btn-primary, .btn-danger, .btn-success, .btn-info").prop("disabled", false);
				    $('#showLoader').css('display', 'none').html('');
				});
			}

		break;

		case 'recovery':

			$(document).on('submit', '#organizersRecovery', function(e){
				e.preventDefault();
				var formData = new FormData(this);
				organizerRecovery(formData);
			});

			function organizerRecovery(formData){
				// CSRF Hash
				var csrfName = $('.csrfname').attr('name'); // CSRF Token name
				var csrfHash = $('.csrfname').val(); // CSRF hash

				formData.append([csrfName], csrfHash);

				var jqxhr = $.ajax({
				    url: urlbase + 'organizers/recoveryAction',
				    headers: {'X-Requested-With': 'XMLHttpRequest'},
				    method: 'post',
				    dataType: 'json', 
				    data: formData, 
				    contentType: false, 
				    cache: false,
				    processData: false,
				    beforeSend: function(){
				        $(".btn-primary, .btn-danger, .btn-success, .btn-info").prop("disabled", true);
				        $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
				    }
				}).done(function(data){

			        // Update CSRF hash
			        $('.csrfname').val(data.token);

			        if(data.errors){
			            $("div[class^='error_']").empty();
			            $.each(data.errors, function(key, value) {
			                var element = $(".error_" + key);
			                element.html(value);
			            });
			            toastr.error(data.message);
			        } else {
			            $("div[class^='error_']").empty();
			            $('#organizersRecovery').get(0).reset();
			            if(data.result == true) {
			                toastr.success(data.message);
			            } else if(data.result == false){
			                toastr.error(data.message);
			            }
			        }

				}).fail(function(jqXHR, textStatus, error){
				    toastr.error(error);
				}).always(function(){
				    $(".btn-primary, .btn-danger, .btn-success, .btn-info").prop("disabled", false);
				    $('#showLoader').css('display', 'none').html('');
				});
			}

		break;
	}

}