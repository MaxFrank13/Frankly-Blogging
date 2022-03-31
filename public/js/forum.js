const handleIcons = (event) => {
  // take to individual thread forum page if clicking multi-comment icon from homepage
  const id = event.target.dataset.id;
  if (event.target.classList.contains('fa-comments')) {
    document.location.replace(`/api/comment/all/${id}`);
  };

  // open a comment interface if clicking single comment icon
  if (event.target.classList.contains('fa-comment')) {
    const commentForm = document.querySelector('.comment-form');

    commentForm.classList.remove('hide');
    
    commentForm
      .addEventListener('submit', handleCommentSubmit);
  }

  // open editing interface if clicking on edit icon
  if (event.target.classList.contains('fa-pen-to-square')) {
    document.location.replace(`/api/thread/${id}`);
  }
};

const handleCommentSubmit = async (event) => {;
  event.preventDefault();

  if (event.submitter.textContent === 'nevermind') {
    document.querySelector('.comment-form').classList.add('hide');
    return;
  }

  const thread_id = event.target.dataset.threadid;

  const content = document.querySelector('#comment-content').value.trim();

  if (content) {
    const response = await fetch(`/api/comment/${thread_id}`, {
      method: 'POST',
      body: JSON.stringify({ content, thread_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok && !response.redirected) {
      return document.location.replace(`/api/comment/all/${thread_id}`);
    } else if (response.redirected) {
      document.location.replace(response.url);
      return;
    }
  }

  alert('Failed to submit comment.');
  
};

document
  .querySelectorAll('i')
  .forEach(icon => {
    icon.addEventListener('click', handleIcons);
  });