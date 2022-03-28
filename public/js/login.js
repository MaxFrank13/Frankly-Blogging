// handle log in submit

// handle new user sign up submit


const signUpToggle = (event) => {
  if (event.target.textContent === 'Sign up here'){
    document.location.replace('/signup');
  } else {
    document.location.replace('/login');
  };
};

document
  .querySelector('.signup-login')
  .addEventListener('click', signUpToggle);