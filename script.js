function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


$(document).ready(function() {
    // Registration number validation
    $("#reg_number").on("input", function() {
        let pattern = /^BCS-\d{2}-\d{4}-\d{4}$/;
        if (!pattern.test($(this).val())) {
            alert("Invalid Registration Number Format! Use BCS-00-0000-0000.");
        }
    });

    // Password validation
    $("#confirm_password").on("input", function() {
        if ($("#password").val() !== $("#confirm_password").val()) {
            alert("Passwords do not match!");
        }
    });

    // Load regions and districts dynamically
    $.ajax({
        url: "regions.php",
        type: "GET",
        success: function(data) {
            let regions = JSON.parse(data);
            regions.forEach(region => {
                $("#region").append(new Option(region.name, region.id));
            });
        }
    });

    $("#region").on("change", function() {
        let regionId = $(this).val();
        $.ajax({
            url: "districts.php",
            type: "GET",
            data: { region_id: regionId },
            success: function(data) {
                $("#district").empty();
                let districts = JSON.parse(data);
                districts.forEach(district => {
                    $("#district").append(new Option(district.name, district.id));
                });
            }
        });
    });

    // Prevent form submission if validation fails
    $("#registrationForm").on("submit", function(event) {
        let password = $("#password").val();
        let email = $("#email").val();
        let emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(email)) {
            alert("Invalid Email Address!");
            event.preventDefault();
        }

        if (password.length < 8 || !/\W/.test(password)) {
            alert("Password must be at least 8 characters and contain a special character.");
            event.preventDefault();
        }
      $("#registrationForm")[0].reset();
  
    });
});

