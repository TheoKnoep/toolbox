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

        html_output = `<table class="${tag_class}">${table_head}${rows}</table>`; 
        $wrapper.innerHTML = html_output; 
        return html_output; 
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





class PCSTableAdapter {
    constructor() {
    }

    adaptTable(raw_table) {
        let dom = new DOMParser().parseFromString(raw_table, "text/html");  
        let hidden = dom.querySelectorAll('.hide'); 
        hidden.forEach(elt => { elt.remove() }); 
        return dom.querySelector('body').innerHTML; 
    }
}

class PCSResultsFormater {
    constructor() {

    }

    formatGroups(results_json) {
        let output = {};
        output['name'] = 'unknown'; 
        output.url =  'unknown'; 
        output.splits = []; 

        const parseMinSec = (string) => {
            let parts = string.split(':'); 
            return parts[0]*60 + parts[1]*1; 
        }

        let current_group = 0;

        results_json.forEach((rider, index) => {
            if (index === 0) {
                output.splits.push({
                    'order': 1, 
                    'number': 1, 
                    'time': 0
                })
            } else {
                if (rider.Time === ',,') {
                    output.splits[current_group].number ++; 
                } else if (rider.Time === '-') {
                    let dnf_group_exists = output.splits.filter(item => item.order === 'dnf').length > 0; 
                    // Case DNF 
                    if (dnf_group_exists) {
                        // increment++ output.splits.number of [output.splits.order === 'dnf'] 
                        let req_ind = -1; 
                        output.splits.forEach((item, index) => {
                            if (item.order === 'dnf') {
                                req_ind = index; // should be 17
                            }
                        });
                        output.splits[req_ind].number ++; 
                    } else {
                        output.splits.push({
                            'order': 'dnf',
                            'number': 1, 
                            'time': 'dnf'
                        })
                    }
                } else {
                    current_group ++; 
                    output.splits.push({
                        'order': current_group+1, 
                        'number': 1, 
                        'time': parseMinSec(rider.Time)
                    })
                }
            }
        })
        console.log(output); 
    }
}

