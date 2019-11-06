

$(document).ready(function () {
    $.ajax({
        url: '/employee/retrieve/all',
        method: 'get',
        success: function (data) {
            // console.log(data);
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
        if ($('form input').val() != "") {
            console.log("click")
            var row = $(this).closest("tr");
            var id = row.find("#id").text();
            var employee = $('#employee').val();
            var address = $('#address').val();
            var email = $('#email').val();
            var description = $('#description').val()

            $.post({
                url: '/employee/create',
                // method: "POST",
                data: { employee: employee, address: address, email:email,  description:description },
                error: (err) => {
                    var error = JSON.stringify(err);
                    console.log(error)
                    $('#error').text("❗" + error).css({ 'color': 'red', 'font-weight': '500' });
                },
                success: function (data) {
                    location.reload()
                    // console.log(data);
                    $('#error').text(" ✅ Item Added Successfully!!").css({ 'color': '#17D654', 'font-weight': '500' })

                    $('tbody').append(`<tr><td>${employee}</td><td>${address}</td><td>${email}</td><td><center><div class="ui buttons">
                <button class="ui positive button editBtn">Edit</button><div class="or"></div><button class="ui negative button deleteBtn" type="submit"
                >Delete</button></div></center>`)

                $('#exampleModal').modal('toggle')
                }
            })
            $("input").val("");
            $('textarea').val("")
        } else {
            Swal.fire({
                type: 'error',
                title: 'All Fields Are Required',
                text: 'Please Fill out all Fields'
            })
        }
    })

    $(".deleteBtn").on('click', function () {
        var row = $(this).closest("tr");
        var id = row.find("#id").text();
        row.remove();
        $.ajax({
            url: '/employee/delete',
            method: 'DELETE',
            dataType: 'json',
            data: { id: id },
            success: function (data) {
                location.reload()
                row.remove(data);
            }
        })
    })

    $('#searchBtn').on("click",()=>{
         var mysearchinput = $('#search').val()
        $.ajax({
            method: "GET",
            url: "/employee/search",
            data: { search: mysearchinput },
            success:function (data) {
                console.log((data.result[0].employee))
                $('tbody').empty()
                $('tbody').append(`<tr><td>${data.result[0].employee}</td><td>${data.result[0].address}</td><td>${data.result[0].email}</td><td><center><div class="ui buttons">
                <button class="ui positive button editBtn">Edit</button><div class="or"></div><button class="ui negative button deleteBtn" type="submit"
                >Delete</button></div></center>`)              
            }
        })

        // .fail(function(err) {
        //     console.log(err);
        // })
        // .done(function(data) {
        //     var datas = JSON.stringify(data.employee)
        //     console.log(data);
        //     $('tbody').append(`<tr><td>${data.result.employee}</td><td>${address}</td><td>${email}</td><td><center><div class="ui buttons">
        //     <button class="ui positive button editBtn">Edit</button><div class="or"></div><button class="ui negative button deleteBtn" type="submit"
        //     >Delete</button></div></center>`)
        // });
    
    })
   

    var row;
    var id;

    $(".editBtn").click(function () {
        row = $(this).closest("tr");
        id = row.find("#id").text();
        $.ajax({
            url: '/employee/retrieve/' + id,
            method: "PUT",
            error: (e) => {
                console.log(e)
            }, success: function (data) {
                var data = JSON.parse(data);
                console.log(data)
                $('#employee2').val(data.employee);
                $('#address2').val(data.address);
                $('#email2').val(data.email);
                $('#description2').val(data.description)
            }
        })
    })

    $('#updateBtn').click(function (e) {
        e.preventDefault();
        $.ajax({
          url: '/employee/update',
          method: "PUT",
          data: { id: id, employee: $('#employee2').val(), address: $('#address2').val(), email: $('#email2').val(), description:$('#description2').val()},
          error: (e) => {
            $('#error').text("❗Invalid Inputs").css({ 'color': 'red', 'font-weight': '500' });
          },
          success: function (data) {
            var data = JSON.parse(data);
            console.log(data.item)
            row.find('#employee').text(data.employee);
            row.find('#address').text(data.address);
            row.find('#email').text(data.email);
            Swal.fire({
              type: 'success',
              title: 'Done',
              text: 'Sucessfully Updated!',
              showConfirmButton: false,
              timer: 1500
            })
            location.reload();
            $('#editModal').modal('toggle')
          }
        })
      })
    






})





