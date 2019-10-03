
$(document).ready(function(){
    $("#saveBtn").on('click', function () {
        console.log("click")
        var item = $('#item').val();
        var qty = $('#qty').val();
        var priority = $('#priority').val();
        $.post({
            url: '/create',
            // method: "POST",
            data:{item:item, qty: qty, priority:priority},
            error:(e)=>{
                console.log(e)
            },
            success: function (data) {
                console.log(data);
            }
        })
    })
})

//     $("#updateBtn").on('click', function () {
//         $.ajax({
//             url: '/create',
//             method: 'POST',
//             dataType: 'json',
//             data: {item:$('#item'), qty: $('#qty'), priority:$('#priority')},
//             success: function () {

//             }
//         })
//     })
// })


