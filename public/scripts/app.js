
$(document).ready(function(){
    $("#saveBtn").on('click', function () {
        console.log("click")
        var item = $('#item').val();
        var qty = $('#qty').val();
        var priority = $('#priority').val();
        $.post({
            url: '/item/create',
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

//     $("#addBtn").on('click', ()=>{
//         $('#add').val('add');
//         $('form')[0].reset();
//     })

//     $("#editBtn").on('click',()=>{
//         var item_id = $(this).attr("id");
//         $.ajax({
//             url: "/item/edit",
//             method: "PUT",
//             data:{item_id: item_id},
//             dataType: "json",
//             success: function(data){
//                 $('#item').val(data.item);
//                 $('#qty').val(data.qty);
//                 $('#priority').val(data.priority);
//             }
//         })
//     })
// })

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


