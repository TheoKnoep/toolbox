/**
 * class qui convertit un contenu JSON en HTML brut prêt à afficher
 */

class JSONtoTable {
    constructor(json, wrapper) {
        this.data = this.parseJSON(json); 
        this.$wrapper = wrapper; 
    }

    parseJSON(stringified_json) {
        let type = typeof stringified_json; 
        switch (type) {
            case 'string' : 
                return JSON.parse(stringified_json); 
                break; 
            case 'object' : 
                return stringified_json; 
                break; 
            default: 
                throw 'Unknown type'; 
        }
    }

    render() {
        let html_output = ''; 

        let keys = []; 

        // isolate keys of array of objects : 
        this.data.forEach(item => {
            console.log(Object.keys(item)); 
            keys.push(Object.keys(item)); 
        })
        keys = keys.flat(); 
        keys = [...new Set(keys)]; 

        // head of table : 
        let th = ''; 
        keys.forEach(key => {
            th += `<th>${key}</th>`; 
        })
        let table_head = `<tr>${th}</tr>`; 


        // body table : 
        let table_body = ''; 
        if (!this.data.length) {
            throw 'Data are no array'; 
        }
        // this.data.forEach(item => {
        //     console.log(item); 
        // })

        html_output = `<table>${table_head}${table_body}</table>`; 
        this.$wrapper.innerHTML = html_output; 
        return html_output; 
    }
}