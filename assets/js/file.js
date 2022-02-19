function search() {
    document.getElementById('search').addEventListener('keyup', function () {
        var val = String(document.getElementById('search').value); //value inside the form
        let rows = document.querySelectorAll('table tr'); //selecting the rows
        for (let i = 1; i < rows.length; i++) {
            var matches = false;
            for (let j = 0; j < rows[i].cells.length; j++) {
                //matching prefix
                let currVal = String(rows[i].cells[j].innerText);
                if (currVal.startsWith(val)) {
                    //if any column matches matches
                    rows[i].style.display = "";
                    matches = true;
                }
            }

            if (matches == false) {
                //hiding the unmatched rows
                rows[i].style.display = "none";
            }

            if (val == "") {
                //showing the matched rows
                rows[i].style.display = "";
            }
        }
    });
}

/* This function sortes the table rows based on the column selected */
function sortTableColumn(column, asc = true) {
    const ascDesc = asc ? 1 : -1; //whether we want to sort ascending or descending
    let rows = Array.from(document.querySelectorAll('table tr')); //all the rows
    let header = Array.from(document.querySelectorAll('table tr th')); //the headers
    let head = rows.shift(); //rows except header
    if (asc) {
        //if we are sorting in ascending order next time we need to sort in descending
        if (header[column].classList.contains('sort-asc')) {
            header[column].classList.remove('sort-asc');
        }
        header[column].classList.add('sort-desc');
    } else {
        //if we are sorting in descending order next time we need to sort in ascending
        if (header[column].classList.contains('sort-desc')) {
            header[column].classList.remove('sort-desc');
        }
        header[column].classList.add('sort-asc');
    }

    //sorting the rows with custom comparator
    const sortedRows = rows.sort((a, b) => {
        let firstData = a.cells[column].innerHTML;
        let secondData = b.cells[column].innerHTML;
        return (firstData >= secondData) ? ascDesc : -ascDesc;
    });

    let tBody = document.getElementsByTagName('tbody')[0];

    //removing the current rows
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    //appending the header
    tBody.appendChild(head)
    //appending the sorted rows
    tBody.append(...sortedRows);
    //re-initializing event listeners
    sort();
}

/* This function adds the event listeners to table header for sorting */
function sort() {
    let header = Array.from(document.querySelectorAll('table tr th')); //selecting the header
    for (let i = 0; i < header.length; i++) {
        let head = header[i];
        //adding the event listener
        if (head.classList.contains('sort-asc') || head.classList.length == 0) {
            //sort ascending
            head.addEventListener('click', sortTableColumn.bind(this, i, true));
        } else {
            //sort descending
            head.addEventListener('click', sortTableColumn.bind(this, i, false));
        }
    }
}

/* This function displays the next 100 records starting from a page number */
function displayPage(number) {
    let rows = document.querySelectorAll('table tr'); //selecting the rows
    let tableRows = document.querySelectorAll('table tr').length; //num of rows
    let low = 5 * (number - 1); //lower index
    let high = (tableRows <= 5 * number - 1) ? tableRows : 5 * number - 1; //upper index
    for (let i = 0; i <= tableRows; i++) {
        if (rows[i] == undefined) return;
        if (low <= i && i <= high || i == 0) {
            //if row is in range we display it
            rows[i].style.display = "";
        } else {
            //hiding the rows not in range
            rows[i].style.display = "none";
        }
    }
}

/* This function calculates the number of pages and adds the buttons */
function pagination() {
    let rows = 5; //num of rwos we want to display
    let tableRows = document.querySelectorAll('table tr').length; //num of rows
    let numPages = (tableRows % rows == 0) ? (tableRows / rows) : (tableRows / rows + 1); //number of pages
    let pageNumberDiv = document.getElementById('page-numbers'); //page buttons are added here
    for (let i = 1; i <= numPages; i++) {
        //creating the page number buttons
        let btn = document.createElement('div');
        btn.classList.add('page');
        btn.innerText = i;
        pageNumberDiv.appendChild(btn);

    }
}

/* This function adds event listener to the page buttons */
function getPage() {
    let buttons = document.getElementsByClassName('page'); //fetching the buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', displayPage.bind(this, i + 1)); //adding the event listener
    }
}


/*----------------Calling The Functions---------------------*/
search(); //search functionality
sort(); //sorting the data
pagination(); //pagination functionality
getPage(); //adding event listeners to page numbers
window.onload = displayPage(1); //loading the first page on page load