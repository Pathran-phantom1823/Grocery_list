
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
       
        $.post({
            url: '/item/create',
            // method: "POST",
            data:{item:item, qty: qty, priority:priority},
            error:(e)=>{
                
            },
            success: function (data) {
                // console.log(data);
                $('tbody').append(`<tr><td>${item}</td><td>${qty}</td><td>${priority}</td><td><center><div class="ui buttons">
                <button class="ui positive button" id="editBtn">Edit</button><div class="or"></div><button class="ui negative button deleteBtn" type="submit"
                >Delete</button></div></center>`)
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
          success: function (data) {
            row.remove(data);
          }
        })
    })

   $("#searchBtn").on('click', function(){
       console.log('click search')
       var row = $(this).closest('tr');
        var search = $('#search').val();
        $.ajax({
            url: '/item/retrieve/item',
            Datatype:"json",
            method:"GET",
            data:{search:search},
            success: function (data) {
                console.log(data)
                if(data != search){
                    row.remove(data);
                }
               
            }
        })
   })

$("#editBtn").click(function () {
    var row = $(this).closest("tr");
    var id = row.find("#id").text();
    var item = row.find('#item').text();
    var qty = row.find('#qty').text();
    var priority = row.find('#priority').text();
    console.log(item)
    $('#item2').val(item);
    $('#qty2').val(qty);
    $('#priority2').val(priority);
    $('#updateBtn').on('click', function (e) {
      e.preventDefault();
      $.ajax({
        url: '/item/update',
        method: "PUT",
        data: { id: id, item: $('#item2').val(), qty: $('#qty2').val(), priority: $('#priority2').val() },
        error: (e) => {
          console.log(e)
        },
        success: function (data) {
          var data= JSON.parse(data);
          console.log(data.item)
          row.find('#item').text(data.item);
          row.find('#qty').text(data.qty);
          row.find('#priority').text(data.priority);
          $('#Modal').modal('toggle')
        }
      })
    })
  })
    


})





