String.prototype.is_json = function () {
    try {
        JSON.parse(this); 
        return true; 
    } catch(err) {
        return false; 
    }
}


// Générer une chaine de caractères aléatoire unique : 
function generateUniqueString() {
    const init = ["a","b"]; 
    const timestamp = Date.now().toString(36); // Convertit l'horodatage en base 36
    const randomStr = Math.random().toString(36).substr(2); // Génère une chaîne aléatoire
    return timestamp + randomStr;
}