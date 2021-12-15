export default class NewsApiServises{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
  
         }
     fetchArticles() {
        console.log(this)
        const API_KEY = '24736061-8a2fbbfe59264ca423155d5fe';

const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

         return fetch(url).then(r => r.json()).then(data => {
          console.log(data)
          this.page += 1;
          return data.hits
});
    }
    resetPage() {
    this.page=1
}

    get query() {
        return this.searchQuery
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};