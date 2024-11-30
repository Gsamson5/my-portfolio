const navbar = document.getElementById("nav");
const navBtn = document.getElementById("nav-btn");
const closeBtn = document.getElementById("sidebar-btn");
const sidebar = document.getElementById("sidebar");
const date = document.getElementById("date");
const btnScrollTo = document.querySelector('.header-btn');
const aboutSection = document.querySelector('#about');
const navList = document.querySelector('.nav-lists');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
const sliderImgs = document.querySelectorAll('.project-img');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');


// navbar fixed
/*
window.addEventListener("scroll", function () {
    if (window.pageYOffset > 400) {
        navbar.classList.add("navbar-fixed");
    } else {
        navbar.classList.remove("navbar-fixed");
    }
});
*/

// better way of making nav sticky

/*
 1) It should remain sticky at the end of the header element i.e threshold = 0;
2) observe header element
3) calculate the nav height dynamically
4) root set to null means the entire viewport
5)add the sticky class when the intersecting is false and remove when it is true inside your function
note: intersectOberver takes two parament; the function and an object ((), {})
*/

const navbarHeight = navbar.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        navbar.classList.add("navbar-fixed");
    } else {
        navbar.classList.remove("navbar-fixed");

    };
};

const headerObserve = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navbarHeight}px`,
});
headerObserve.observe(header);


// Show sidebar
navBtn.addEventListener("click", function () {
    sidebar.classList.add("show-sidebar");
});

// close sidebar
closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar")
}
);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('show-sidebar')) {
        sidebar.classList.remove("show-sidebar");
    }
});

// smooth scrolling of header btn
btnScrollTo.addEventListener('click', function () {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// smooth scrolling of nav elements
/*
navList.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav-link')) {
        const pageTo = e.target.getAttribute('href');
        document.querySelector(pageTo).scrollIntoView({ behavior: 'smooth' });
    }

});
*/

// fade in contents

const FadeInContent = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden');
    ;
    observer.unobserve(entry.target);
};

const observeSection = new IntersectionObserver(FadeInContent, {
    root: null,
    threshold: 0.10,
});

allSection.forEach(function (section) {
    section.classList.add('section-hidden');
    observeSection.observe(section);
});

// Slider images

// 1) initial condition

let currentSlide = 0;
const maxSlide = sliderImgs.length;

console.log(sliderImgs);
// 2) placing of the image side by side

sliderImgs.forEach(function (img, i) {
    img.style.transform = `translateX(${100 * i}%)`;
});

// 3) right move

btnRight.addEventListener('click', function () {
    if (currentSlide === maxSlide - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    sliderImgs.forEach(function (img, i) {
        img.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });

    // 4) moving to the left
    btnLeft.addEventListener('click', function () {
        if (currentSlide === 0) {
            currentSlide = maxSlide - 1;

        } else {
            currentSlide--;
        }
        sliderImgs.forEach(function (img, i) {
            img.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
        })
    })


})




// date

date.innerHTML = new Date().getFullYear();