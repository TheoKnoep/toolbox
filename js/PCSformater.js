

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
                        'time': rider.Time
                    })
                }
            }
        })
        // console.log(output); 
        return output; 
    }
}



