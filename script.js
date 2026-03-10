/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')
/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}
/*===== MENU HIDDEN =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TYPED JS ===============*/
const typedHome = new Typed('#home-typed', {
    strings: ['Web Developer', 'UI/UX Designer'],
    typeSpeed: 80,
    backSpeed: 40,
    loop: true,
    backDelay: 2000,
    cursorChar: '_',
});

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)


/*=============== CONTACT EMAIL JS ===============*/ 
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) =>{
    e.preventDefault();
    emailjs.sendForm('service_5h12h9e', 'template_jhr1wom', '#contact-form', 'b_XICBiaTMdjejEmd')
    .then(() =>{
        contactMessage.textContent = 'Message sent successfully✅';
        setTimeout(() =>{
            contactMessage.textContent = '';
        }, 5000);

    }, (error) =>{
        contactMessage.textContent = 'Message failed to send❌';
    });
    contactForm.reset();
}
contactForm.addEventListener('submit', sendEmail);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up');
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.scrollY
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
})

sr.reveal('.home__content, footer__container')
sr.reveal('.home__data', {delay: 300, origin : 'bottom'})

sr.reveal('.about__content, .contact__content', {origin : 'bottom'})
sr.reveal('.about__image, .contact__form', {delay: 300})

sr.reveal('.projects__card', {interval: 100})