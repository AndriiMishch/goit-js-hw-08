import throttle from "lodash.throttle";


const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('textarea'),
    input: document.querySelector('input')
};





const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const sawedMessage = localStorage.getItem(STORAGE_KEY);
let itemName = {
    email : "",
    message : "",
};
itemName = JSON.parse(sawedMessage);


refs.form.addEventListener('submit', onFormSubmit);


refs.form.addEventListener('input', throttle((e) => {
    formData[e.target.name] = e.target.value;
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, formDataJSON);
    if(formData.email === undefined) {
        formData.email = itemName.email
    }
    if(formData.message === undefined) {
        formData.message = itemName.message
    }
    console.log(formData);
}, 500))


populateTextarea()


function onFormSubmit(e) {
    e.preventDefault();
    console.log("email: " + itemName.email);
    console.log("message: " + itemName.message);
    e.target.reset();
    localStorage.clear();
    formData = {};
}


function populateTextarea() {
    // const sawedMessage = localStorage.getItem(STORAGE_KEY);
    // const itemName = JSON.parse(sawedMessage);


    itemName.message === undefined ? refs.textarea.value = "" : refs.textarea.value = itemName.message;


    if (itemName.email === undefined) {
        refs.input.value = "";
    } else {
        refs.input.value = itemName.email;
    }
}