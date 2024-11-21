
    // Add event listeners to dropdown items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior

            const selectedTime = this.getAttribute('data-time'); // Get the data-time value
            document.getElementById('maxPrepTime').value = selectedTime; // Set hidden input value

            // Submit the form
            document.getElementById('timeForm').submit();
        });
    });

