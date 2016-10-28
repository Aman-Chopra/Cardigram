// document ready call itself

$(document).ready(function(){

                                populateTable(); // populateTable function

                });



// Add a function show files with in the table

function populateTable() {



    // Empty content string

    var tableContent = ''; // it a variable



    // jQuery AJAX call for JSON

    $.getJSON( '/download', function( data) { // get files as data



            for(var item in data) { // one by one get and add fortable

                tableContent += '<tr>';

                tableContent += '<td>' + data[item] + '</td>'; // this file name column

                tableContent += '<td><a href='+'/'+data[item]+'>' + data[item]+ '</a></td>'; // this was the link column

            }

// this all added into the tableContent variable
if(data.length!=0){
        document.getElementById('download').style.display = "block";
        document.getElementById('heading').innerHTML = "<style: font-size:40px>" + "Table of Saved Files" + "</style>" +  "</br>";
      }
        $('#download table tbody').html(tableContent); // add into the table

    });

};
