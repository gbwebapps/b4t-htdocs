if(controller == 'auth'){

    switch(action){

        case 'login':

            $(document).on('submit', '#authLogin', function(e){
                e.preventDefault();
                var formData = new FormData(this);
                loginAction(formData);
            });

            function loginAction(formData)
            {
                // CSRF Hash
                var csrfName = $('.csrfname').attr('name'); // CSRF Token name
                var csrfHash = $('.csrfname').val(); // CSRF hash

                formData.append([csrfName], csrfHash);

                var jqxhr = $.ajax({
                    url: urlbase + 'admin/auth/loginAction',
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
                        $('#authLogin').get(0).reset();
                        if(data.result == true) {
                            window.location.href = urlbase + 'admin/dashboard';
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

            $(document).on('submit', '#authRecovery', function(e){
                e.preventDefault();
                var formData = new FormData(this);
                recoveryAction(formData);
            });

            function recoveryAction(formData)
            {
                // CSRF Hash
                var csrfName = $('.csrfname').attr('name'); // CSRF Token name
                var csrfHash = $('.csrfname').val(); // CSRF hash

                formData.append([csrfName], csrfHash);

                var jqxhr = $.ajax({
                    url: urlbase + 'admin/auth/recoveryAction',
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
                        $('#authRecovery').get(0).reset();
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
        
            $(document).on('submit', '#authSetPassword', function(e){
                e.preventDefault();
                var formData = new FormData(this);
                setPasswordAction(formData);
            });

            function setPasswordAction(formData)
            {
                // CSRF Hash
                var csrfName = $('.csrfname').attr('name'); // CSRF Token name
                var csrfHash = $('.csrfname').val(); // CSRF hash

                formData.append([csrfName], csrfHash);

                var jqxhr = $.ajax({
                    url: urlbase + 'admin/auth/setPasswordAction',
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
                        $('#authSetPassword').get(0).reset();
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