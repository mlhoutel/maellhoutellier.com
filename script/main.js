

// Wait for the document to be fully loaded before calling the functions
document.addEventListener('DOMContentLoaded', function() {

    // Global Switch Menu Vars
    var MenuSwitched = false

    // Global Content Vars
    let content = document.getElementById('content')

    // Initialize the functions for the Switch-menu
    menuSlider(MenuSwitched)

    // Initialize the functions for the Auto-scroll Links 
    autoScroll()
    
    // Initialize the functions for the Auto-scroll-top Buttons
    scrollTop()
    
    // Initialize the functions for the Next button (unlock the website)
    unlockNext()

    // Initialize the responsive nav-bar
    setupNavbar()
    
    // Initialize the Skills and the Skill-selector
    setupSkill()

    // Initialize the Console and the Lines writing
    setupConsole() 

    setupProjects()

    
function loadCSS(stylesheetId, stylesheetLink) {

    let head  = document.getElementsByTagName('head')[0];
    // Check is the stylesheet is not already included
    if (!document.getElementById(stylesheetId)) {

        let link  = document.createElement('link');
        link.id   = stylesheetId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = stylesheetLink;
        link.media = 'all';
        head.appendChild(link);
    }
}

function autoScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            content.classList.remove('hide')

            let element = document.querySelector(this.getAttribute('href'))
            let bodyRect = document.body.getBoundingClientRect().top;
            let elementRect = element.getBoundingClientRect().top;
            let elementPosition = elementRect - bodyRect;
            let offsetPosition = elementPosition - 32;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            }); 
        });
    });
}

function scrollTop() {

    document.querySelectorAll('.scroll-top-button').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });  
    });
}

function unlockNext() {

    document.getElementById('home-next').addEventListener('click', function (e) {
        e.preventDefault();

        content.classList.remove('hide')

        window.scrollTo({
            top: document.documentElement.clientHeight,
            behavior: 'smooth',
        });
    });
}

function menuSlider(Switched) {

    let switchMenu = document.getElementById('switch-menu')
    let switchContent = document.getElementById('switch-content')

    let menuGrip = document.getElementById('menu-grip')
    let grip = document.getElementById('grip')
    let menuBackground = document.getElementById('menu-background')

    let list = [grip, switchMenu].forEach(e => {

        e.addEventListener('click', function () {
            if (!Switched) {
                Switched = true;
                switchMenu.classList.add('animated')
                switchContent.classList.add('animated')

                setTimeout(function() {
                    if (switchMenu.classList.contains('switch-menu-open')) {
                        switchMenu.classList.remove('switch-menu-open')
                        switchMenu.classList.add('switch-menu-close')
                        switchContent.classList.remove('switch-content-open')
                        switchContent.classList.add('switch-content-close')
                    } else {
                        switchMenu.classList.remove('switch-menu-close')
                        switchMenu.classList.add('switch-menu-open')
                        switchContent.classList.remove('switch-content-close')
                        switchContent.classList.add('switch-content-open')
                    }
                }, 100);

                setTimeout(function() { Switched = false }, 500);
            }
        });
    });

    //Add the transition effect only when the Slider open/close
    switchContent.addEventListener('transitionend', function(event) {
        switchMenu.classList.remove('animated')
        switchContent.classList.remove('animated')
    }, false);
}

function setupNavbar() {
    //Burger responsive navbar vars
    let burger = document.getElementById('burger')
    let navbar = document.getElementById('navbar')

    //Activate the responsive navbar
    burger.addEventListener('click', function() {
        burger.classList.toggle('active')
        burger.classList.toggle('not-active')

        navbar.classList.toggle('navbar-active')
        navbar.classList.toggle('navbar-unactive')
    });

    //Activate the navbar elements
    for(let d of document.getElementsByClassName('navbar-responsive'))
    {
        d.addEventListener('click',function(){
            burger.classList.remove('active')
            burger.classList.add('not-active')

            navbar.classList.remove('navbar-active')
            navbar.classList.add('navbar-unactive')
        })
    }
}

function setupSkill() {

    // Skill tab selector
    let skillselects = document.querySelectorAll("#skills-select h3")
    let skillcontents = document.querySelectorAll(".skill-content")

    selectSkill(document.getElementById('select-code'))

    // Activate a skill tab
    for (let skillselect of skillselects) {
        skillselect.addEventListener("click", function() { selectSkill(this) })
    }
}

//Select a skillpage from the skill tabs and update skill-rings
function selectSkill(select) {
    let content = document.getElementById(select.id.replace('select-','content-'))
    let skillselects = document.querySelectorAll("#skills-select h3")
    let skillcontents = document.querySelectorAll(".skill-content")

    for (let skillcontent of skillcontents) { skillcontent.classList.add('hideskill') }
    for (let skillselect of skillselects) { skillselect.classList.remove('selectskill') }

    content.classList.remove('hideskill')
    select.classList.add('selectskill')

    let progressRings = content.querySelectorAll('.progress-ring');
    
    let ringResolution = window.matchMedia('(max-width: 640px)')

    for (let progressRing of progressRings) {
        setupCircle(progressRing, ringResolution)
        ringResolution.addListener( function(changed) { setupCircle(progressRing, ringResolution) });
    }
}

function setupCircle(ProgessRing, RingResolution) {
    let circle = ProgessRing.querySelector('.progress-ring-circle')
    let percentage = ProgessRing.id.replace('sk-','')

    if (RingResolution.matches) {
        circle.setAttribute("r", 45);
        circle.setAttribute("cx", 50);
        circle.setAttribute("cy", 50);
    } else {
        circle.setAttribute("r", 90);
        circle.setAttribute("cx", 100);
        circle.setAttribute("cy", 100);
    }

    let radius = circle.r.baseVal.value
    let circumference = radius * 2 * Math.PI
    let offset = circumference - percentage / 100 * circumference

    circle.style.strokeDasharray = circumference + "," + circumference
    circle.style.strokeDashoffset = circumference

    setTimeout(function() { circle.style.strokeDashoffset = offset; }, 10)
}

function setupConsole() {

    let consoleLines = document.querySelectorAll(".global-listskill li")
    for (let consoleLine of consoleLines) { consoleLine.classList.add("unwrited") }

    let Delay = 1500
    writeConsole(consoleLines, Delay)
    setInterval(function() { writeConsole(consoleLines, Delay) }, (consoleLines.length+1)*Delay)
}

function writeConsole(ConsoleLines, Delay) {
    for (let i in ConsoleLines) {
        if (i < ConsoleLines.length) {
            setTimeout(function() {
                ConsoleLines[i].classList.toggle("unwrited")
                ConsoleLines[i].classList.toggle("writed")
            }, i * Delay)
        }
    }
}

function setupProjects() {
        //Carousel of projects
    let Carousel = document.getElementById('projectcarousel')
    Carousel.classList.add('hideCarousel')

    let projects = document.getElementsByClassName('project')
    for (project of projects)
    {
        project.addEventListener('click', function(){
            Carousel.classList.remove('hideCarousel')
            Carousel.classList.add('showCarousel')
            carousel(this.id.replace('project','')-1)
        })
    }

    let buttonquit = document.getElementById('buttonquit')
    let buttonleft = document.getElementById('buttonleft')
    let buttonright = document.getElementById('buttonright')
    let selectedCarousel = 0;

    buttonquit.addEventListener('click', function(){
        Carousel.classList.add('hideCarousel')
        Carousel.classList.remove('showCarousel')
    })

    carousel(selectedCarousel)    

    buttonright.addEventListener('click', function(){
        if (selectedCarousel < 5)
        {
            selectedCarousel = selectedCarousel + 1;
        }
        else
        {
            selectedCarousel = 0;
        }
        carousel(selectedCarousel)   
    })

    buttonleft.addEventListener('click', function(){
        if (selectedCarousel > 0)
        {
            selectedCarousel = selectedCarousel - 1;
        }
        else
        {
            selectedCarousel = 5;
        }
        carousel(selectedCarousel)   
    })

    let infoimgs = document.getElementsByClassName('infoimg')
    let timeinterval = 6000

    //Projects images display
    for(let infoimg of infoimgs) {

        let randomimgs = infoimg.getElementsByClassName('randimage')
        for (let randomimg of randomimgs)
        {
            randomimg.classList.add('imghide')
        }
        randomimgs[0].classList.remove('imghide')
        
        let timeout = setInterval(function(){
            nextimg(randomimgs)
        }, timeinterval)

        infoimg.addEventListener('click', function(){
            nextimg(randomimgs)
            clearTimeout(timeout)
            
            timeout = setInterval(function(){
            nextimg(randomimgs)
            }, timeinterval)
        })

    }

    //Activate the next image from the projects images
    function nextimg(randomimgs)
    {
        let current = null
        let next = null

        for (let i = 0; i < randomimgs.length; i++)
        {
            if (!randomimgs[i].classList.contains('imghide')) {
                current = randomimgs[i]

                if(i == randomimgs.length - 1) {
                    next = randomimgs[0]
                }
                else
                {
                    next = randomimgs[i+1]
                }
            }
            
        }

        if (current != null && next != null)
        {
            current.classList.add('imghide')
            next.classList.remove('imghide')
        }
    }

    //Show the project page with the id in argument and hide the others
    function carousel(id = 0) {
        let infosprojects = document.getElementsByClassName('projectinfo')

        for (infosproject of infosprojects)
        {
            infosproject.classList.add('hideproject')
        }

        infosprojects[id].classList.remove('hideproject')
    }

}
    
});


