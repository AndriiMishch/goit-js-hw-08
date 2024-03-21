import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  textArea: document.querySelector('textArea'),
};

let formData = {};
const STORAGE_KEY = 'feedback-form-state';
let items = JSON.parse(localStorage.getItem(STORAGE_KEY));

refs.form.addEventListener('submit', onSubmit);

setItem();

refs.form.addEventListener('input', throttle(onTyping, 500));

function onSubmit(e) {
  e.preventDefault();
  if (refs.input.value === '' || refs.textArea.value === '') {
    alert('all inputs must be fields');
  } else {
    localStorage.clear();
    e.target.reset();
  }
}

function setItem() {
  if (items !== '') {
    for (const item in items) {
      for (const ref in refs) {
        if (item === refs[ref].name) {
          refs[ref].value = items[item];
        }
      }
    }
  }
}

function onTyping(e) {
  for (const ref in refs) {
    if (refs[ref].name !== '') {
      if (e.target.name === refs[ref].name) {
        refs[ref].value = e.target.value;
      } else {
        items = JSON.parse(localStorage.getItem(STORAGE_KEY));
        for (let item in items) {
          if (item === refs[ref].name) {
            refs[ref].value = items[item];
          }
        }
      }
      formData[refs[ref].name] = refs[ref].value;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}