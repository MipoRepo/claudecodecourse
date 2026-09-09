// Claude Code Opas - Extra JavaScript
// Lisätoiminnot sivuston navigointiin ja käytettävyyteen

document.addEventListener('DOMContentLoaded', function() {
    // Lisää aktiivisen navigaatiopisteen merkintä
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.md-header__link, .md-nav__link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || href === currentPath + 'index.html') {
            link.classList.add('md-nav__item--active');
        }
    });

    // Lisää "paluu alkuun" -painikkeen, jos halutaan myöhemmin
    // Tämä voidaan laajentaa tarvittaessa
});

// Tuetut klaviatuurinikmat solmelle (esim. 'gg' alkuun)
document.addEventListener('keydown', function(e) {
    // Voi lisätä näppäinkomennot myöhemmin
});

console.log('Claude Code - Opas ladattu. © 2026');
