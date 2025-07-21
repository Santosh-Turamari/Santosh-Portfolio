// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Update active class
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

var TxtType = function(el, toRotate, period, deleteSpeed) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.deleteSpeed = parseInt(deleteSpeed, 10) || 50;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100; // Typing speed: 100–200ms

  if (this.isDeleting) {
    delta = this.deleteSpeed; // Use custom deleteSpeed
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period; // Pause when text is fully typed
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++; // Move to next string
    delta = 500; // Delay before typing next string
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  // Target element with id="type"
  var element = document.getElementById('type');
  if (element) {
    // Configuration object
    var options = {
      strings: ["Intern @ VCTI", "Software Developer", "Student @ KLS VDIT" ,"FrontEnd Developer"],
      period: 2000,
      deleteSpeed: 50
    };
    // Initialize TxtType with the options
    new TxtType(element, options.strings, options.period, options.deleteSpeed);
  }

  // Inject CSS for the cursor
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = "#type > .wrap { border-right: 0.08em solid #fff }";
  document.body.appendChild(css);
};


// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.innerHTML = navMenu.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;

        // Here you would typically send the form data to a server
        // For this example, we'll just log it and show an alert
        console.log({ name, email, subject, message });
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        this.reset();
    });
}

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Add subtle animations to elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .education-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);

    card.classList.add('animate-in');
});

// Add animation class when element is in view
document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .education-card');

    animatedElements.forEach(el => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200);
    });
});
