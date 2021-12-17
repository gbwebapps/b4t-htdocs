if(controller == 'contacts'){

	switch(action){
		case 'index':
			
			$(document).on('submit', '#contactForm', function(e){
			    e.preventDefault();
			    var formData = new FormData(this);
			    indexAction(formData);
			});

			function indexAction(formData)
			{
				// CSRF Hash
				var csrfName = $('.csrfname').attr('name'); // CSRF Token name
				var csrfHash = $('.csrfname').val(); // CSRF hash

				formData.append([csrfName], csrfHash);

				var jqxhr = $.ajax({
				    url: urlbase + 'contacts/indexAction',
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
				        $('#contactForm').get(0).reset();
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