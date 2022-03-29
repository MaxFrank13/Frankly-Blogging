const handleComments = (event) => {
  // take to individual thread forum page if clicking multi-comment icon from homepage
  const id = event.target.dataset.id;
  if (event.target.classList.contains('fa-comments')) {
    document.location.replace(`/api/thread/${id}`);
  };

  // open a comment interface if clicking single comment icon
  if (event.target.classList.contains('fa-comment')) {

  }

  // open editing interface if clicking on edit icon
  if (event.target.classList.contains('fa-pen-to-square')) {
    document.location.replace(`/api/thread/edit/${id}`);
  }
};

document
  .querySelectorAll('.comments-icon')
  .forEach(icon => {
    icon.addEventListener('click', handleComments);
});