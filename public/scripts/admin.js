$(document).ready(function() {
    $("#logoutBtn").on('click', function() {
        $.ajax({
            url: '/',
            method: 'POST',
            success: function (data) {
                window.location = "/"
                
            }
        })
    });

    $('#login').on('click', ()=>{
        var username = $('#username').val()
        var password = $('#password').val()
        $.post({
            url:'/login',
            data:{username:username, password:password},
            success: function(data) {
                console.log(data);
                
            }
        })
    })
})