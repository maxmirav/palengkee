$(function () {
    var description;

    //Load all the things
    $(document).ready(function () {

        $.ajax({
            url: "http://localhost/grocerific/products/all.php",
            type: "GET",
            dataType: "JSON",

            success: function (data) {
                var string = JSON.stringify(data);
                var parse = JSON.parse(string);
                var parseLength = parse.length - 1;

                for (var i = 0; i <= parseLength; i++) {

                    var tblRow = "<tr>";
                    tblRow += "<td>" + parse[i]['id'] + "</td>";
                    tblRow += "<td>" + parse[i]['description'] + "</td>";
                    tblRow += "<td>" + parse[i]['size'] + "</td>";
                    tblRow += "<td>" + parse[i]['price'] + "</td>";
                    tblRow += "<td><button data-id='" + parse[i]['id'] + "' data-description='" + parse[i]['description'] + "' data-size='" + parse[i]['size'] + "' data-price='" + parse[i]['price'] + "' class='btn btn-primary btnedit' data-toggle='modal' data-target='#editProductModal'><i class='far fa-edit'></i></button>&nbsp;&nbsp;";
                    tblRow += "<button data-id='" + parse[i]['id'] + "' data-description='" + parse[i]['description'] + "' class='btn btn-danger btndelete' data-toggle='modal' data-target='#deleteProductModal'><i class='fas fa-trash-alt'></i></button></td>";
                    tblRow += "</tr>";
                    $("#inventoryTable").append(tblRow);
                }
            }

        });
    });

    //adding a new product
    $(document).on("click", "#newProdSave", function () {
        var prodDescription = $("#newProdDescription").val();
        var prodSize = $("#newProdSize").val();
        var prodPrice = $("#newProdPrice").val();

        if (prodDescription == '')
        {
            $("#newProdMsg").html("Fill up all blank fields").css("color", "red");
            $("#newProdDescription").focus();
            return false;
        }
        else if (prodSize == '')
        {
            $("#newProdMsg").html("Fill up all blank fields").css("color", "red");
            $("#newProdSize").focus();
            return false;
        }
        else if (prodPrice == '')
        {
            $("#newProdMsg").html("Fill up all blank fields").css("color", "red");
            $("#newProdPrice").focus();
            return false;
        }

        if(isNaN(prodPrice))
        {
            $("#newProdMsg").html("Numeric prices only").css("color", "red");
            $("#newProdPrice").focus();
            return false;
        }

        $.ajax({
            url: "http://localhost/grocerific/products/new.php",
            type: "POST",
            data: {
                description: prodDescription,
                size: prodSize,
                price: prodPrice

            },

            success: function (data) {
                $("#newProdMsg").html("Record saved!").css("color", "green");
            }
        });
    });

    $(document).on("click", "#newProdClose", function () {
        location.reload();
    });

    //editing a product
    $(document).on("click", ".btnedit", function () {

        var id = $(this).data('id')
        var description = $(this).data('description');
        var size = $(this).data('size');
        var price = $(this).data('price');


        $("#editProdID").val(id);
        $("#editProdDescription").val(description);
        $("#editProdSize").val(size);
        $("#editProdPrice").val(price);

    });

    //clicking on update on the edit modal
    $(document).on("click", "#editProdUpdate", function () {
        var editID = $("#editProdID").val();
        var editDescription = $("#editProdDescription").val();
        var editSize = $("#editProdSize").val();
        var editPrice = $("#editProdPrice").val();

        if (editDescription == '')
        {
            $("#editProdMsg").html("Fill up all blank fields").css("color", "red");
            $("#editProdDescription").focus();
            return false;
        }
        else if (editSize == '')
        {
            $("#editProdMsg").html("Fill up all blank fields").css("color", "red");
            $("#editProdSize").focus();
            return false;
        }
        else if (editPrice == '')
        {
            $("#editProdMsg").html("Fill up all blank fields").css("color", "red");
            $("#editProdPrice").focus();
            return false;
        }

        if(isNaN(editPrice))
        {
            $("#editProdMsg").html("Numeric prices only").css("color", "red");
            $("#newProdPrice").focus();
            return false;
        }
        

        $.ajax({
            url: "http://localhost/grocerific/products/update.php",
            type: "POST",
            data: {
                id: editID,
                description: editDescription,
                size: editSize,
                price: editPrice
            },

            success: function (data) {
                $("#editProdMsg").html("Record updated").css("color", "green");
            }
        });
    });

    $(document).on("click", "#editProdClose", function () {
        location.reload();
    });

    //deleting a product
    $(document).on("click", ".btndelete", function () {

        var id = $(this).data('id')
        var description = $(this).data('description');

        $("#delProdID").val(id);
        $("#delProdDescription").val(description);
    });

    //clicking on delete on delete modal
    $(document).on("click", "#deleteProduct", function(){
        var delID=$("#delProdID").val();
        $.ajax({
           url:"http://localhost/grocerific/products/delete.php",
           type:"POST",
           data:{
               
               id:delID
           },

           success:function(data){
              $("#deletemsg").html("Record deleted!").css("color", "red");
           }

       });
   });

   $(document).on("click", "#deleteProductClose", function () {
    location.reload();
});



});