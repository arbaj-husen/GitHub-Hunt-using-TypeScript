"use strict";
let darkLightMode = document.querySelector(".mode");
const container = document.querySelector("#container");
const input = document.querySelector("#username");
const searchBtn = document.querySelector(".search-btn");
const userImage = document.querySelector(".user-img");
const userName = document.querySelector(".user-name");
const userUsername = document.querySelector(".user-username");
const userJoiningDate = document.querySelector(".user-joining-date");
const userBio = document.querySelector(".user-desc");
const userRepos = document.querySelector(".repos-count");
const userFollower = document.querySelector(".followers-count");
const userFollowing = document.querySelector(".following-count");
const userLocation = document.querySelector("[user-location]");
const userBlog = document.querySelector("[user-blog]");
const userTwitter = document.querySelector("[user-twitter]");
const userCompany = document.querySelector("[user-company]");
const noResult = document.querySelector(".no-result");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
getUserDetails("arbaj-husen");
function setDarkMode() {
    container?.classList.add("dark");
    document
        .querySelector(".username-section")
        ?.classList.add("dark");
    document.querySelector("#username")?.classList.add("dark");
    document
        .querySelector(".user-details")
        ?.classList.add("dark");
    document.querySelector(".user-name")?.classList.add("dark");
    document
        .querySelector(".followers-section")
        ?.classList.add("dark");
    document
        .querySelectorAll(".contribution")
        ?.forEach((div) => {
        div.classList.add("dark");
    });
    document.querySelectorAll(".soci-div")?.forEach((div) => {
        div.classList.add("dark");
    });
    document.querySelectorAll(".soci-icon")?.forEach((div) => {
        div.classList.add("dark");
    });
}
function removeDarkMode() {
    container?.classList.remove("dark");
    document
        .querySelector(".username-section")
        ?.classList.remove("dark");
    document
        .querySelector("#username")
        ?.classList.remove("dark");
    document
        .querySelector(".user-details")
        ?.classList.remove("dark");
    document
        .querySelector(".user-name")
        ?.classList.remove("dark");
    document
        .querySelector(".followers-section")
        ?.classList.remove("dark");
    document
        .querySelectorAll(".contribution")
        ?.forEach((div) => {
        div.classList.remove("dark");
    });
    document.querySelectorAll(".soci-div")?.forEach((div) => {
        div.classList.remove("dark");
    });
    document.querySelectorAll(".soci-icon")?.forEach((div) => {
        div.classList.remove("dark");
    });
}
function setSocialMediaColor(name, place) {
    let tag = document.querySelector(`[${name}]`);
    if (place === null) {
        tag.style.opacity = "0.7";
    }
    else
        tag.style.opacity = "1";
}
function fillUserDetails(data) {
    if (userImage)
        userImage.src = data.avatar_url;
    if (userName)
        userName.textContent = data.name;
    if (userUsername) {
        userUsername.textContent = `@${data.login}`;
        userUsername.href = `https://github.com/${data.login}`;
    }
    if (userJoiningDate) {
        let joinDate = new Date(data.created_at);
        userJoiningDate.textContent = `Joined ${joinDate.getDate()} ${months[joinDate.getMonth()]} ${joinDate.getFullYear()}`;
    }
    if (userBio)
        userBio.textContent = data.bio;
    if (userRepos)
        userRepos.textContent = String(data.public_repos);
    if (userFollower)
        userFollower.textContent = String(data.followers);
    if (userFollowing)
        userFollowing.textContent = String(data.following);
    if (userLocation) {
        userLocation.textContent = data.location ?? 'not available';
        setSocialMediaColor("location-div", data.location);
    }
    if (userBlog) {
        userBlog.textContent = data.blog !== "" ? data.blog : 'not available';
        userBlog.href = data.blog === "" ? "#" : data.blog;
        setSocialMediaColor("blog-div", data.blog);
    }
    if (userTwitter) {
        userTwitter.textContent = data.twitter_username ?? 'not available';
        userTwitter.href = data.twitter_username ? `https://x.com/${data.twitter_username}` : "#";
        setSocialMediaColor("twitter-div", data.twitter_username);
    }
    if (userCompany) {
        userCompany.textContent = data.company ?? 'not available';
        setSocialMediaColor("company-div", data.company);
    }
}
async function getUserDetails(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            noResult.style.display = "block";
            return;
        }
        const data = await response.json();
        fillUserDetails(data);
    }
    catch (err) {
        console.log(err);
    }
}
darkLightMode?.addEventListener("click", (event) => {
    event.preventDefault();
    let mode = "LIGHT";
    if (event.currentTarget instanceof HTMLElement) {
        [...event.currentTarget.children].forEach((child) => {
            console.log(child.id);
            if (child.tagName.toLowerCase() === "span") {
                child.textContent =
                    child.textContent === mode ? "DARK" : "LIGHT";
                mode = child.textContent;
            }
            if (child instanceof HTMLImageElement)
                child.src =
                    mode === "DARK"
                        ? "./assets/moon-icon.svg"
                        : "./assets/sun-icon.svg";
        });
    }
    if (mode === "DARK") {
        setDarkMode();
    }
    else {
        removeDarkMode();
    }
});
searchBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    noResult.style.display = "none";
    if (input?.value === "")
        return;
    let username = input?.value;
    getUserDetails(username);
});
