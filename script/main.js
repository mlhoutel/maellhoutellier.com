
document.addEventListener("DOMContentLoaded", function(){

    console.log("test")  

    let statusSwitch = false
    let switchMenu = document.getElementById("switch-menu")
    let switchContent = document.getElementById("switch-content")

    let menuGrip = document.getElementById("menu-grip")
    let grip = document.getElementById("grip")
    let menuBackground = document.getElementById("menu-background")

    let menuArray = [grip,menuBackground]//,switchContent]

    let content = document.getElementById("content")

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

    /*
    document.addEventListener('wheel',function (event){
        //only vertical scroll
        if (event.deltaY > 0)
        {
            event.preventDefault();
            smoothScroll(document.documentElement,100,1000)
        }
    })

    function smoothScroll (domElement,pixel,delay)
    {
        const intervalToRepeat = 25;
        const step = (intervalToRepeat * pixel) / delay;
        if ( step < pixel)
        {
            domElement.scrollTop += step;
            setTimeout(function (){
                smoothScroll(domElement,pixel - step,delay)
            },intervalToRepeat);
        }
    }
    */
    
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
    

    document.getElementById("home-next").addEventListener('click', function (e) {
        e.preventDefault();

        content.classList.remove('hide')

        window.scrollTo({
            top: document.documentElement.clientHeight,
            behavior: 'smooth',
        })
    });

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
                    //switchMenu.classList.remove('animated')
                    //switchContent.classList.remove('animated')
                }, 300);
            }
            
        })
    })

    switchContent.addEventListener('transitionend', function(event) {
        switchMenu.classList.remove('animated')
        switchContent.classList.remove('animated')
    }, false );


    let burger = document.getElementById('burger')
    let navbar = document.getElementById("navbar")

    burger.addEventListener('click', function() {
        burger.classList.toggle('active')
        burger.classList.toggle('not-active')

        navbar.classList.toggle("navbar-active")
        navbar.classList.toggle("navbar-unactive")
    });

    for(let d of document.getElementsByClassName("navbar-responsive"))
    {
        d.addEventListener('click',function(){
            burger.classList.remove('active')
            burger.classList.add('not-active')

            navbar.classList.remove("navbar-active")
            navbar.classList.add("navbar-unactive")
        })
    }



    let skillselects = document.querySelectorAll("#skills-select h3")
    let skillcontents = document.querySelectorAll(".skill-content")

    selectskill(document.getElementById('select-code'))

    for (let skillselect of skillselects)
    {
        skillselect.addEventListener("click", function(){
            selectskill(this)
        })
    }

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

    //Console:

    let consolelines = document.querySelectorAll(".global-listskill li")

    for (let consoleline of consolelines)
    {
        consoleline.classList.add("unwrited")
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

    },9000)


    /*
    let skillbars = document.querySelectorAll(".skillbar")
    let globalskills = document.querySelectorAll(".globalskill")
    let skilllanguages = document.getElementById('skilllanguages')

    for (let skillbar of skillbars)
    {
        skillbar.style.width = skillbar.innerText;
    }

    for (let globalskill of globalskills)
    {
        globalskill.querySelector("div").classList.add("skillHide")
        
        globalskill.addEventListener('click', function(){
            console.log(this.querySelector("div"))

            for (let skill of globalskills)
            {
                if (skill != globalskill)
                {
                    skill.querySelector("div").classList.add("skillHide")
                }
            }

            this.querySelector("div").classList.toggle("skillHide")
        })
    }

    skilllanguages.querySelector("div").classList.remove('skillHide')
    */

    //Carousel

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

    function carousel(id = 0) {
        let infosprojects = document.getElementsByClassName('projectinfo')

        for (infosproject of infosprojects)
        {
            infosproject.classList.add('hideproject')
        }

        infosprojects[id].classList.remove('hideproject')
    }

});


