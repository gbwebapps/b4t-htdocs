if(controller == 'news'){
	switch(action){
		case 'showAll':
			// Advanced search posts
			var news_id = (localStorage.getItem('news_id')) ? localStorage.getItem('news_id') : ''; $('#news_id').val(news_id);
			(news_id != '') ? $('#news_id').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			var news_name = (localStorage.getItem('news_name')) ? localStorage.getItem('news_name') : ''; $('#news_name').val(news_name);
			(news_name != '') ? $('#news_name').closest('.input-group').find('.resetSearchFields').css('display', 'block') : null;

			posts.searchFields['news_id'] = news_id;
			posts.searchFields['news_name'] = news_name;
			
			searchFieldsListener('keyup', ['news_id', 'news_name']);

			var news_organizer_id = (localStorage.getItem('news_organizer_id')) ? localStorage.getItem('news_organizer_id') : ''; $('#news_organizer_id').val(news_organizer_id);
			(news_organizer_id != '') ? $('#news_organizer_id').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			var news_in_home = (localStorage.getItem('news_in_home')) ? localStorage.getItem('news_in_home') : ''; $('#news_in_home').val(news_in_home);
			(news_in_home != '') ? $('#news_in_home').closest('.input-group').find('.resetSearchIds').css('display', 'block') : null;

			posts.searchIds['news_organizer_id'] = news_organizer_id;
			posts.searchIds['news_in_home'] = news_in_home;

			searchIdsListener('change', ['news_organizer_id', 'news_in_home']);

			$(document).on('submit', '.inHomeForm', function(e){
			  e.preventDefault();
			  var formData = new FormData(this);
			  var message = $(this).data('message');
			  inHomeAction(formData, message);
			});

			function inHomeAction(formData, message){
			    if(confirm(message)){

			    // CSRF Hash
			    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
			    var csrfHash = $('.csrfname').val(); // CSRF hash

			    formData.append([csrfName], csrfHash);

			    var jqxhr = $.ajax({
			        url: urlbase + 'admin/news/inHomeAction',
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
			        }).fail(function(jqXHR, textStatus, error){
			            toastr.error(error);
			        }).always(function(){
			            $(".btn-primary, .btn-danger, .btn-success, .btn-info").prop("disabled", false);
			            $('#showLoader').css('display', 'none').html('');
			        });
			    }
			}

			// Calling to the main function to list all records
			showAllAction();
		break;
		case 'add':
			// Some code here
		break;
		case 'edit':
			showAttachements($("input[name='news_id']").val(), 'edit'); // this is the hidden field with id
		break;
		case 'show':
			showAttachements($("#show_news_id").data('value'), 'show'); // this is the hidden field with id
		break;
	}

}