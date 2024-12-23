const itemsArray = []
const cursor = document.querySelector(".cursor")


const loadingtl = gsap.timeline()
loadingtl.to(".overlay", {
    y : "-100%",
    duration : 1,
    delay : 0.5
})

loadingtl.from(".header h1", {
    opacity : 0,
    y : "-100px",
    duration : 1,
    
},"a")

loadingtl.from(".nav-item", {
    y: "-200%",
    duration : 1,
    stagger : 0.5,
},"a")

// for cursor animation
document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x : e.clientX - cursor.offsetWidth / 2,
        y : e.clientY - cursor.offsetHeight / 2,
        duration : 0.5,
        ease : "power2.out",
    })
})

// main animation
document.addEventListener("click", function(event) {
    const click = new Audio("assets/click.mp3")
    click.play()

    // adding dynamic elements
    const itemType = Math.random() > 0.5 ? "video" : "image";
    let container = document.createElement("div")
    let elementWidth = 700;

    if(itemType === "video") {
        const videoNumber = Math.floor(Math.random() * 7) + 1;
        container.innerHTML = `<div class="video-container">
                                <video autoplay loop muted>
                                <source src="assets/vid-${videoNumber}.mp4" type="video/mp4" />
                                </video>
                                </div>`
    } else {
        const imageNumber  = Math.floor(Math.random() * 6 ) + 1
        container.innerHTML = `<div class="img-container">
                                    <img src="assets/img-${imageNumber}.jpeg" alt=""/>
                                </div>`;
    }

    const appendedElement = container.firstChild
    document.querySelector(".items-container").appendChild(appendedElement)

    appendedElement.style.left =  `${event.clientX - elementWidth / 2}px`;
    appendedElement.style.top = `${event.clientY}px`
    const randomRotaion = Math.random() * 10 - 5

    gsap.set(appendedElement, {
        scale : 0,
        rotation : randomRotaion,
        transformOrigin : "center",
    })

    const tl = gsap.timeline()

    const randomScale = Math.random() * 0.5 + 0.5
    tl.to(appendedElement, {
        scale : randomScale,
        duration : 0.5,
        delay : 0.1,
    })

    tl.to(appendedElement, {
        y : () => `-=500`,
        opacity : 1,
        duration : 4,
        ease : none,
    }, "<").to(appendedElement, {
        opacity : 0,
        duration : 1,
        onComplete : () => {
            appendedElement.parentNode.removeChild(appendedElement)
            const index = itemsArray.indexOf(appendedElement)
            if(index > -1) {
                itemsArray.splice(index , 1)
            }
        }
    }, "-=0.5")
})