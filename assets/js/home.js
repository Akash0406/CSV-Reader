/* This function validates whether the file type is csv or not */
function fileValidation() {
    var fileInput = document.getElementById('file');

    var filePath = fileInput.value;

    // allowing file type
    var allowedExtensions = /(\.csv)$/i;

    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type'); //window alert if extension dosen't match
        fileInput.value = '';
        return false;
    }

    return true; //extensions matched
}

/* Adding event listener to the submit button */
document.getElementById('submit-form').addEventListener('click', function (e) {
    e.preventDefault(); //preventing the default behaviour
    let form = document.getElementById('myForm'); //fetching the form
    let valid = fileValidation(); //checking if the file extensiom is valid or not
    if (valid) {
        form.submit(); //if valid we submit the form
    }
});