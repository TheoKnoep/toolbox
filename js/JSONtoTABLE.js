/**
 * class qui convertit un contenu JSON en HTML brut prêt à afficher
 */

class JSONtoTable {
    constructor(json) {
        this.data = this.parseJSON(json); 
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

    render($wrapper, tag_class = 'styled-table') {
        let html_output = this.getHTML(tag_class); 
        $wrapper.innerHTML = html_output; 
        return html_output; 
    }

    getHTML(tag_class = 'styled-table') {
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

        return `<table class="${tag_class}">${table_head}${rows}</table>`; 
    }
}



class TableToJSON {
    constructor(htmlTable) {
        this.html = htmlTable; 
    }

    parse(htmlTable = this.html) {
        let output = []; 
        let dom = new DOMParser().parseFromString(htmlTable, "text/html");  
        let htmlTableParsed = dom.querySelector('table'); 
        let head = htmlTableParsed.querySelectorAll('th'); 
        let keys = []; 
        head.forEach(node => {
            keys.push(node.textContent); 
        })

        let numberOfRaws = htmlTableParsed.querySelectorAll('table tr').length-1; 
        let allHtmlRaws = htmlTableParsed.querySelectorAll('table tr'); 
        for (let i = 1; i <= numberOfRaws; i++) {
            let json_raw = {}; 
            allHtmlRaws[i].querySelectorAll('td').forEach((node, index) => {
                json_raw[keys[index]] = this.typeParser(node.textContent); 
            })
            output.push(json_raw);  
        }
        return output; 
    }


    typeParser(input) {
        if (input === '') {
            return null; 
        }
        if (isNaN(input*1)) {
            return input;  
        } else {
            return input*1; 
        }
    }
}



