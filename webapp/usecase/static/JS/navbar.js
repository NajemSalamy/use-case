document.getElementById('pagesDropdown').addEventListener('click', function (event) {
    event.preventDefault();

    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show');
    dropdownMenu.style.display = dropdownMenu.classList.contains('show') ? 'block' : 'none';
});

document.addEventListener('click', function (event) {
    const pagesDropdown = document.getElementById('pagesDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // Tutup dropdown jika klik di luar area dropdown
    if (!pagesDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
        dropdownMenu.style.display = 'none';
    }
});