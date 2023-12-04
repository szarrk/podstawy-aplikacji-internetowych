var form = document.getElementById("myForm");
var submitButton = document.getElementById("submitButton");

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    var errors=validateForm();
    displayErrorMessage(errors);
    if (errors.length === 0){
        form.submit();
    }
});

form.addEventListener('submit', function (e) {
    console.log('Formularz został wysłany!');
});

function validateForm() {
    var form = document.getElementById("myForm");
    var firstName = form.elements["firstName"];
    var lastName = form.elements["lastName"];
    var email = form.elements["email"];
    var password = form.elements["password"];
    var confirmPassword = form.elements["confirmPassword"];
    var birthDate = form.elements["birthDate"];
    var opis = form.elements["opis"];

    var errors =[];

    if (!isValidName(firstName.value)) {
        markAsInvalid(firstName);
        errors.push("Imie nie podane");
    }
    else if(firstName.value.trim().length === 0){
        markAsInvalid(firstName);
        errors.push("Imie nie moze skladac sie z samych spacji!");
    }
    else {
        markAsValid(firstName);
    }

    if (!isValidName(lastName.value)) {
        markAsInvalid(lastName);
        errors.push("Nazwisko nie podane");
    } 
    else if(lastName.value.trim().length === 0){
        markAsInvalid(lastName);
        errors.push("Nazwisko nie moze skladac sie z samych spacji!");
    } else {
        markAsValid(lastName);
    }

    if (!isValidEmail(email.value)) {
        markAsInvalid(email);
        errors.push("Email niepoprawny");
    } else {
        markAsValid(email);
    }

    if (!birthDate.value) {
        markAsInvalid(birthDate);
        errors.push("Data urodzenia nie podana!");
    } else {
        markAsValid(birthDate);
    }
    
    if (!isValidPassword(password.value)) {
        markAsInvalid(password);
        errors.push("Haslo zbyt krotkie");}
    else if (password.value.search(/\d/) == -1){
        markAsInvalid(password);
        errors.push("Haslo nie zawiera liczby!")
    }
    else {
        markAsValid(password);
    }

    if(confirmPassword.value==''){
        markAsInvalid(confirmPassword);
        errors.push("Potwierdzenie hasla nie wypelnione");
    }
    else if (!isValidConfirmPassword(password.value,confirmPassword.value)) {
        markAsInvalid(confirmPassword);
        errors.push("Potwierdzone haslo jest rozne od podanego");
    } else {
        markAsValid(confirmPassword);
    }


    if (opis.value.length > 20) {
        markAsInvalid(opis);
        errors.push("Opis nie moze byc powyzej 20 znakow!");
    } else {
        markAsValid(opis);
    }

    displayErrorMessage(errors);
    return errors;
}

function isValidName(name) {
    return name.length > 0;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    return password.length >= 8;
}

function isValidConfirmPassword(password,confirmPassword) {
    return password==confirmPassword;
}

function isValidDate(date) {
    return true;
}

function markAsInvalid(element) {
    element.classList.add("error");
    var errorStarElement = document.getElementById(element.name + "Star");
    if (errorStarElement) {
        errorStarElement.style.display = "inline";
    }
}

function markAsValid(element) {
    element.classList.remove("error");
    var errorStarElement = document.getElementById(element.name + "Star");
    if (errorStarElement) {
        errorStarElement.style.display = "none";
    }
}

function displayErrorMessage(errors) {
    var messageDiv = document.getElementById("message");
    var messageParagraph = document.createElement("p");
    var messageContent = "To jest niepoprawne:";

    if (errors && errors.length > 0) {
        errors.forEach(function(error) {
            messageContent += "<br>" + error;
        });

        messageParagraph.innerHTML = messageContent;
        messageDiv.innerHTML = "";
        messageDiv.appendChild(messageParagraph);
        messageDiv.style.display = "block";
    } else {
        messageDiv.style.display = "none";
    }
}

//test
var formElements = form.elements;
for (var i = 0; i < formElements.length; i++) {
    var element = formElements[i];
    element.addEventListener('focus', function (e) {
        markAsValid(e.target);
    });

    element.addEventListener('blur', function (e) {
        if (!isValidField(e.target)) {
            markAsInvalid(e.target);
        } else {
            markAsValid(e.target);
        }
    });
}

function isValidField(element){
    if (element.name === 'firstName' || element.name === 'lastName'){
        if (element.value.trim().length === 0){
            return false;
        }
        return isValidName(element.value);
    }
    if(element.name==='email'){
        return isValidEmail(element.value);
    }
    if (element.name=== 'birthDate') {
        if(!element.value) {
           return false;
        }
        return isValidDate(element.value);
    }
    if (element.name=== 'password'){
        if (element.value.search(/\d/) == -1){
            return false;
        }
        return isValidPassword(element.value);
    }
    if (element.name=== 'confirmPassword'){
        if(element.value==''){
            return false;
        }
        else if (!isValidConfirmPassword(form.elements["password"].value,element.value)) {
            return false;
        }
        return isValidConfirmPassword(form.elements["password"].value, element.value);
    }
    if (element.name=== 'opis'){
        if (element.value.length > 20) {
            return false;
        }
    }

    return true;
}