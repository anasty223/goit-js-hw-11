import './sass/_commons.scss';
import  NewsApiServises  from "./news-servises";
import oneCard from './handlbar/oneCard.hbs';
import gallery from "./handlbar/gallery.hbs";
import Notiflix from 'notiflix';
import LoadMoreBtn from './btn_more'


const refs = {
    searchForm: document.querySelector("#search-form"),
    imageContainer: document.querySelector('.js-articles-container'),
    // loadMore: document.querySelector('[data-action="load-more"]'),
    infoArticle:document.querySelector('.article-info')
}
const loadMoreBtn = new LoadMoreBtn(
    {
        selector: '[data-action="load-more"]',
        hidden: true,
    }
   
);
console.log(loadMoreBtn)
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


const newApiServises = new NewsApiServises();



function onSearch(evt) {
evt.preventDefault();
clearArticlesContainer();
newApiServises.query = evt.currentTarget.elements.searchQuery.value;
   
loadMoreBtn.show()
loadMoreBtn.disabled()

 if (newApiServises.query === '') {
   Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
   return;
 };

    newApiServises.resetPage();
    newApiServises.fetchArticles().then(appendHits);
    loadMoreBtn.enable();
};
 
function onLoadMore() {
    loadMoreBtn.disabled()
    newApiServises.fetchArticles().then(hits => {
    appendHits(hits);
    loadMoreBtn.enable();
    });
  
}
function appendHits(hits) {
    refs.imageContainer.insertAdjacentHTML('beforeend', gallery(hits))
    
    if(hits.length === 0) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.hide()
}
    }

// function onSucsses(hits) {
//     console.log('eto then');
//     const markupList =gallery(hits);
//   const markupOneCountries = oneCard(hits);
//   refs.imageContainer.innerHTML = markupList;
// }
function clearArticlesContainer() {
    refs.imageContainer.innerHTML = ' ';
}