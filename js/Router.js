class Router {
    constructor() {
        // singleton 
        if (Router) {
            return Router.instance; 
        } else {
            Router.exists = true; 
            Router.instance = this; 
            return this; 
        }
    }

    on() {
        window.addEventListener('DOMContentLoaded', event => {
            this.route(); 
        })
        window.addEventListener('hashchange', event => {
            this.route(); 
        })
    }

    route() {
        let route = this.parseHash();  
        console.log(route); 

        // 1st level : 
        switch (route[0]) {
            case '': 
                this.render('home'); 
                break; 
            case 'blog': 
                this.render('blog'); 
                break; 
            case 'about': 
                this.render('about'); 
                break; 
            default:   
                this.render('404'); 
        }
    }

    render(content) {
        console.log(content); 
    }

    parseHash() {
        let hash = window.location.hash; 
        let route = hash.split('/'); 
        console.log(route.includes('#')); 
        return route.filter(item => item !== '#'); 
    }
}