import './sass/_commons.scss';
import  {NewApiServises} from './assyncNews-servises.js';
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

const newApiServises = new NewApiServises();

function appendHits(hits) {
    refs.imageContainer.insertAdjacentHTML('beforeend', gallery(hits))
    
    if(hits.length === 0) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.hide()
}
};


function onSearch(evt) {
evt.preventDefault();
clearArticlesContainer();
newApiServises.query =evt.currentTarget.elements.searchQuery.value;//e.target[0].value; 
   
loadMoreBtn.show()
loadMoreBtn.disabled()

    try {
        if (newApiServises.query === '') {
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        };
    
    newApiServises.resetPage();
   evt.currentTarget.elements.searchQuery.value = '';

   newApiServises.fetch().then(appendHits);
   }catch (error) {
    console.error(error);
  };

    loadMoreBtn.enable();
};

const loadMoreBtn = new LoadMoreBtn(
    {
        selector: '[data-action="load-more"]',
        hidden: true,
    }
);
console.log(loadMoreBtn)
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
 
function onLoadMore() {
    loadMoreBtn.disabled()
    newApiServises.fetch().then(hits => {
    appendHits(hits);
    loadMoreBtn.enable();
    });
  
}

function clearArticlesContainer() {
    refs.imageContainer.innerHTML = ' ';
}