const currentPage = window.location.pathname.split('/').pop();
const menuLinks = document.querySelectorAll('aside nav a');

menuLinks.forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
