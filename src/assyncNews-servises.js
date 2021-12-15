import axios from 'axios';

export class  NewApiServises{
    constructor() {
       this.searchQuery = '';
       this.page = 1;
    };

    async fetch() {
    console.log(this)
        this.incrementPage();
        
    return await axios({
      method: 'get',
      url: 'https://pixabay.com/api/', 
      params: { 
        key : '24736061-8a2fbbfe59264ca423155d5fe',
        q : `${this.searchQuery}`,
        page: `${this.page}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,  
      },
    });
  }
    // async fetchArticles() {
    //      console.log(this)
    //      this.incrementPage();
    //     const API_KEY = '24736061-8a2fbbfe59264ca423155d5fe';
      
    //     return await axios.get('https://pixabay.com/api/?key=24736061-8a2fbbfe59264ca423155d5fe', {
    //   params: {
    //    q: `${this.searchQuery}`,
    //    page: `${this.page}`,
    //     image_type: 'photo',
    //     orientation: 'horizontal',
    //     safesearch: 'true',
    //     per_page: 40,  
    //   },
    //     })
    // }

    incrementPage() {
      this.page += 1;
   }
    resetPage() {
        this.page = 1
    }
     get query() {
        return this.searchQuery
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}