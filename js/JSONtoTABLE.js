/**
 * class qui convertit un contenu JSON en HTML brut prêt à afficher
 */

class JSONtoTable {
    constructor(json, wrapper, tag_class) {
        this.data = this.parseJSON(json); 
        this.$wrapper = wrapper; 
        this.class = tag_class || 'styled-table'; 
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
        if (!this.data.length) {
            throw 'Data are no array'; 
        }
        let rows = ''; 
        this.data.forEach(item => {
            rows += '<tr>'; 
            for (let i in keys) {
                rows += `<td>${item[keys[i]] || ''}</td>`; 
            }
            rows += '</tr>'; 
        }) 

        html_output = `<table class="${this.class}">${table_head}${rows}</table>`; 
        this.$wrapper.innerHTML = html_output; 
        return html_output; 
    }
}