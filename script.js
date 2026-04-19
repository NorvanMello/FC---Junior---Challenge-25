const switchMode = document.querySelector("#theme")

const themeLabel = document.querySelector(".theme-label");
const themeIcon = document.querySelector(".theme-icon");

const body = document.querySelector("body")
const logoText = document.querySelector(".logo-text")
const searchContainer = document.querySelector(".search")
const mainCard = document.querySelector(".main-body")

const userName = document.querySelector(".name")
const userDate  = document.querySelector(".date")

const bioText = document.querySelector(".bio-text")

const statsSection = document.querySelector(".stats-section");
const githubCount = document.querySelectorAll(".github-count");
const githubStats = document.querySelectorAll(".repos, .followers, .following")

const linkItems = document.querySelectorAll(".link")

function updateThemeButtonContent(isLightTheme) {
    if (isLightTheme) {
        themeLabel.innerText = "DARK";
         themeIcon.src = "./assets/icon-moon.svg";
    } else {
        themeLabel.innerText = "LIGHT";
        themeIcon.src = "./assets/icon-sun.svg";
    }
}

function toggleClass(element, className) {
    return element.classList.toggle(className);
}

function applyThemeStyles() {
    //  themeElements.forEach(([element, className]) => {
    //     toggleClass(element, className);
    // });


    // githubStats.forEach(stat => {
    //     toggleClass(stat, "text-light-primary")
    // })
    // githubCount.forEach(count => {
    //     toggleClass(count, "text-light-secondary")
    // })

    // linkItems.forEach(link => {
    //     toggleClass(link, "text-light-primary")
    // })

    body.classList.toggle("bg-light-primary")
}

function updateThemeButton() {
    const isLightTheme = body.classList.contains("bg-light-primary");
    updateThemeButtonContent(isLightTheme);
}

// const themeElements = [
//     [body, "bg-light-primary"],
//     [logoText, "text-light-tertiary"],
//     [searchContainer, "bg-light-secondary"],
//     [mainCard, "bg-light-secondary"],
//     [userName, "text-light-secondary"],
//     [userDate, "text-light-primary"],
//     [bioText, "text-light-primary"],
//     [statsSection,"bg-light-primary"]
// ];

switchMode.addEventListener("click", () => {
    
    applyThemeStyles();
    updateThemeButton();
})
