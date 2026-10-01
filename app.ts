let darkLightMode = document.querySelector<HTMLDivElement>(".mode");
const container = document.querySelector<HTMLDivElement>("#container");
const input = document.querySelector<HTMLInputElement>("#username");
const searchBtn = document.querySelector<HTMLButtonElement>(".search-btn");
const userImage = document.querySelector<HTMLImageElement>(".user-img");
const userName = document.querySelector<HTMLDivElement>(".user-name");
const userUsername = document.querySelector<HTMLAnchorElement>(".user-username");
const userJoiningDate = document.querySelector<HTMLDivElement>(".user-joining-date");
const userBio = document.querySelector<HTMLDivElement>(".user-desc");
const userRepos = document.querySelector<HTMLDivElement>(".repos-count");
const userFollower = document.querySelector<HTMLDivElement>(".followers-count");
const userFollowing = document.querySelector<HTMLDivElement>(".following-count");
const userLocation = document.querySelector<HTMLDivElement>("[user-location]");
const userBlog = document.querySelector<HTMLAnchorElement>("[user-blog]");
const userTwitter = document.querySelector<HTMLAnchorElement>("[user-twitter]");
const userCompany = document.querySelector<HTMLAnchorElement>("[user-company]");
const noResult = document.querySelector<HTMLDivElement>(".no-result")!;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

getUserDetails("arbaj-husen");

interface User {
  login: string
  avatar_url: string
  html_url: string
  name: string
  company: any
  blog: string
  location: string
  bio: string
  twitter_username: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

function setDarkMode(): void {
	container?.classList.add("dark");
	document
		.querySelector<HTMLFormElement>(".username-section")
		?.classList.add("dark");
	document.querySelector<HTMLDivElement>("#username")?.classList.add("dark");
	document
		.querySelector<HTMLDivElement>(".user-details")
		?.classList.add("dark");
	document.querySelector<HTMLDivElement>(".user-name")?.classList.add("dark");
	document
		.querySelector<HTMLDivElement>(".followers-section")
		?.classList.add("dark");
	document
		.querySelectorAll<HTMLDivElement>(".contribution")
		?.forEach((div) => {
			div.classList.add("dark");
		});
	document.querySelectorAll<HTMLDivElement>(".soci-div")?.forEach((div) => {
		div.classList.add("dark");
	});
	document.querySelectorAll<HTMLDivElement>(".soci-icon")?.forEach((div) => {
		div.classList.add("dark");
	});
}

function removeDarkMode(): void {
	container?.classList.remove("dark");
	document
		.querySelector<HTMLDivElement>(".username-section")
		?.classList.remove("dark");
	document
		.querySelector<HTMLDivElement>("#username")
		?.classList.remove("dark");
	document
		.querySelector<HTMLDivElement>(".user-details")
		?.classList.remove("dark");
	document
		.querySelector<HTMLDivElement>(".user-name")
		?.classList.remove("dark");
	document
		.querySelector<HTMLDivElement>(".followers-section")
		?.classList.remove("dark");
	document
		.querySelectorAll<HTMLDivElement>(".contribution")
		?.forEach((div) => {
			div.classList.remove("dark");
		});
	document.querySelectorAll<HTMLDivElement>(".soci-div")?.forEach((div) => {
		div.classList.remove("dark");
	});
	document.querySelectorAll<HTMLDivElement>(".soci-icon")?.forEach((div) => {
		div.classList.remove("dark");
	});
}

function setSocialMediaColor(name:string,place:string|null):void{
	let tag = document.querySelector<HTMLDivElement>(`[${name}]`)!
	if (place===null) {	
		tag.style.opacity = "0.7";
	}
	else tag.style.opacity = "1";
}

function fillUserDetails(data:User):void{
	if (userImage)
		userImage.src = data.avatar_url;
	if (userName) userName.textContent = data.name;
	if (userUsername){
		userUsername.textContent = `@${data.login}`;
		userUsername.href = `https://github.com/${data.login}`	
	} 
	if (userJoiningDate) {
		let joinDate = new Date(data.created_at)
		userJoiningDate.textContent = `Joined ${joinDate.getDate()} ${months[joinDate.getMonth()]} ${joinDate.getFullYear()}`
	}
	if (userBio) userBio.textContent = data.bio;
	if (userRepos) userRepos.textContent = String(data.public_repos);
	if (userFollower) userFollower.textContent = String(data.followers);
	if (userFollowing) userFollowing.textContent = String(data.following);
	if (userLocation) {
		userLocation.textContent = data.location ?? 'not available';
		setSocialMediaColor("location-div",data.location)
	}
	if (userBlog) {
		userBlog.textContent = data.blog !== "" ? data.blog : 'not available';
		userBlog.href = data.blog===""? "#" : data.blog;
		setSocialMediaColor("blog-div",data.blog);
	}
	if (userTwitter) {
		userTwitter.textContent = data.twitter_username ?? 'not available';
		userTwitter.href = data.twitter_username ? `https://x.com/${data.twitter_username}` : "#";
		setSocialMediaColor("twitter-div",data.twitter_username);
	}
	if (userCompany) {
		userCompany.textContent = data.company ?? 'not available';
		setSocialMediaColor("company-div",data.company);
	}
}

async function getUserDetails(username: string): Promise<void> {
	try {
		const response = await fetch(
			`https://api.github.com/users/${username}`,
		);
		if(!response.ok){
			noResult.style.display = "block";
			return;
		}

		const data:User = await response.json();

        fillUserDetails(data);

	} catch (err) {
		console.log(err);
	}
}

darkLightMode?.addEventListener("click", (event) => {
	event.preventDefault();
	let mode: string = "LIGHT";
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
	} else {
		removeDarkMode();
	}
});

searchBtn?.addEventListener("click", (event) => {
	event.preventDefault();
	noResult.style.display = "none";
	if (input?.value === "") return;

	let username = input?.value;

	getUserDetails(username as string);
});

