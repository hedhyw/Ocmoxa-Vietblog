document.addEventListener('DOMContentLoaded', () => {
    let aboutElement = document.getElementById('about');
    let extendedElement = document.getElementById('extended');
    aboutElement.addEventListener('click', () => {
        extendedElement.classList.remove('hidden');
        aboutElement.classList.add('hidden');
    });
});
