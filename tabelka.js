var index, table = document.getElementById('myTable');
updateNumberOfRows();

function addRow() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);

    var c1 = row.insertCell(0);
    var c2 = row.insertCell(1);
    var c3 = row.insertCell(2);
    var c4 = row.insertCell(3);
    var c5 = row.insertCell(4);

    c1.innerHTML = '<div class="form-group"><label for="note">Wydarzenie: </label><input type="text" id="note" name="note"></div>';
    c2.innerHTML = '<div class="form-group"><label for="eventDate">Data: </label><input type="date" id="eventDate" name="eventDate"></div>';
    c3.innerHTML = '<td><button id="delete" onclick="myDeleteFunction()">Usuń wiersz</button></td>';
    c4.innerHTML = '<button onclick="movingRows(\'up\', this.parentNode.parentNode)">&ShortUpArrow;</button>';
    c5.innerHTML = '<button onclick="movingRows(\'down\', this.parentNode.parentNode)">&ShortDownArrow;</button>';

    updateNumberOfRows();
}

function myDeleteFunction() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[2].onclick = function () {
            index = this.parentElement.rowIndex;
            table.deleteRow(index);
            updateNumberOfRows();
        }
    }
}

function movingRows(direction, row) {
    var parent = row.parentNode,
        rows = parent.getElementsByTagName("tr"),
        index = row.rowIndex;

    if (direction === "up" && index > 0) {
        parent.insertBefore(row, rows[index - 1]);
    } else if (direction === "down" && index < rows.length - 1) {
        parent.insertBefore(rows[index + 1], rows[index]);
    }
    updateNumberOfRows();
}

function updateNumberOfRows() {
    var numberOfRows = table.rows.length;
    displayNumberOfRows(numberOfRows);
}

function displayNumberOfRows(numberOfRows) {
    var messageParagraph = document.getElementById("numberOfRows");

    if (numberOfRows) {
        messageParagraph.innerHTML = "Liczba wierszy w tabeli: " + numberOfRows;
    } else {
        messageParagraph.innerHTML = "Liczba wierszy w tabeli: 0";
    }
}