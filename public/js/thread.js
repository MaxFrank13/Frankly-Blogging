const handlePost = async (event) => {
  event.preventDefault();
  const func = event.target.dataset.function;
  const id = event.target.dataset.id;

  const title = document.querySelector('.thread-title').value.trim();
  const content = document.querySelector('.thread-content').value.trim();

  switch(func) {
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
        const response = await fetch(`/api/thread/edit/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if(response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update thread. Make sure to fill in each section.');
        }
      };
      break;
    default:
      console.log('invalid input')
  };
}

document
  .querySelector('.post-thread')
  .addEventListener('click', handlePost);