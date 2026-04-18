const switchMode = document.querySelector("#theme");

const body = document.querySelector("body")
const logoText = document.querySelector(".logo-text")
const search = document.querySelector(".search")
const mainBody = document.querySelector(".main-body")

const userName = document.querySelector(".name")
const at = document.querySelector(".date")

const bioInfo = document.querySelector(".bio-info")
const paragraph = bioInfo.querySelector("p");

function toggleTheme(theme) {
    if (theme === "LIGHT") {
        return `DARK <img src="./assets/icon-moon.svg" alt="">`;
    } else {
        return `LIGHT <img src="./assets/icon-sun.svg" alt="">`;
    }
}

switchMode.addEventListener("click", (e) => {
    body.classList.toggle("bg-light-primary");
    
    search.classList.toggle("bg-light-secondary");
    mainBody.classList.toggle("bg-light-secondary")

    logoText.classList.toggle("text-light-tertiary");
    userName.classList.toggle("text-light-secondary")
    at.classList.toggle("text-light-primary")
    paragraph.classList.toggle("text-light-primary")


    const btn = e.currentTarget;
    const currentText = btn.textContent.trim();
    
    btn.innerHTML = toggleTheme(currentText);
})
