$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.post("/api/cualID").then(function(data) {
 
     console.log(data.direccion[0].id);
    
     $(".member-name").text(data.direccion[0].calle);
    });
  });
  