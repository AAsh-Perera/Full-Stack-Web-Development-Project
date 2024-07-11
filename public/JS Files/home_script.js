function closeMoreMenu() {
    const moreMenu = document.querySelector('.More_menu');
    moreMenu.classList.remove('open');
    const navLinks = document.querySelectorAll('.Nav_links li'); // set the opaticy of nav back to 1
    navLinks.forEach(function(link) {
        link.style.opacity = '1';
    });
    const moreMnueLinks = document.querySelectorAll('.More_menu li'); //set oppacity of side menu items to 0 using for loop
    moreMnueLinks.forEach(function(link) {
        link.style.opacity = '0';
    });
}

// inverse of closeMoreMenu func
function openMoreMenu() {
    const moreMenu = document.querySelector('.More_menu');
    moreMenu.classList.add('open');
    const navLinks = document.querySelectorAll('.Nav_links li'); //using a loop set the opactiy of nav links to 0.3
    navLinks.forEach(function(link) {
        link.style.opacity = '0.3';
    });
    const moreMnueLinks = document.querySelectorAll('.More_menu li');
    moreMnueLinks.forEach(function(link) {
        link.style.opacity = '1';
    });
}

//content menu functions
function openContentMenu () {
    const contentMenu = document.querySelector('.Content_menu');
    contentMenu.classList.add('open');
    const moreMenu = document.querySelector('.More_menu');
    moreMenu.style.display = 'none';
    const contentMenuLi = document.querySelectorAll('.Content_menu li');
    contentMenuLi.forEach(function(li){
        li.style.opacity = '1'; // needed cus by default when more menue is opened the opacity is reduced for all other li
    });
}

function closeContentMenu () {
    const contentMenu = document.querySelector('.Content_menu');
    contentMenu.classList.remove('open');
    const moreMenu = document.querySelector('.More_menu');
    moreMenu.style.display = 'block';
    const contentMenuLi = document.querySelectorAll('.Content_menu li');
    contentMenuLi.forEach(function(li){
        li.style.opacity = '0';
    });
}

//Contact form functions
document.querySelector('.Contact_form').addEventListener('submit', function (event) {
    event.preventDefault();

    // create the variables
    const email = document.getElementById('cf_email').value;
    const message = document.getElementById('cf_message').value;
    const date = new Date().toLocaleDateString();

    // now ill send the data to the server
    fetch ('/submit-form', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify({email, message, date}),
    })
    .then (response => response.json()) // convert the response to json
    .then (data => {
        console.log ('Sucess', data);
        alert('Thank you for submiting your contact details!');
        document.querySelector('.Contact_form').reset();
    })
    .catch ((error) => {
        console.error('Error: ', error);
        alert('An error occurred, Please try again.')
    });
});

//Scroll further button.
const scrollToTargetBtn = document.getElementById('Scroll_to_target');

scrollToTargetBtn.addEventListener('click', function (event) {
    const targetElement = document.getElementById('target'); // only create var if clicked
    targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});

//functions of the slide show in the home page
// this function is directly referenced from w3schools.com found at: https://www.w3schools.com/howto/howto_js_slideshow.asp 
let index = 0;
showSlides();

function showSlides () {
    let i;
    const slides = document.getElementsByClassName("Slides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; //sets the display property to none, so id hieds all the slides
    };
    index ++; 
    if (index > slides.length) {
        index = 1;
    };
    slides[index - 1].style.display = "block";
    setTimeout(showSlides, 4000); // sets a timeout so images change after a set time.
};

//Image Slider functions.
let sliderIndex = 0;
const sliderImages = document.getElementsByClassName('Slider_item');
const sliderDots = document.querySelectorAll('.Slider_dots li');
const nextBtn = document.getElementById('Next');
const prevBtn = document.getElementById('Previous');

sliderImages[sliderIndex].style.display = "block"; //Display the first slide
sliderDots[sliderIndex].classList.add('active'); //Make the dot the active dot

nextBtn.addEventListener('click', function (event) {
    sliderImages[sliderIndex].style.display = "none"; // hide the current slide
    sliderDots[sliderIndex].classList.remove('active');
    sliderIndex ++;
    if (sliderIndex > sliderImages.length - 1) {
        sliderIndex = 0;
    }
    sliderImages[sliderIndex].style.display = "block"; //show the new slide
    sliderDots[sliderIndex].classList.add('active');
});

prevBtn.addEventListener('click', function (event) {
    sliderImages[sliderIndex].style.display = "none"; // hide the current slide
    sliderDots[sliderIndex].classList.remove('active');
    sliderIndex --;
    if (sliderIndex < 0) {
        sliderIndex = sliderImages.length - 1;
    }
    sliderImages[sliderIndex].style.display = "block"; //show the new slide
    sliderDots[sliderIndex].classList.add('active');
});

//Scroll function for the header,this loads after the html has loaded.
document.addEventListener('DOMContentLoaded', function (event) {
    let lastScrollPos = 0;
    const header = document.getElementById('header');
    const headerContainer = document.getElementById('Header_container');
    // if last scroll pos < current scroll pos, the user is scrolling down
    // if last scroll pos > current Scroll pos, the user is scrolling up

    window.addEventListener('scroll', function (event) {
        var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

        if (lastScrollPos < currentScrollPos && currentScrollPos >= 300) {
            if (currentScrollPos - lastScrollPos >=20) {
                header.style.top = "-100px"; // Hide  header when scrolling down, and also if scrolling down more than 20 px
            }
        } else if (lastScrollPos > currentScrollPos) {
            header.style.top = "0px"; // Show  header when scrolling up
        }

        lastScrollPos = currentScrollPos; // Update the last scroll position
    });

    headerContainer.addEventListener ('mouseover', function (event) {
        header.style.top = "0px";
    });
});