import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const toastifyOptions = {
  text: 'Fill please all fields!',
  duration: 3000,
  close: true,
  gravity: 'top',
  position: 'right',
  backgroundColor: 'linear-gradient(to right, #ff5f6d,rgb(255, 149, 0))',
};

const localStorageKey = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
};

const saveToLocalStorage = (localStorageKey, data) => {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  } catch (error) {
    console.log('🚀 ~ error:', error.message);
  }
};

const fetchFromLocalStorage = localStorageKey => {
  try {
    const data = localStorage.getItem(localStorageKey);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('🚀 ~ error:', error.message);
    return null;
  }
};

const populateFormFromLocalStorage = localStorageKey => {
  const localStorageData = fetchFromLocalStorage(localStorageKey);
  if (!localStorageData) return;

  Object.keys(localStorageData).forEach(key => {
    formData[key] = localStorageData[key];
    refs.form.elements[key].value = localStorageData[key];
  });
};

const onInput = evt => {
  formData[evt.target.name] = evt.target.value.trim();
  saveToLocalStorage(localStorageKey, formData);
};

const onSubmit = evt => {
  evt.preventDefault();

  const formElements = evt.target.elements;
  const isEmpty = Array.from(formElements)
    .filter(el => el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')
    .some(el => !el.value.trim());

  if (isEmpty) {
    Toastify(toastifyOptions).showToast();
    return;
  }

  console.log('🚀 Form submitted:', formData);
  Object.keys(formData).forEach(key => (formData[key] = ''));

  localStorage.removeItem(localStorageKey);
  evt.target.reset();
};

refs.form.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);

populateFormFromLocalStorage(localStorageKey);
