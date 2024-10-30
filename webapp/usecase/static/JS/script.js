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

// Event Listeners untuk tombol tambah baris
document.getElementById('addBasicStepButton').addEventListener('click', addBasicPathRow);
document.getElementById('addAlternativeStepButton').addEventListener('click', addAlternativePathRow);
document.getElementById('addExceptionStepButton').addEventListener('click', addExceptionPathRow);

