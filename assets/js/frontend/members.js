if (controller == 'members') {
	switch (action) {
		case 'register':

			$(document).on('submit', '#membersRegister', function(e){
				e.preventDefault();
				var formData = new FormData(this);
				memberRegister(formData);
			});

			function memberRegister(formData){
				// CSRF Hash
				var csrfName = $('.csrfname').attr('name'); // CSRF Token name
				var csrfHash = $('.csrfname').val(); // CSRF hash

				formData.append([csrfName], csrfHash);

				var jqxhr = $.ajax({
				    url: urlbase + 'members/registerAction',
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
			            $('#membersRegister').get(0).reset();
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

		case 'set_password':

			$(document).on('submit', '#membersSetPassword', function(e){
				e.preventDefault();
				var formData = new FormData(this);
				memberSetPassword(formData);
			});

			function memberSetPassword(formData){
				// CSRF Hash
				var csrfName = $('.csrfname').attr('name'); // CSRF Token name
				var csrfHash = $('.csrfname').val(); // CSRF hash

				formData.append([csrfName], csrfHash);

				var jqxhr = $.ajax({
				    url: urlbase + 'members/setPasswordAction',
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
			            $('#membersSetPassword').get(0).reset();
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

			$(document).on('submit', '#membersLogin', function(e){
				e.preventDefault();
				var formData = new FormData(this);
				memberLogin(formData);
			});

			function memberLogin(formData){
				// CSRF Hash
				var csrfName = $('.csrfname').attr('name'); // CSRF Token name
				var csrfHash = $('.csrfname').val(); // CSRF hash

				formData.append([csrfName], csrfHash);

				var jqxhr = $.ajax({
				    url: urlbase + 'members/loginAction',
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
			            $('#membersLogin').get(0).reset();
			            if(data.result == true) {
			                window.location.href = urlbase + 'members/account/dashboard';
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

			$(document).on('submit', '#membersRecovery', function(e){
				e.preventDefault();
				var formData = new FormData(this);
				memberRecovery(formData);
			});

			function memberRecovery(formData){
				// CSRF Hash
				var csrfName = $('.csrfname').attr('name'); // CSRF Token name
				var csrfHash = $('.csrfname').val(); // CSRF hash

				formData.append([csrfName], csrfHash);

				var jqxhr = $.ajax({
				    url: urlbase + 'members/recoveryAction',
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
			            $('#membersRecovery').get(0).reset();
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