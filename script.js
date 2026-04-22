const switchMode = document.querySelector("#theme")

const themeLabel = document.querySelector(".theme-label");
const themeIcon = document.querySelector(".theme-icon");

const body = document.querySelector("body")
// const logoText = document.querySelector(".logo-text")
// const searchContainer = document.querySelector(".search")
// const mainCard = document.querySelector(".main-body")

// const statsSection = document.querySelector(".stats-section");
// const githubCount = document.querySelectorAll(".github-count");
// const githubStats = document.querySelectorAll(".repos, .followers, .following")

// const linkItems = document.querySelectorAll(".link")

function updateThemeButtonContent(isLightTheme) {
    if (isLightTheme) {
        themeLabel.innerText = "DARK";
        themeIcon.src = "./assets/icon-moon.svg";
    } else {
        themeLabel.innerText = "LIGHT";
        themeIcon.src = "./assets/icon-sun.svg";
    }
}

// function toggleClass(element, className) {
//     return element.classList.toggle(className);
// }

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

    body.classList.toggle("light-theme")
}

function updateThemeButton() {
    const isLightTheme = body.classList.contains("light-theme");
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

function renderUser(userData) {
    userImg.src = `${userData.avatar_url}`

    userName.innerText = `${userData.name ? userData.name : "Not Available"}`
    atUsername.innerText = `@${userData.login}`

    const date = new Date(userData.created_at) // create an Object: Current date/time based on the user's system or passing a value
    const options = { day: "2-digit", month: "short", year: "numeric" }; //format
    const formattedDate = date.toLocaleDateString("en-GB", options); // If I used un-GB the format would be: Month Day Year

    bioText.innerText = `${userData.bio ? userData.bio : "This profile has no bio"}`

    userDate.innerText = `Joined ${formattedDate}`  

    reposCount.innerText = `${userData.public_repos}`
    followersCount.innerText = `${userData.followers}`
    followingCount.innerText = `${userData.following}`

    locationLinkText.innerText = `${userData.location ? userData.location : "Not Available"}`
    twitterLinkText.innerText = `${userData.twitter_username ? userData.twitter_username : "Not Available"}`
    websiteLinkText.innerText = `${userData.blog ? userData.blog : "Not Available"}`
    companyLinkText.innerText = `${userData.company ? userData.company : "Not Available"}`
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

