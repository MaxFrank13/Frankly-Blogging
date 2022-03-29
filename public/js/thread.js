const handlePost = async (event) => {
  event.preventDefault();
  console.log(event);
  const title = document.querySelector('.thread-title').value.trim();
  const content = document.querySelector('.thread-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/thread/', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create thread')
    }
  }
}

document
  .querySelector('.post-thread')
  .addEventListener('click', handlePost);