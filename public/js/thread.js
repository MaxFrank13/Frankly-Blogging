const handlePost = async (event) => {
  event.preventDefault();
  const func = event.target.dataset.function;
  const id = event.target.dataset.id;

  const title = document.querySelector('.thread-title').value.trim();
  const content = document.querySelector('.thread-content').value.trim();

  switch (func) {

    case "post":
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
          alert('Failed to create thread. Make sure to fill in each section.');
        };
      };
      break;

    case "edit":
      if (title && content) {
        const response = await fetch(`/api/thread/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update thread. Make sure to fill in each section.');
        }
      };
      break;

    case "delete":
      if (confirm('Are you sure you want to delete this post? It will be gone forever!')) {
        const response = await fetch(`/api/thread/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Delete failed');
        }
      }
      break;

    case "cancel":
      document.location.replace('/dashboard');
      break;

    default:
      console.log('invalid input')
  };
}

document
  .querySelector('.btn-container')
  .addEventListener('click', handlePost);