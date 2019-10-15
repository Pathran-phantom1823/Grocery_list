
$(document).ready(function () {
    $.ajax({
        url: '/item/retrieve/all',
        method: 'get',
        success: function (data) {
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
        if ($('form input').val() != "") {
            console.log("click")
            var row = $(this).closest("tr");
            var id = row.find("#id").text();
            var item = $('#item').val();
            var qty = $('#qty').val();
            var priority = $('#priority').val();

            $.post({
                url: '/item/create',
                // method: "POST",
                data: { item: item, qty: qty, priority: priority },
                error: (err) => {
                    var error = JSON.stringify(err);
                    console.log(error)
                    $('#error').text("❗" + error).css({ 'color': 'red', 'font-weight': '500' });
                },
                success: function (data) {
                    // console.log(data);
                    $('#error').text(" ✅ Item Added Successfully!!").css({ 'color': '#17D654', 'font-weight': '500' })

                    $('tbody').append(`<tr><td>${item}</td><td>${qty}</td><td>${priority}</td><td><center><div class="ui buttons">
                <button class="ui positive button editBtn">Edit</button><div class="or"></div><button class="ui negative button deleteBtn" type="submit"
                >Delete</button></div></center>`)
                }
            })
            $("input").val("");
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
            url: '/item/delete',
            method: 'DELETE',
            dataType: 'json',
            data: { id: id },
            success: function (data) {
                row.remove(data);
            }
        })
    })



    var row;
    var id;

    $(".editBtn").click(function () {
        row = $(this).closest("tr");
        id = row.find("#id").text();
        $.ajax({
            url: '/item/retrieve/' + id,
            method: "PUT",
            error: (e) => {
                console.log(e)
            }, success: function (data) {
                var data = JSON.parse(data);
                console.log(data)
                $('#item2').val(data.item);
                $('#qty2').val(data.qty);
                $('#priority2').val(data.priority);
            }
        })
    })

    $('#updateBtn').click(function (e) {
        e.preventDefault();
        $.ajax({
          url: '/item/update',
          method: "PUT",
          data: { id: id, item: $('#item2').val(), qty: $('#qty2').val(), priority: $('#priority2').val() },
          error: (e) => {
            $('#error').text("❗Invalid Inputs").css({ 'color': 'red', 'font-weight': '500' });
          },
          success: function (data) {
            var data = JSON.parse(data);
            console.log(data.item)
            row.find('#item').text(data.item);
            row.find('#qty').text(data.qty);
            row.find('#priority').text(data.priority);
            Swal.fire({
              type: 'success',
              title: 'Done',
              text: 'Sucessfully Updated!',
              showConfirmButton: false,
              timer: 1500
            })
            $('#editModal').modal('toggle')
          }
        })
      })
    






})





