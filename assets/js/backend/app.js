/* Scrollup */
$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
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
})

// HTML references
var controller = $('#controller').data('controller');
var action = $('#action').data('action');
var urlbase = $('#urlbase').data('urlbase');

// JS Vars for advanced search
var globalTimeout = null;
var delayTime = 500;

// Parameters for data list sorting
var column = (localStorage.getItem(controller + '_column')) ? localStorage.getItem(controller + '_column') : controller + '_id';
var order = (localStorage.getItem(controller + '_order')) ? localStorage.getItem(controller + '_order') : 'asc';
var page = (localStorage.getItem(controller + '_page')) ? localStorage.getItem(controller + '_page') : 1;
var whichRecords = (localStorage.getItem(controller + '_whichRecords')) ? localStorage.getItem(controller + '_whichRecords') : 'regular';

var created_at_from = (localStorage.getItem(controller + '_created_at_from')) ? localStorage.getItem(controller + '_created_at_from') : ''; $('#created_at_from').val(created_at_from);
(created_at_from != '') ? $('#created_at_from').closest('.input-group').find('.resetSearchDate').css('display', 'block') : null;
var created_at_to = (localStorage.getItem(controller + '_created_at_to')) ? localStorage.getItem(controller + '_created_at_to') : ''; $('#created_at_to').val(created_at_to);
(created_at_to != '') ? $('#created_at_to').closest('.input-group').find('.resetSearchDate').css('display', 'block') : null;
var updated_at_from = (localStorage.getItem(controller + '_updated_at_from')) ? localStorage.getItem(controller + '_updated_at_from') : ''; $('#updated_at_from').val(updated_at_from);
(updated_at_from != '') ? $('#updated_at_from').closest('.input-group').find('.resetSearchDate').css('display', 'block') : null;
var updated_at_to = (localStorage.getItem(controller + '_updated_at_to')) ? localStorage.getItem(controller + '_updated_at_to') : ''; $('#updated_at_to').val(updated_at_to);
(updated_at_to != '') ? $('#updated_at_to').closest('.input-group').find('.resetSearchDate').css('display', 'block') : null;

// The posts sent with showAll
var posts = { column: column, order: order, page: page, whichRecords: whichRecords, searchIds: {}, searchDate: { created_at_from: created_at_from, created_at_to: created_at_to, updated_at_from: updated_at_from, updated_at_to: updated_at_to }, searchFields: {} }

// Manage the advancedSearch status (opened or closed)
var searchZone = (localStorage.getItem(controller + '_search')) ? localStorage.getItem(controller + '_search') : undefined;

if(searchZone != undefined){
    if(searchZone == 'block'){
        $('#advancedSearch').css('display', 'block');
    } else if(searchZone == 'none'){
        $('#advancedSearch').css('display', 'none');
    }
}

if(whichRecords == 'regular'){
    $('#linkWhichRecords').data('whichrecords', 'trashed');
    $('#whichIcon').removeClass('fas fa-th-list');
    $('#whichIcon').addClass('fas fa-trash');
    $('#showAllIcon').removeClass('fas fa-trash');
    $('#showAllIcon').addClass('fas fa-th-list');
    $('#whichText').text('Display trashed');
}else if(whichRecords == 'trashed'){
    $('#linkWhichRecords').data('whichrecords', 'regular');
    $('#whichIcon').removeClass('fas fa-trash');
    $('#whichIcon').addClass('fas fa-th-list');
    $('#showAllIcon').removeClass('fas fa-th-list');
    $('#showAllIcon').addClass('fas fa-trash');
    $('#whichText').text('Display regular');
}

// Link per consentire la visualizzazione dei records cestinati
$(document).on('click', '#linkWhichRecords', function(e){
    e.preventDefault();
    var whichRecords = $(this).data('whichrecords');
    localStorage.setItem(controller + '_whichRecords', whichRecords);
    posts['whichRecords'] = localStorage.getItem(controller + '_whichRecords');

    if(whichRecords == 'regular'){
        $('#linkWhichRecords').data('whichrecords', 'trashed');
        $('#whichIcon').removeClass('fas fa-th-list');
        $('#whichIcon').addClass('fas fa-trash');
        $('#showAllIcon').removeClass('fas fa-trash');
        $('#showAllIcon').addClass('fas fa-th-list');
        $('#whichText').text('Display trashed');
    }else if(whichRecords == 'trashed'){
        $('#linkWhichRecords').data('whichrecords', 'regular');
        $('#whichIcon').removeClass('fas fa-trash');
        $('#whichIcon').addClass('fas fa-th-list');
        $('#showAllIcon').removeClass('fas fa-th-list');
        $('#showAllIcon').addClass('fas fa-trash');
        $('#whichText').text('Display regular');
    }

    showAllAction();
});

// Listener for sorting data
$(document).on('click', '.sorting a.sort', function(e){
    e.preventDefault();
    var column = $(this).data('column');
    var order = $(this).data('order');
    localStorage.setItem(controller + '_column', column);
    localStorage.setItem(controller + '_order', order);
    posts['column'] = localStorage.getItem(controller + '_column');
    posts['order'] = localStorage.getItem(controller + '_order');
    showAllAction();
});

// Listener for pagination data
$(document).on('click', '.pagination li a', function(e){
    e.preventDefault();
    var page = $(this).data('page');
    localStorage.setItem(controller + '_page', page);
    posts['page'] = localStorage.getItem(controller + '_page');
    showAllAction();
});

// Listener for resetting sorting data
$(document).on('click', '#linkResetSorting', function(e){
    e.preventDefault();
    posts = resetSorting();
    showAllAction();
});

// Function for removing sorting data sessions
function resetSorting(){
    localStorage.removeItem(controller + '_column');
    localStorage.removeItem(controller + '_order');
    localStorage.removeItem(controller + '_page');
    posts['column'] = controller + '_id';
    posts['order'] = 'asc';
    posts['page'] = 1
    return posts;
}

// Listener for show all view refreshing
$(document).on('click', '#linkRefresh', function(e){
    e.preventDefault();
    showAllAction();
});

// Listener for opening or closing advancedSearch 
$(document).on('click', '#linkAdvancedSearch', function(e){
    e.preventDefault();
    advancedSearch();
});

function advancedSearch(){
    if($('#advancedSearch').css('display') == 'none') {
        $('#advancedSearch').show(300);
        localStorage.setItem(controller + '_search', 'block');
    } else if($('#advancedSearch').css('display') == 'block') {
        $('#advancedSearch').hide(300);
        localStorage.setItem(controller + '_search', 'none');
    }
}

// Listener for cleaning advanced search fields
$(document).on('click', '.resetSearchFields', function(e){
    e.preventDefault();
    var field = $(this).closest('.input-group').find("input[type='text']").attr('id');
    $(this).closest('.input-group').find("input[type='text']").val('');
    localStorage.removeItem(field);
    posts.searchFields[field] = '';
    $(this).css('display', 'none');
    showAllAction();
});

// Listener for cleaning advanced search date
$(document).on('click', '.resetSearchDate', function(e){
    e.preventDefault();
    var field = $(this).closest('.input-group').find("input[type='text']").attr('id');
    $(this).closest('.input-group').find("input[type='text']").val('');
    localStorage.removeItem(controller + '_' + field);
    posts.searchDate[field] = '';
    $(this).css('display', 'none');
    $("#" + field).datetimepicker("destroy");
    datePickerRange(field);
    showAllAction();
});

// Listener for cleaning advanced search select
$(document).on('click', '.resetSearchSelect', function(e){
    e.preventDefault();
    var field = $(this).closest('.input-group').find("select").attr('id');
    $(this).closest('.input-group').find("select").val('');
    localStorage.removeItem(field);
    posts.searchFields[field] = '';
    $(this).css('display', 'none');
    showAllAction();
});

// Listener for cleaning advanced search select ids
$(document).on('click', '.resetSearchIds', function(e){
    e.preventDefault();
    var field = $(this).closest('.input-group').find("select").attr('id');
    $(this).closest('.input-group').find("select").val('');
    localStorage.removeItem(field);
    posts.searchIds[field] = '';
    $(this).css('display', 'none');
    showAllAction();
});

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
                $(this).closest('.input-group').find('.resetSearchFields').css('display', 'block');
            } else {
                $(this).closest('.input-group').find('.resetSearchFields').css('display', 'none');
            }
            callShowAllAction();
        });
    });
}

function searchIdsListener(event, data){
    $.each(data, function(key, value) {
        var field = [value];
        $(document).on(event, "#" + field, function(){
            posts = resetSorting();
            var field = $(this).val();
            localStorage.setItem(value, field);
            posts.searchIds[value] = localStorage.getItem(value);
            if(field != ''){
                $(this).closest('.input-group').find('.resetSearchIds').css('display', 'block');
            } else {
                $(this).closest('.input-group').find('.resetSearchIds').css('display', 'none');
            }
            showAllAction();
        });
    });
}

// This function delay the calling to the showAll function
function callShowAllAction(){
    if (globalTimeout != null) {
        clearTimeout(globalTimeout);
    }
    globalTimeout = setTimeout(function() {
        globalTimeout = null;  
        showAllAction();
    }, delayTime);
}

// Listener for resetting advanced search and sorting data
$(document).on('click', '#linkResetSearch', function(e){
    e.preventDefault();
    posts = resetSearch();
    showAllAction();
});

// Function for removing sorting data and advanced search sessions
function resetSearch(){
    localStorage.removeItem(controller + '_column');
    localStorage.removeItem(controller + '_order');
    localStorage.removeItem(controller + '_page');

    posts['column'] = controller + '_id';
    posts['order'] = 'asc';
    posts['page'] = 1;

    $.each(posts.searchIds, function(key, value){
        localStorage.removeItem(key);
        $('#' + key).val('');
        posts.searchIds[key] = '';
    });

    $.each(posts.searchFields, function(key, value){
        localStorage.removeItem(key);
        $('#' + key).val('');
        posts.searchFields[key] = '';
    });

    $.each(posts.searchDate, function(key, value){
        localStorage.removeItem(controller + '_' + key);
        $('#' + key).val('');
        posts.searchDate[key] = '';
    });

    $('.resetSearchFields, .resetSearchDate, .resetSearchSelect, .resetSearchIds').css('display', 'none');

    $("#created_at_from, #created_at_to, #updated_at_from, #updated_at_to").datetimepicker("destroy");

    datePickerRange('created_at_from', 'created_at_to');
    datePickerRange('updated_at_from', 'updated_at_to');

    return posts;
}

function datePickerRange(from, to){
    var date_from = $("#" + from).datetimepicker({
        defaultDate: "+1w",
        changeMonth: false,
        numberOfMonths: 1, 
        dateFormat: "yy-mm-dd", 
        timeFormat: 'HH:mm', 
        onClose: function(dateText, inst) {
            if (date_to.val() != '') {
                var testStartDate = date_from.datetimepicker('getDate');
                var testEndDate = date_to.datetimepicker('getDate');
                if (testStartDate > testEndDate){
                    date_to.datetimepicker('setDate', testStartDate);
                }
            }
        },
        onSelect: function (selectedDateTime){
            date_to.datetimepicker('option', 'minDate', date_from.datetimepicker('getDate') );
            posts = resetSorting();
            var let_from = $("#" + from).val();
            localStorage.setItem(controller + '_' + from, let_from);
            posts.searchDate[from] = localStorage.getItem(controller + '_' + from);
            if(let_from != ''){
                $(this).closest('.input-group').find('.resetSearchDate').css('display', 'block');
            } else {
                $(this).closest('.input-group').find('.resetSearchDate').css('display', 'none');
            }
            showAllAction();
        }
    });
    var date_to = $("#" + to).datetimepicker({
        defaultDate: "+1w",
        changeMonth: false,
        numberOfMonths: 1, 
        dateFormat: "yy-mm-dd", 
        timeFormat: 'HH:mm', 
        onClose: function(dateText, inst) {
            if (date_from.val() != '') {
                var testStartDate = date_from.datetimepicker('getDate');
                var testEndDate = date_to.datetimepicker('getDate');
                if (testStartDate > testEndDate){
                    date_from.datetimepicker('setDate', testEndDate);
                }
            }
        },
        onSelect: function (selectedDateTime){
            date_from.datetimepicker('option', 'maxDate', date_to.datetimepicker('getDate') );
            posts = resetSorting();
            var let_to = $("#" + to).val();
            localStorage.setItem(controller + '_' + to, let_to);
            posts.searchDate[to] = localStorage.getItem(controller + '_' + to);
            if(let_to != ''){
                $(this).closest('.input-group').find('.resetSearchDate').css('display', 'block');
            } else {
                $(this).closest('.input-group').find('.resetSearchDate').css('display', 'none');
            }
            showAllAction();
        }
    });
}

// CRUD functions & listeners
function showAllAction(){
    var jqxhr = $.ajax({
        url: urlbase + 'admin/' + controller + '/showAllAction',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        method: 'post',
        dataType: 'json', 
        data: posts,
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
        } else {
            if(data.errors){
                $("div[class^='error_']").empty();
                $.each(data.errors, function(key, value) {
                    var element = $(".error_" + key);
                    element.html(value);
                });
                $('#showData').html('<div class="card"><div class="card-body"><div class="text-center">' + data.message + '</div></div></div>');
            } else {
                $("div[class^='error_']").empty();
                if(data.result == true) {
                    $('#showData').html(data.output);
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

$(document).on('submit', '#addForm', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    addAction(formData);
});

function addAction(formData){
    // CSRF Hash
    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
    var csrfHash = $('.csrfname').val(); // CSRF hash

    formData.append([csrfName], csrfHash);

    var jqxhr = $.ajax({
        url: urlbase + 'admin/' + controller + '/addAction',
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
                $("div[class^='error_']").empty();
                $('#addForm').get(0).reset();
                if(controller == 'circuits'){
                    $('#typesServicesRow').html('');
                } else if(controller == 'organizers'){
                    $('#circuitsTypesCoinsRow').html('');
                } else if(controller == 'events'){
                    $('#datesSlotsRow').html('');
                }
                if(data.result == true) {
                    toastr.success(data.message);
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

$(document).on('submit', '#editForm', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  editAction(formData);
});

function editAction(formData){
    // CSRF Hash
    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
    var csrfHash = $('.csrfname').val(); // CSRF hash

    formData.append([csrfName], csrfHash);

    var jqxhr = $.ajax({
        url: urlbase + 'admin/' + controller + '/editAction',
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
                    $('#editForm').get(0).reset();
                    if(data.result == true) {
                        toastr.success(data.message);
                        $('#showData').html(data.output);
                        // showLogo(formData.get(controller + '_id'), 'edit');
                        if(controller != 'profile'){
                            showAttachements(formData.get(controller + '_id'), 'edit');
                        }
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

$(document).on('submit', '.deleteForm', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var message = $(this).data('message');
  var itemlastpage = $('#itemlastpage').data('itemlastpage')
  deleteAction(formData, message, itemlastpage);
});

function deleteAction(formData, message, itemlastpage){
    if(confirm(message)){

    // CSRF Hash
    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
    var csrfHash = $('.csrfname').val(); // CSRF hash

    formData.append([csrfName], csrfHash);

    var jqxhr = $.ajax({
        url: urlbase + 'admin/' + controller + '/deleteAction',
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
                        if(localStorage.getItem(controller + '_page') > 1 && itemlastpage == 1) {
                            localStorage.setItem(controller + '_page', (localStorage.getItem(controller + '_page') - 1));
                            posts['page'] = localStorage.getItem(controller + '_page');
                        }
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

$(document).on('submit', '.statusForm', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var message = $(this).data('message');
  statusAction(formData, message);
});

function statusAction(formData, message){
    if(confirm(message)){

    // CSRF Hash
    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
    var csrfHash = $('.csrfname').val(); // CSRF hash

    formData.append([csrfName], csrfHash);

    var jqxhr = $.ajax({
        url: urlbase + 'admin/' + controller +  '/statusAction',
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

// Listener for resetting add view
$(document).on('click', '#addOutput', function(e){
    e.preventDefault();
    addOutput();
});

function addOutput(){
    var jqxhr = $.ajax({
        url: urlbase + 'admin/' + controller + '/addOutput',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        method: 'get',
        dataType: 'json', 
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
        } else {
            $('#showData').html(data.output);
        }
    }).fail(function(jqXHR, textStatus, error){
        toastr.error(error);
    }).always(function(){
        $('#showLoader').css('display', 'none').html('');
    });
}

// Listener for refreshing edit view
$(document).on('click', '#editOutput', function(e){
    e.preventDefault();
    var id = $("[name='" + controller + "_id']").val();
    editOutput(id);
});

function editOutput(id){

    // CSRF Hash
    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
    var csrfHash = $('.csrfname').val(); // CSRF hash

    var jqxhr = $.ajax({
        url: urlbase + 'admin/' + controller + '/editOutput',
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
        } else if(data.hasRole == false){
            window.location.href = urlbase + 'admin/dashboard';
            return;
        } else {
            if(data.result == 'not_found'){
                toastr.error(data.message);
            } else {
                // Update CSRF hash
                $('.csrfname').val(data.token);

                $('#showData').html(data.output);
                // showLogo(id, 'edit');
                showAttachements(id, 'edit');
            }
        }
    }).fail(function(jqXHR, textStatus, error){
        toastr.error(error);
    }).always(function(){
        $('#showLoader').css('display', 'none').html('');
    });
}

datePickerRange('created_at_from', 'created_at_to');
datePickerRange('updated_at_from', 'updated_at_to');

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
  'timeOut': '4000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

// Attachements
function showAttachements(id, view){
    var jqxhr = $.ajax({
        url: urlbase + 'admin/attachements/showAttachements',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        method: 'post',
        dataType: 'json',
        data: { id: id, view: view, controller: controller },
        beforeSend: function(){
            $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
        }
    }).done(function(data){
        $('.showAttachements').html(data.output);
    }).fail(function(jqXHR, textStatus, error){
        toastr.error(error);
    }).always(function(){
        $('#showLoader').css('display', 'none').html('');
    });
}

$(document).on('click', '.deleteAttachement', function(e){
    e.preventDefault();
    deleteAttachement($(this).data('id'), $(this).data('sectorid'));
});

function deleteAttachement(id, sectorid){
    if(confirm('Are you sure to delete the file?')){
        var jqxhr = $.ajax({
            url: urlbase + 'admin/attachements/deleteAttachement',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            method: 'post',
            dataType: 'json',
            data: { id: id, controller: controller },
            beforeSend: function(){
                $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
            }
        }).done(function(data){

            if(data.result == true) {
                toastr.success(data.message);
            } else if(data.result == false){
                toastr.error(data.message);
            }

            showAttachements(sectorid, 'edit');
            
        }).fail(function(jqXHR, textStatus, error){
            toastr.error(error);
        }).always(function(){
            $('#showLoader').css('display', 'none').html('');
        });
    }
}

$(document).on('click', '.setCoverAttachement', function(e){
    e.preventDefault();
    setCoverAttachement($(this).data('id'), $(this).data('sectorid'));
});

function setCoverAttachement(id, sectorid){
    if(confirm('Are you sure to set this image as cover?')){
        var jqxhr = $.ajax({
            url: urlbase + 'admin/attachements/setCoverAttachement',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            method: 'post',
            dataType: 'json',
            data: { id: id, sectorid: sectorid, controller: controller },
            beforeSend: function(){
                $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
            }
        }).done(function(data){

            if(data.result == true) {
                toastr.success(data.message);
            } else if(data.result == false){
                toastr.error(data.message);
            }

            showAttachements(sectorid, 'edit');
            
        }).fail(function(jqXHR, textStatus, error){
            toastr.error(error);
        }).always(function(){
            $('#showLoader').css('display', 'none').html('');
        });
    }
}

$(document).on('click', '.removeCoverAttachement', function(e){
    e.preventDefault();
    removeCoverAttachement($(this).data('id'), $(this).data('sectorid'));
});

function removeCoverAttachement(id, sectorid){
    if(confirm('Are you sure to remove this image as cover?')){
        var jqxhr = $.ajax({
            url: urlbase + 'admin/attachements/removeCoverAttachement',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            method: 'post',
            dataType: 'json',
            data: { id: id, sectorid: sectorid, controller: controller },
            beforeSend: function(){
                $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
            }
        }).done(function(data){

            if(data.result == true) {
                toastr.success(data.message);
            } else if(data.result == false){
                toastr.error(data.message);
            }
            
            showAttachements(sectorid, 'edit');
            
        }).fail(function(jqXHR, textStatus, error){
            toastr.error(error);
        }).always(function(){
            $('#showLoader').css('display', 'none').html('');
        });
    }
}

// SALVATAGGI E RIMOZIONI SEZIONI
$(document).on('submit', '#headerForm, #metaTagsForm, #imageForm', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  sectionAction(formData);
});

function sectionAction(formData){
    // CSRF Hash
    var csrfName = $('.csrfname').attr('name'); // CSRF Token name
    var csrfHash = $('.csrfname').val(); // CSRF hash

    formData.append([csrfName], csrfHash);

    var jqxhr = $.ajax({
        url: urlbase + 'admin/' + controller + '/sectionAction',
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
                $("div[class^='error_']").empty();
                if(data.result == true) {
                    toastr.success(data.message);
                    $('#' + formData.get('action')).html(data.output);
                    $.each(data.updatedDate, function(key, value) {
                        var date = $("#" + key);
                        date.html(value);
                    });
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

$(document).on('click', '.removeSectionAttachement', function(e){
  e.preventDefault();
  var id = $(this).data('id');
  var message = $(this).data('message');
  removeSectionAttachement(id, message);
});

function removeSectionAttachement(id, message){
    if(confirm(message)){
        var jqxhr = $.ajax({
            url: urlbase + 'admin/' + controller + '/removeSectionAttachement',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            method: 'post',
            dataType: 'json',
            data: { id: id, controller: controller },
            beforeSend: function(){
                $('#showLoader').css('display', 'block').html('<img src="' + urlbase + 'assets/images/backend/ajax-loader.gif">');
            }
        }).done(function(data){

            if(data.isLoggedIn == false){
                window.location.href = urlbase + 'admin/auth/login';
                return;
            } else {

                if(data.result == true) {
                    toastr.success(data.message);
                    $('#Image').html(data.output);
                    $.each(data.updatedDate, function(key, value) {
                        var date = $("#" + key);
                        date.html(value);
                    });
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