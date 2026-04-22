const switchMode = document.querySelector("#theme")

const themeLabel = document.querySelector(".theme-label");
const themeIcon = document.querySelector(".theme-icon");

const body = document.querySelector("body")

function updateThemeButtonContent(isLightTheme) {
    if (isLightTheme) {
        themeLabel.innerText = "DARK";
        themeIcon.src = "./assets/icon-moon.svg";
    } else {
        themeLabel.innerText = "LIGHT";
        themeIcon.src = "./assets/icon-sun.svg";
    }
}

function applyThemeStyles() {

    body.classList.toggle("light-theme")

    const isLightTheme = body.classList.contains("light-theme")
    
    const theme =  isLightTheme ? "light" : "dark";
    saveTheme(theme);
}

function updateThemeButton() {
    const isLightTheme = body.classList.contains("light-theme");
    updateThemeButtonContent(isLightTheme);
}

function saveTheme(theme) {
    localStorage.setItem("theme", theme)
}

function loadTheme() {
    return localStorage.getItem("theme")
}

function initTheme() {
    const savedTheme = loadTheme();

    if(savedTheme === "light"){
        body.classList.add("light-theme")
    }

    updateThemeButton();
}

initTheme();

switchMode.addEventListener("click", () => {
    
    applyThemeStyles();
    updateThemeButton();
})

const userImg = document.querySelector(".user-img");

const userName = document.querySelector(".username");
const atUsername = document.querySelector(".at-username");
const userDate  = document.querySelector(".date");

const bioText = document.querySelector(".bio-text");

const reposCount = document.querySelector(".repos-count");
const followersCount = document.querySelector(".followers-count");
const followingCount = document.querySelector(".following-count");

const locationLinkText = document.querySelector(".location-link-text");
const twitterLinkText = document.querySelector(".twitter-link-text");
const websiteLinkText = document.querySelector(".website-link-text");
const companyLinkText = document.querySelector(".company-link-text");

async function getUser(user) {
    console.log(user)

    const response = await fetch(`https://api.github.com/users/${user}`);
    if(!response.ok) {
        throw new Error("User not found!");
    }

    const data = await response.json();

    return data;
}

function checkData(value, fallback = "Not Available") {
    return value ? value : fallback;
}

function renderUser(userData) {
    userImg.src = `${userData.avatar_url}`

    userName.innerText = `${checkData(userData.name)}`
    atUsername.innerText = `@${userData.login}`

    const date = new Date(userData.created_at) // create an Object: Current date/time based on the user's system or passing a value
    const options = { day: "2-digit", month: "short", year: "numeric" }; //format
    const formattedDate = date.toLocaleDateString("en-GB", options); // If I used un-GB the format would be: Month Day Year

    bioText.innerText = `${checkData(userData.bio, "This profile has no bio")}`

    userDate.innerText = `Joined ${formattedDate}`  

    reposCount.innerText = `${userData.public_repos}`
    followersCount.innerText = `${userData.followers}`
    followingCount.innerText = `${userData.following}`

    locationLinkText.innerText = `${checkData(userData.location)}`
    twitterLinkText.innerText = `${checkData(userData.twitter_username)}`
    websiteLinkText.innerText = `${checkData(userData.blog)}`
    companyLinkText.innerText = `${checkData(userData.company)}`
}

const inputBtn = document.querySelector(".input-btn");
const inputId = document.querySelector("#input-id");

const mainCard = document.querySelector(".main-body")
const errorContainer = document.querySelector(".error-container")

inputBtn.addEventListener("click", async () => {
    const user = inputId.value.trim().replace(/\s+/g, "");

    if(!user) return;

    mainCard.classList.remove("hidden");
    errorContainer.classList.add("hidden");

    try {

        const userData = await getUser(user);
        renderUser(userData);

    } catch(error) {
        mainCard.classList.add("hidden");
        errorContainer.classList.remove("hidden");
    }
})

inputId.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        inputBtn.click();
    }
})

