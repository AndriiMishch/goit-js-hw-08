import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('textarea'),
    input: document.querySelector('input'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const sawedMessage = localStorage.getItem(STORAGE_KEY);
let item = JSON.parse(sawedMessage)

refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener('input', throttle((e) => {
    for(const key in item) {
        if(key === "message") {
            formData.message = item.message
        }   else if(key === "email") {
            formData.email = item.email
        }
    }
    formData[e.target.name] = e.target.value;
    const formJSON = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, formJSON);


}, 500))

populateTextarea()



function onFormSubmit(e) {
    e.preventDefault();
    if(refs.input.value === "" || refs.textarea.value === "") {
        alert("Всі поля мають бути заповненими");
    } else {     

        console.log(formData);
        // console.log(`message: ${refs.textarea.value}`);
        e.target.reset();
        localStorage.clear();
        item = {};
}

}

function populateTextarea() {
    for(const key in item) {
        if(key === "message") {
            refs.textarea.value = item.message
        }   else if(key === "email") {
            refs.input.value = item.email
        }
    }
}

