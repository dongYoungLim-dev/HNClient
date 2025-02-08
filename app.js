const ajax = new XMLHttpRequest();
const root = document.getElementById('root');
const content = document.getElementById('content');
const ul = document.createElement('ul');
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const ITEM_URL = "https://api.hnpwa.com/v0/item/@id.json";

ajax.open('GET',	NEWS_URL, false); 
ajax.send();

const news = JSON.parse(ajax.responseText);

for (let i = 0; i < news.length; i++) {
	const li = document.createElement('li');
	const a = document.createElement('a');
	a.href = `#${news[i].id}`;
	a.innerHTML = news[i].title;
	li.appendChild(a);
	ul.appendChild(li);
}

root.appendChild(ul);

window.addEventListener('hashchange', () => {
	const id = location.hash.substring(1);
	

	// item url 생성
	const url = ITEM_URL.replace('@id', id);

	ajax.open('GET', url, false);
	ajax.send();

	const newsContent = JSON.parse(ajax.responseText);
	const title = `<h1>${newsContent.title}</h1>`;
	
	content.innerHTML = title;
});
