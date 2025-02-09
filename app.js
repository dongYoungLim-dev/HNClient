// api URL
const NEWS_URL 	= 	"https://api.hnpwa.com/v0/news/1.json";
const ITEM_URL 	= 	"https://api.hnpwa.com/v0/item/@id.json";

const ajax 			= 	new XMLHttpRequest();
const root 			= 	document.getElementById('root');

const store = {
	currentPage: 1,
}

// //pagination 처리
const limit = 10; // 한 페이지에 보여질 뉴스 수

// 전체 페이지 그룹 의 수 
const totalPage = Math.ceil(30 / limit);
// 한 화면에 보여질 페이지 그룹의 수 (1, 2, 3, 4, 5)
const pageGroup = Math.ceil(store.currentPage / limit);
// 첫 페이지 번호
let startPage = (pageGroup - 1) * limit + 1;
// 마지막 페이지 번호
let endPage = pageGroup * limit;

// Rustful API Get Method
function GET(url) {
	ajax.open('GET', url, false);
	ajax.send();
	
	return JSON.parse(ajax.responseText);
}

function newsFeeds() {

	
	const news = GET(NEWS_URL);
	const newsList = [];

	// 전체 페이지 그룹 의 수 
	const totalPage = Math.ceil(news.length / limit); 

	newsList.push('<ul>');
	for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
		newsList.push(`
			<li>
				<a href="#/show/${news[i].id}">${news[i].title}</a>
			</li>	
		`);
	};
	newsList.push('</ul>');
	newsList.push(`
		<div>
			<a href="#/page/${store.currentPage - 1 > 0 ? store.currentPage - 1 : 1}">이전 페이지</a>
			<a href="#/page/${store.currentPage + 1 < totalPage ? store.currentPage + 1 : totalPage}">다음 페이지</a>
		</div>
	`);

	root.innerHTML = newsList.join('');
	window.removeEventListener('load', newsFeeds);
}

function newsDetail() {
	const id = location.hash.substring(7); // location.hash = '#id' -> id 추출
	const NEWS_ITEM = ITEM_URL.replace('@id', id); // news item url 생성
	const newsContent = GET(NEWS_ITEM); // news detail 정보 가져오기
	const template = `
		<h1>${newsContent.title}</h1>
		<a href='#/page/${store.currentPage}'>목록으로</a>
	` 

	root.innerHTML = template;
	window.removeEventListener('hashchange', newsDetail);
}

// router Function
function router() {
	const routerPath = location.hash;

	if (routerPath === '') {
		newsFeeds();
	} else if (routerPath.indexOf('page') >= 0) {
		store.currentPage = parseInt(routerPath.substring(7));
		newsFeeds();
	} else {
		newsDetail();
	}

}

router();

// window.addEventListener('load', () => router());
window.addEventListener('hashchange', () => router());
