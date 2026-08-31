// ==========================================
// NAVIGATION
// ==========================================

// Website ke saare navigation buttons ko select karo
const navButtons = document.querySelectorAll(".nav-btn");

// Website ke saare pages ko select karo
const pages = document.querySelectorAll(".page");


// Har navigation button par click event lagao
navButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Button ke data-page attribute ki value lo
        const pageName = button.getAttribute("data-page");


        // Saare pages ko hide karo
        pages.forEach(function (page) {

            page.classList.remove("active");

        });


        // Required page ko find karo
        const selectedPage =
            document.getElementById(pageName);


        // Agar page mil gaya
        if (selectedPage) {

            // Us page ko show karo
            selectedPage.classList.add("active");

        }


        // Saare navigation buttons se active class hatao
        navButtons.forEach(function (item) {

            item.classList.remove("active");

        });


        // Current button ko active karo
        button.classList.add("active");

    });

});