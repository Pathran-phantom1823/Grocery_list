
$(document).ready(function(){
    $.ajax({
        url: '/item/retrieve/all',
        method:'get',
        success:  function (data) {
          console.log(data);
        }
      })

    $("#saveBtn").on('click', function () {
        var complete = false;
        $('form input').each(function () {
            if ($(this).val() == "") {
                complete = true;
                console.log($(this).val());
            }
        });
        if ($('form input').val() !=  "") {
        console.log("click")
        var row = $(this).closest("tr");
        var id = row.find("#id").text();
        var item = $('#item').val();
        var qty = $('#qty').val();
        var priority = $('#priority').val();
        $('tbody').append(`<tr><td>${item}</td><td>${qty}</td><td>${priority}</td><td><center><div class="ui buttons">
        <button class="ui positive button" id="editBtn">Edit</button><div class="or"></div><button class="ui negative button deleteBtn" type="submit"
        >Delete</button></div></center>`)
        $.post({
            url: '/item/create',
            // method: "POST",
            data:{item:item, qty: qty, priority:priority},
            error:(e)=>{
                
            },
            success: function (data) {
                console.log(data);
            } 
        })
        Swal.fire({
            type: 'success',
            title: 'Done',
            text: 'Sucessfully Enrolled!',
        })
        $("input").val("");
    }else{
        Swal.fire({
                type: 'error',
                title: 'All Fields Are Required',
                text: 'Please Fill out all Fields'
            })
    }
    })

    $(".deleteBtn").on('click',function () {
        var row = $(this).closest("tr");
        var id = row.find("#id").text();
        row.remove();
        $.ajax({
          url: '/item/delete',
          method: 'DELETE',
          dataType: 'json',
          data: { id:id},
          success: function () {
    
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


