if(controller == 'users'){

	$(document).on('click', '.removeAvatar', function(e){
	  e.preventDefault();
	  var id = $(this).data('id');
	  var message = $(this).data('message');
	  var view = $(this).data('view');
	  removeAvatar(id, message, view);
	});

	function removeAvatar(id, message, view){
	    if(confirm(message)){
	        var jqxhr = $.ajax({
	            url: urlbase + 'admin/users/removeAvatar',
	            headers: {'X-Requested-With': 'XMLHttpRequest'},
	            method: 'post',
	            dataType: 'json',
	            data: { id: id, view: view },
	            beforeSend: function(){
	                $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	            }
	        }).done(function(data){

	            if(data.isLoggedIn == false){
	                window.location.href = urlbase + 'admin/auth/login';
	                return;
	            } else if(data.hasRole == false){
	                window.location.href = urlbase + 'admin/dashboard';
	                return;
	            } else if(data.isMaster == false){
	                toastr.error(data.message);
	                return;
	            } else {

	                if(data.result == true) {
	                    toastr.success(data.message);
	                    $('#showData').html(data.output);

	                    if(action == 'account'){
	                    	$('#avatarCurrentUser').html(data.avatarCurrentUser);
	                    }

	                } else if(data.result == false){
	                    toastr.error(data.message);
	                }

	            }
	                        
	        }).fail(function(jqXHR, textStatus, error){
	            toastr.error(error);
	        }).always(function(){
	            $('#showLoader').css('display', 'none').html('');
	        });
	    }
	}

	$(document).on('submit', '.resetPassword', function(e){
	  e.preventDefault();
	  var formData = new FormData(this);
	  var message = $(this).data('message');
	  var view = $(this).data('view');
	  resetPassword(formData, message, view);
	});

	function resetPassword(formData, message, view){
	    if(confirm(message)){

	    	// CSRF Hash
	    	var csrfName = $('.csrfname').attr('name'); // CSRF Token name
	    	var csrfHash = $('.csrfname').val(); // CSRF hash

	    	formData.append([csrfName], csrfHash);
	    	formData.append(['view'], view);

	        var jqxhr = $.ajax({
	            url: urlbase + 'admin/users/resetPassword',
	            headers: {'X-Requested-With': 'XMLHttpRequest'},
	            method: 'post',
	            dataType: 'json', 
	            data: formData, 
	            contentType: false, 
	            cache: false,
	            processData: false,
	            beforeSend: function(){
	                $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
	            }
	        }).done(function(data){

	            if(data.isLoggedIn == false){
	                window.location.href = urlbase + 'admin/auth/login';
	                return;
	            } else if(data.hasRole == false){
	                window.location.href = urlbase + 'admin/dashboard';
	                return;
	            } else if(data.isMaster == false){
	                toastr.error(data.message);
	                return;
	            } else {

	            	// Update CSRF hash
	            	$('.csrfname').val(data.token);

	            	if(data.result == 'not_found'){
	            	    toastr.error(data.message);
	            	    showAllAction();
	            	} else if(data.result == 'is_related'){
	            	    toastr.error(data.message);
	            	    showAllAction();
	            	} else {

		                if(data.result == true) {
		                    toastr.success(data.message);

		                    if(action == 'account'){
		                    	$('#showData').html(data.output);
		                    } else {
		                    	showAllAction();
		                    }

		                } else if(data.result == false){
		                    toastr.error(data.message);
		                }

		            }

	            }
	                        
	        }).fail(function(jqXHR, textStatus, error){
	            toastr.error(error);
	        }).always(function(){
	            $('#showLoader').css('display', 'none').html('');
	        });
	    }
	}

	$(document).on('submit', '.roleForm', function(e){
	  e.preventDefault();
	  var formData = new FormData(this);
	  var message = $(this).data('message');
	  roleAction(formData, message);
	});

	function roleAction(formData, message){
	    if(confirm(message)){

	    // CSRF Hash
	    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
	    var csrfHash = $('.csrfname').val(); // CSRF hash

	    formData.append([csrfName], csrfHash);

	    var jqxhr = $.ajax({
	        url: urlbase + 'admin/users/roleAction',
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

	            if(data.isLoggedIn == false){
	                window.location.href = urlbase + 'admin/auth/login';
	                return;
	            } else if(data.hasRole == false){
	                window.location.href = urlbase + 'admin/dashboard';
	                return;
	            } else if(data.isMaster == false){
	                toastr.error(data.message);
	                return;
	            } else {

	                // Update CSRF hash
	                $('.csrfname').val(data.token);
	                
	                if(data.result == 'not_found'){
	                    toastr.error(data.message);
	                    showAllAction();
	                } else if(data.result == 'is_related'){
	                    toastr.error(data.message);
	                    showAllAction();
	                } else {
	                    if(data.result == true) {
	                        toastr.success(data.message);
	                        showAllAction();
	                    } else if(data.result == false){
	                        toastr.error(data.message);
	                    }
	                }
	            }

	        }).fail(function(jqXHR, textStatus, error){
	            toastr.error(error);
	        }).always(function(){
	            $(".btn-primary, .btn-danger, .btn-success, .btn-info").prop("disabled", false);
	            $('#showLoader').css('display', 'none').html('');
	        });
	    }
	}

	switch(action){
		case 'showAll':
			// Advanced search posts
			var users_id = (localStorage.getItem('users_id')) ? localStorage.getItem('users_id') : ''; $('#users_id').val(users_id);
			(users_id != '') ? $('#users_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var users_firstname = (localStorage.getItem('users_firstname')) ? localStorage.getItem('users_firstname') : ''; $('#users_firstname').val(users_firstname);
			(users_firstname != '') ? $('#users_firstname').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var users_lastname = (localStorage.getItem('users_lastname')) ? localStorage.getItem('users_lastname') : ''; $('#users_lastname').val(users_lastname);
			(users_lastname != '') ? $('#users_lastname').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var users_email = (localStorage.getItem('users_email')) ? localStorage.getItem('users_email') : ''; $('#users_email').val(users_email);
			(users_email != '') ? $('#users_email').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var users_phone = (localStorage.getItem('users_phone')) ? localStorage.getItem('users_phone') : ''; $('#users_phone').val(users_phone);
			(users_phone != '') ? $('#users_phone').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['users_id'] = users_id;
			posts.searchFields['users_firstname'] = users_firstname;
			posts.searchFields['users_lastname'] = users_lastname;
			posts.searchFields['users_email'] = users_email;
			posts.searchFields['users_phone'] = users_phone;
			
			searchFieldsListener('keyup', ['users_id', 'users_firstname', 'users_lastname', 'users_email', 'users_phone']);

			// Calling to the main function to list all records
			showAllAction();
		break;
		case 'add':
			// Some code here
		break;
		case 'edit':
			// Some code here...
		break;
		case 'account':
			
			// Listener for refreshing account view
			$(document).on('click', '#accountOutput', function(e){
			    e.preventDefault();
			    var id = $("[name='users_id']").val();
			    accountOutput(id);
			});

			function accountOutput(id){

			    // CSRF Hash
			    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
			    var csrfHash = $('.csrfname').val(); // CSRF hash

			    var jqxhr = $.ajax({
			        url: urlbase + 'admin/users/accountOutput',
			        headers: {'X-Requested-With': 'XMLHttpRequest'},
			        method: 'post',
			        dataType: 'json', 
			        data: { id: id, [csrfName]: csrfHash }, 
			        beforeSend: function(){
			            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
			        }
			    }).done(function(data){
			        if(data.isLoggedIn == false){
			            window.location.href = urlbase + 'admin/auth/login';
			            return;
			        } else {
			            if(data.result == 'not_found'){
			                toastr.error(data.message);
			            } else {
			                $('.csrfname').val(data.token);
			                $('#showData').html(data.output);
			            }
			        }
			    }).fail(function(jqXHR, textStatus, error){
			        toastr.error(error);
			    }).always(function(){
			        $('#showLoader').css('display', 'none').html('');
			    });
			}

			$(document).on('submit', '#accountForm', function(e){
			  e.preventDefault();
			  var formData = new FormData(this);
			  accountAction(formData);
			});

			function accountAction(formData){
			    // CSRF Hash
			    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
			    var csrfHash = $('.csrfname').val(); // CSRF hash

			    formData.append([csrfName], csrfHash);

			    var jqxhr = $.ajax({
			        url: urlbase + 'admin/users/accountAction',
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

			        if(data.isLoggedIn == false){
			            window.location.href = urlbase + 'admin/auth/login';
			            return;
			        } else {

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
			                if(data.result == 'not_found'){
			                    toastr.error(data.message);
			                } else {
			                    $("div[class^='error_']").empty();
			                    $('#accountForm').get(0).reset();
			                    if(data.result == true) {
			                        toastr.success(data.message);
			                        $('#showData').html(data.output);
			                        $('#showcurrentUser').html(data.currentUser);
			                        $('#avatarCurrentUser').html(data.avatarCurrentUser);
			                    } else if(data.result == false){
			                        toastr.error(data.message);
			                    }
			                }
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