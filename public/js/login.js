// handle log in submit
const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    };
  };
};
// handle new user sign up submit
const handleSignUp = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassowrd = document.querySelector('#password-confirm').value.trim();

  if (password !== confirmPassowrd) return alert("passowrds don't match");

  if (name && email && password && confirmPassowrd) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirmPassowrd }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    };
  }
}

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

if (document.location.pathname === '/login') {
  document
    .querySelector('.login')
    .addEventListener('submit', handleLogin);
} else {
  document
    .querySelector('.sign-up')
    .addEventListener('submit', handleSignUp);
}

