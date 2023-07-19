import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('textarea'),
    input: document.querySelector('input'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const sawedMessage = localStorage.getItem(STORAGE_KEY);
const item = JSON.parse(sawedMessage)

refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener('input', throttle((e) => {

    formData[e.target.name] = e.target.value;
    const formJSON = JSON.stringify(formData)
    localStorage.setItem(STORAGE_KEY, formJSON);
    for(const key in item) {
        if(key === "message") {
            formData.message = item.message
        }   else if(key === "email") {
            formData.email = item.email
        }
    }

}, 500))

populateTextarea()



function onFormSubmit(e) {
    e.preventDefault();
    console.log(`email: ${refs.input.value}`);
    console.log(`message: ${refs.textarea.value}`);
    e.target.reset();
    localStorage.clear();
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

