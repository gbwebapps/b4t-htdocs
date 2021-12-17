/* Scrollup */
$(window).scroll(function() {
    if ($(this).scrollTop() > 600) {
        $(".scrollup").fadeIn();
    } else {
        $(".scrollup").fadeOut();
    }
})

$(".scrollup").on('click', function() {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});

// Toastr options
toastr.options = {
  'closeButton': true,
  'debug': false,
  'newestOnTop': true,
  'progressBar': true,
  'positionClass': 'toast-top-right',
  'preventDuplicates': true,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '6000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

// HTML references
var controller = $('#controller').data('controller');
var action = $('#action').data('action');
var urlbase = $('#urlbase').data('urlbase');

// JS Vars for advanced search
var globalTimeout = null;
var delayTime = 500;

if(action == 'index'){

    // Parameters for data list sorting
    var column = (localStorage.getItem(controller + '_column')) ? localStorage.getItem(controller + '_column') : controller + '_id';
    var order = (localStorage.getItem(controller + '_order')) ? localStorage.getItem(controller + '_order') : 'desc';
    var page = (localStorage.getItem(controller + '_page')) ? localStorage.getItem(controller + '_page') : 1;

    // The posts sent with showAll
    var posts = { column: column, order: order, page: page, searchFields: {} }

    // Listener for pagination data
    $(document).on('click', '.pagination li a', function(e){
        e.preventDefault();

        var page = $(this).data('page');
        localStorage.setItem(controller + '_page', page);
        posts['page'] = localStorage.getItem(controller + '_page');

        indexAction();
    });

    // Listener for resetting sorting data
    $(document).on('click', '#resetSearch', function(e){
        e.preventDefault();
        posts = resetSearch();
        indexAction();
    });

    // This function delay the calling to the showAll function
    function callIndexAction(){
        if (globalTimeout != null) {
            clearTimeout(globalTimeout);
        }
        globalTimeout = setTimeout(function() {
            globalTimeout = null;  
            indexAction();
        }, delayTime);
    }

    // Function for removing sorting data sessions
    function resetSorting(){
        localStorage.removeItem(controller + '_column');
        localStorage.removeItem(controller + '_order');
        localStorage.removeItem(controller + '_page');

        posts['column'] = controller + '_id';
        posts['order'] = 'desc';
        posts['page'] = 1

        return posts;
    }

    // Function for removing sorting data and advanced search sessions
    function resetSearch(){
        localStorage.removeItem(controller + '_column');
        localStorage.removeItem(controller + '_order');
        localStorage.removeItem(controller + '_page');

        posts['column'] = controller + '_id';
        posts['order'] = 'desc';
        posts['page'] = 1;

        $.each(posts.searchFields, function(key, value){
            localStorage.removeItem(key);
            $('#' + key).val('');
            posts.searchFields[key] = '';
        });

        $('#resetSearch').prop('disabled', true);

        return posts;
    }

    // This function creates as many listeners as requested by the arguments passed
    function searchFieldsListener(event, data){
        $.each(data, function(key, value) {
            var field = [value];
            $(document).on(event, "#" + field, function(){
                posts = resetSorting();
                var field = $(this).val();
                localStorage.setItem(value, field);
                posts.searchFields[value] = localStorage.getItem(value);
                if(field != ''){
                    $('#resetSearch').prop('disabled', false);
                } else {
                    $('#resetSearch').prop('disabled', true);
                }
                callIndexAction();
            });
        });
    }

    // CRUD functions & listeners
    function indexAction(){
        var jqxhr = $.ajax({
            url: urlbase + controller + '/indexAction',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            method: 'post',
            dataType: 'json', 
            data: posts,
            beforeSend: function(){
                $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/frontend/ajax-loader.gif">');
            }
        }).done(function(data){
            if(data.errors){
                $("div[class^='error_']").empty();
                $.each(data.errors, function(key, value) {
                    var element = $(".error_" + key);
                    element.html(value);
                });
                $('#showData').html('<div class="card mt-2 mb-4"><div class="card-body "><div class="text-center">' + data.message + '</div></div></div>');
            } else {
                $("div[class^='error_']").empty();
                if(data.result == true) {
                    $('#showData').html(data.output);
                } else if(data.result == false){
                    toastr.error('data.message');
                }
            }
        }).fail(function(jqXHR, textStatus, error){
            toastr.error('error');
        }).always(function(){
            $('#showLoader').css('display', 'none').html('');
        });
    }

} else if(action == 'show'){

    function getSubAction(posts, section)
    {
        var jqxhr = $.ajax({
            url: urlbase + '/' + controller + '/getSubAction',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            method: 'post',
            dataType: 'json', 
            data: posts,
            beforeSend: function(){
                $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/frontend/ajax-loader.gif">');
            }
        }).done(function(data){
            if(data.errors){
                $("div[class^='error_']").empty();
                $.each(data.errors, function(key, value) {
                    var element = $(".error_" + key);
                    element.html(value);
                });
                $('#show' + section + 'Data').html('<div class="card mt-2 mb-4"><div class="card-body "><div class="text-center">' + data.message + '</div></div></div>');
            } else {
                $("div[class^='error_']").empty();
                if(data.result == true) {
                    $('#show' + section + 'Data').html(data.output);
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

    // This function delay the calling to the showAll function
    function callSubAction(posts, section){
        if (globalTimeout != null) {
            clearTimeout(globalTimeout);
        }
        globalTimeout = setTimeout(function() {
            globalTimeout = null;  
            getSubAction(posts, section);
        }, delayTime);
    }
}