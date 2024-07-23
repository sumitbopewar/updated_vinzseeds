(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });
    
})(jQuery);



document.addEventListener('DOMContentLoaded', function() {
    // Selecting all filter checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Adding event listener to each checkbox
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            filterProducts();
        });
    });

    // Function to filter products
    function filterProducts() {
        const products = document.querySelectorAll('.product-item');
        
        products.forEach(function(product) {
            const priceFilters = getSelectedFilters('price');
            const colorFilters = getSelectedFilters('color');
            const sizeFilters = getSelectedFilters('size');
            
            const isVisible = matchFilters(product, 'data-price', priceFilters) &&
                              matchFilters(product, 'data-color', colorFilters) &&
                              matchFilters(product, 'data-size', sizeFilters);
            
            // Show/hide product based on filters
            if (isVisible) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Function to get selected filters for a category
    function getSelectedFilters(category) {
        const selectedFilters = [];
        const checkboxes = document.querySelectorAll(`input[data-filter="${category}"]:checked`);
        
        checkboxes.forEach(function(checkbox) {
            selectedFilters.push(checkbox.id);
        });
        
        return selectedFilters;
    }

    // Function to check if a product matches selected filters
    function matchFilters(product, attribute, filters) {
        if (filters.length === 0) {
            return true;
        }
        
        const productValue = product.getAttribute(attribute);
        
        return filters.includes(productValue);
    }
});
