String.prototype.is_json = function () {
    try {
        JSON.parse(this); 
        return true; 
    } catch(err) {
        return false; 
    }
}


/**
 * @abstract Générer une chaine de caractères aléatoire unique : 
 */
function generateUniqueString() {
    const init = ["a","b"]; 
    const timestamp = Date.now().toString(36); // Convertit l'horodatage en base 36
    const randomStr = Math.random().toString(36).substr(2); // Génère une chaîne aléatoire
    return timestamp + randomStr;
}


/**
 * @abstract formater de manière lisible pour un humain une somme de Bytes
 */ 
function formatBytes(bytes, decimals = 1) {
    if (!+bytes) return '0 bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
