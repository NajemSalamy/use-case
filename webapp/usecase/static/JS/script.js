// Fungsi untuk menambahkan dan menghapus baris di Basic Path
function addBasicPathRow() {
    const table = document.getElementById('basicPathTable');
    const row = table.insertRow();

    row.insertCell(0).innerHTML = '';
    row.insertCell(1).innerHTML = '<textarea name="actor_step[]" rows="2"></textarea>';
    row.insertCell(2).innerHTML = '<textarea name="system_step[]" rows="2"></textarea>';

    // Tampilkan ikon delete
    document.getElementById('deleteBasicRow').style.display = 'inline-block';
}

function addAlternativePathRow() {
    const table = document.getElementById('alternativePathTable');
    const row = table.insertRow();

    row.insertCell(0).innerHTML = '';
    row.insertCell(1).innerHTML = '<textarea name="actor_step[]" rows="2"></textarea>';
    row.insertCell(2).innerHTML = '<textarea name="system_step[]" rows="2"></textarea>';

    document.getElementById('deleteAlternativeRow').style.display = 'inline-block';
}

function addExceptionPathRow() {
    const table = document.getElementById('exceptionPathTable');
    const row = table.insertRow();

    row.insertCell(0).innerHTML = '';
    row.insertCell(1).innerHTML = '<textarea name="actor_step[]" rows="2"></textarea>';
    row.insertCell(2).innerHTML = '<textarea name="system_step[]" rows="2"></textarea>';

    document.getElementById('deleteExceptionRow').style.display = 'inline-block';
}

// Event listener untuk ikon delete Basic Path
document.getElementById('deleteBasicRow').addEventListener('click', function () {
    const table = document.getElementById('basicPathTable');
    if (table.rows.length > 2) {
        table.deleteRow(table.rows.length - 1);
        if (table.rows.length === 2) {
            document.getElementById('deleteBasicRow').style.display = 'none';
        }
    }
});

// Event listener untuk ikon delete Alternative Path
document.getElementById('deleteAlternativeRow').addEventListener('click', function () {
    const table = document.getElementById('alternativePathTable');
    if (table.rows.length > 2) {
        table.deleteRow(table.rows.length - 1);
        if (table.rows.length === 2) {
            document.getElementById('deleteAlternativeRow').style.display = 'none';
        }
    }
});

// Event listener untuk ikon delete Exception Path
document.getElementById('deleteExceptionRow').addEventListener('click', function () {
    const table = document.getElementById('exceptionPathTable');
    if (table.rows.length > 2) {
        table.deleteRow(table.rows.length - 1);
        if (table.rows.length === 2) {
            document.getElementById('deleteExceptionRow').style.display = 'none';
        }
    }
});

// // Fungsi untuk memvalidasi bahwa hanya satu kolom yang diisi di setiap baris
// function validateAndSubmit(event) {
//     event.preventDefault();  // Mencegah pengiriman form langsung
//     const basicInputs = document.querySelectorAll('input[type="text"], textarea[name="summary_description"], textarea[name="pre_conditions"], textarea[name="post_conditions"]');

//     let valid = true;

//     // Validasi input dasar
//     basicInputs.forEach(input => {
//         if (input.value.trim() === '') {
//             valid = false;
//             input.classList.add('is-invalid');  // Tambah kelas CSS untuk menunjukkan error
//         } else {
//             input.classList.remove('is-invalid');
//         }
//     });

//     // Validasi langkah untuk Basic, Alternative, dan Exception Paths
//     if (!validateSteps()) {
//         valid = false;
//         alert("Please ensure only one of Actor or System is filled in each step.");
//     }

//     if (valid) {
//         // Jika valid, submit form secara program
//         document.querySelector('form').submit();
//     } else {
//         alert("Please fill in all fields before generating the diagram.");
//     }
// }

document.getElementById('useCaseForm').addEventListener('submit', validateAndSubmit);

async function validateAndSubmit(event) {
    event.preventDefault();  // Mencegah pengiriman form langsung
    const basicInputs = document.querySelectorAll('input[type="text"], textarea[name="summary_description"], textarea[name="pre_conditions"], textarea[name="post_conditions"]');

    let valid = true;

    // Validasi input dasar
    basicInputs.forEach(input => {
        if (input.value.trim() === '') {
            valid = false;
            input.classList.add('is-invalid');  // Tambah kelas CSS untuk menunjukkan error
        } else {
            input.classList.remove('is-invalid');
        }
    });

    // Validasi langkah untuk Basic, Alternative, dan Exception Paths
    if (!validateSteps()) {
        valid = false;
        alert("Please ensure only one of Actor or System is filled in each step.");
    }

    if (valid) {
        // Ambil data dari form
        const formData = new FormData(document.getElementById('useCaseForm'));

        try {
            const response = await fetch('/save_specification/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',  // Memberi tahu server bahwa ini adalah permintaan AJAX
                    'X-CSRFToken': getCookie('csrftoken') // Ambil CSRF token jika menggunakan Django
                }
            });

            if (response.ok) {
                // Tangani respons dari server
                const result = await response.json(); // Anda bisa menyesuaikan ini berdasarkan respons dari server
                console.log(result);
                alert("Data saved successfully!");
                // Lakukan tindakan lain setelah berhasil, seperti redirect atau menampilkan pesan
            } else {
                alert("Failed to save data. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while saving data.");
        }
    } else {
        alert("Please fill in all fields before generating the diagram.");
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function validateSteps() {
    let allStepsValid = true;

    // Validasi Basic Path
    const basicActorSteps = document.querySelectorAll('input[name="actor_step[]"]');
    const basicSystemSteps = document.querySelectorAll('input[name="system_step[]"]');
    allStepsValid = validatePathSteps(basicActorSteps, basicSystemSteps);

    // Validasi Alternative Path
    const altActorSteps = document.querySelectorAll('input[name="alt_actor_step[]"]');
    const altSystemSteps = document.querySelectorAll('input[name="alt_system_step[]"]');
    allStepsValid = validatePathSteps(altActorSteps, altSystemSteps) && allStepsValid;

    // Validasi Exception Path
    const excActorSteps = document.querySelectorAll('input[name="exc_actor_step[]"]');
    const excSystemSteps = document.querySelectorAll('input[name="exc_system_step[]"]');
    allStepsValid = validatePathSteps(excActorSteps, excSystemSteps) && allStepsValid;

    return allStepsValid;
}

function validatePathSteps(actorSteps, systemSteps) {
    let valid = true;

    actorSteps.forEach((actorStep, index) => {
        if (actorStep.value.trim() === '' && systemSteps[index].value.trim() === '') {
            valid = false;
            actorStep.classList.add('is-invalid');  // Tambah kelas CSS untuk menunjukkan error
            systemSteps[index].classList.add('is-invalid');  // Tambah kelas CSS untuk menunjukkan error
        } else {
            actorStep.classList.remove('is-invalid');
            systemSteps[index].classList.remove('is-invalid');
        }
    });

    return valid;
}



// Event Listeners untuk tombol tambah baris
document.getElementById('addBasicStepButton').addEventListener('click', addBasicPathRow);
document.getElementById('addAlternativeStepButton').addEventListener('click', addAlternativePathRow);
document.getElementById('addExceptionStepButton').addEventListener('click', addExceptionPathRow);

