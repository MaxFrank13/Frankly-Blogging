// handle log in submit

// handle new user sign up submit


const signUpToggle = (event) => {
  if (event.target.textContent === 'Sign up here'){
    console.log('here');
    document.location.replace('/signup');
  } else {
    document.location.replace('/login');
  };
};

document
  .querySelector('.toggle-form')
  .addEventListener('click', signUpToggle);