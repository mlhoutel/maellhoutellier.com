//Wait the page load
document.addEventListener("DOMContentLoaded", function(){

    //Switch Menu Vars
    let statusSwitch = false
    let switchMenu = document.getElementById("switch-menu")
    let switchContent = document.getElementById("switch-content")

    let menuGrip = document.getElementById("menu-grip")
    let grip = document.getElementById("grip")
    let menuBackground = document.getElementById("menu-background")

    let menuArray = [grip,menuBackground]
    let content = document.getElementById("content")

    //Links Auto scroll
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
                behavior: "smooth"
            }); 
        });
    });
    
    //SrollTopButton auto Scroll
    let scrollstop = document.getElementsByClassName("scroll-top-button")

    for (let scrolltop of scrollstop)
    {
        scrolltop.addEventListener('click', function (e) {
            e.preventDefault();

            window.scrollTo({
            top: 0,
            behavior: 'smooth',
            });
        });  
    }
    
    //Unlock the website after the Home page
    document.getElementById("home-next").addEventListener('click', function (e) {
        e.preventDefault();

        content.classList.remove('hide')

        window.scrollTo({
            top: document.documentElement.clientHeight,
            behavior: 'smooth',
        })
    });

    //Menu slider
    menuArray.forEach( function (elem)
    {
        elem.addEventListener('click', function () {

            if (statusSwitch == false)
            {
                statusSwitch = true;

                switchMenu.classList.add('animated')
                switchContent.classList.add('animated')

                setTimeout( function() {
                    
                    if (switchMenu.classList.contains('switch-menu-open'))
                    {
                        switchMenu.classList.remove('switch-menu-open')
                        switchMenu.classList.add('switch-menu-close')

                        switchContent.classList.remove('switch-content-open')
                        switchContent.classList.add('switch-content-close')
                    }
                    else
                    {
                        switchMenu.classList.remove('switch-menu-close')
                        switchMenu.classList.add('switch-menu-open')

                        switchContent.classList.remove('switch-content-close')
                        switchContent.classList.add('switch-content-open')
                    }

                }, 100);

                setTimeout(function() {
                    statusSwitch = false
                }, 300);
            }
            
        })
    })

    //Add the transition effect only when the Slider open/close
    switchContent.addEventListener('transitionend', function(event) {
        switchMenu.classList.remove('animated')
        switchContent.classList.remove('animated')
    }, false );


    //Burger responsive navbar vars
    let burger = document.getElementById('burger')
    let navbar = document.getElementById("navbar")

    //Activate the responsive navbar
    burger.addEventListener('click', function() {
        burger.classList.toggle('active')
        burger.classList.toggle('not-active')

        navbar.classList.toggle("navbar-active")
        navbar.classList.toggle("navbar-unactive")
    });

    //Activate the navbar elements
    for(let d of document.getElementsByClassName("navbar-responsive"))
    {
        d.addEventListener('click',function(){
            burger.classList.remove('active')
            burger.classList.add('not-active')

            navbar.classList.remove("navbar-active")
            navbar.classList.add("navbar-unactive")
        })
    }

    //Skill tab selector
    let skillselects = document.querySelectorAll("#skills-select h3")
    let skillcontents = document.querySelectorAll(".skill-content")

    selectskill(document.getElementById('select-code'))

    //Activate a skill tab
    for (let skillselect of skillselects)
    {
        skillselect.addEventListener("click", function(){
            selectskill(this)
        })
    }


    //Select a skillpage from the skill tabs and update skill-rings
    function selectskill(select)
    {
        let content = document.getElementById(select.id.replace('select-','content-'))
        let skillselects = document.querySelectorAll("#skills-select h3")
        let skillcontents = document.querySelectorAll(".skill-content")

        for (let skillcontent of skillcontents) {
            skillcontent.classList.add('hideskill')
        }

        for (let skillselect of skillselects) {
            skillselect.classList.remove('selectskill')
        }

        content.classList.remove('hideskill')
        select.classList.add('selectskill')

        let progressrings = content.querySelectorAll('.progress-ring');
        for (let progressring of progressrings)
        {
            let circle = progressring.querySelector('.progress-ring-circle')
            let percentage = progressring.id.replace('sk-','')
            let mq = window.matchMedia('(max-width: 640px)')

            if(mq.matches) {
                circle.setAttribute("r", 45);
                circle.setAttribute("cx", 50);
                circle.setAttribute("cy", 50);
            }
            else
            {
                circle.setAttribute("r", 90);
                circle.setAttribute("cx", 100);
                circle.setAttribute("cy", 100);
            }

            let radius = circle.r.baseVal.value
            let circumference = radius * 2 * Math.PI
            let offset = circumference - percentage / 100 * circumference

            circle.style.strokeDasharray = circumference + "," + circumference
            circle.style.strokeDashoffset = circumference

            setTimeout(function(){
                circle.style.strokeDashoffset = offset;
            },10)

            mq.addListener(function(changed) {
                if(mq.matches) {
                    circle.setAttribute("r", 45);
                    circle.setAttribute("cx", 50);
                    circle.setAttribute("cy", 50);
                }
                else
                {
                    circle.setAttribute("r", 90);
                    circle.setAttribute("cx", 100);
                    circle.setAttribute("cy", 100);
                }

                let radius = circle.r.baseVal.value
                let circumference = radius * 2 * Math.PI
                let offset = circumference - percentage / 100 * circumference


                circle.style.strokeDasharray = circumference + "," + circumference
                circle.style.strokeDashoffset = circumference

                setTimeout(function(){
                    circle.style.strokeDashoffset = offset;
                },10)
            })
        }
    }

    //Console part
    let consolelines = document.querySelectorAll(".global-listskill li")

    for (let consoleline of consolelines)
    {
        consoleline.classList.add("unwrited")
    }

    for (let i in consolelines)
    {
        if (i <= 4)
        {
            setTimeout(function(){
                consolelines[i].classList.toggle("unwrited")
                consolelines[i].classList.toggle("writed")
            },i * 1500)
        }
    }

    setInterval(function(){

        for (let i in consolelines)
        {
            if (i <= 4)
            {
                setTimeout(function(){
                    consolelines[i].classList.toggle("unwrited")
                    consolelines[i].classList.toggle("writed")
                },i * 1500)
            }
        }

    },8500)

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

});


