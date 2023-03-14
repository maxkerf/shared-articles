async function getData() {
	const res = await fetch("./data.json");
	const data = await res.json();
	return data;
}

function createArticle(articleData) {
	const article = document.createElement("article");
	article.role = "contentinfo";
	article.ariaLabel = "Article partagé d'un blog";

	const ul = document.createElement("ul");
	ul.classList.add("tags");
	ul.ariaLabel = "Tags";
	for (let i in articleData.tags) {
		const li = document.createElement("li");
		li.classList.add("tag");
		li.textContent = articleData.tags[i];
		ul.append(li);
	}
	article.append(ul);

	const h3 = document.createElement("h3");
	h3.textContent = articleData.title;
	h3.ariaHidden = "false";
	h3.tabIndex = "-1";
	article.append(h3);

	const button = document.createElement("button");
	button.ariaLabel = "En savoir plus sur l'article";
	button.title = button.ariaLabel;
	button.ariaExpanded = "false";
	const i = document.createElement("i");
	i.classList.add("fa-solid", "fa-chevron-right");
	button.append(i);
	button.onclick = e => {
		const article = e.target.parentNode;
		const button = e.target;
		const h3 = article.querySelector("h3");
		const p = article.querySelector("p");
		const a = article.querySelector("a");

		article.classList.toggle("active");
		const isActive = article.classList.contains("active");
		button.ariaExpanded = isActive ? "true" : "false";
		h3.ariaHidden = isActive ? "true" : "false";
		p.ariaHidden = isActive ? "false" : "true";
		a.ariaHidden = isActive ? "false" : "true";
		isActive ? a.removeAttribute("tabindex") : a.setAttribute("tabindex", "-1");
		setTimeout(() => (isActive ? p.focus() : h3.focus()), 300);
	};
	article.append(button);

	const p = document.createElement("p");
	p.textContent = articleData.text;
	p.ariaHidden = "true";
	p.tabIndex = "-1";
	article.append(p);

	const a = document.createElement("a");
	a.href = articleData.url;
	a.textContent = "Lire l'article";
	a.target = "_blank";
	a.ariaHidden = "true";
	a.setAttribute("tabindex", "-1");
	article.append(a);

	return article;
}

const articleDataList = await getData();
const articleGrid = document.querySelector("#article-grid");

articleDataList.forEach(articleData => {
	const article = createArticle(articleData);
	articleGrid.append(article);
});
