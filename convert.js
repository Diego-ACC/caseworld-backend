const fs = require('fs');

const driveLinks = [
    'https://drive.google.com/file/d/1m-pdOJihLeH6dk8UtXqFylADP5eWpgco/view?usp=drive_link',
    'https://drive.google.com/file/d/1e67Av62s4q5LDqx447WRL1JsAqB81b2W/view?usp=drive_link'
];

//Función para sacar el ID del Link y hacer el enlace directo
function genEnlaceDirecto(link){
    const match = link.match(/\/d\/(.*?)\//); //Regex que extrae solo el ID
    if( match && match[1]){
        const id = match[1];
        return `https://drive.google.com/uc?export=view&id=${id}`;
    }else{
        return null;
    }
}


driveLinks.forEach((link, index) => {
    const directo = genEnlaceDirecto(link);
    console.log(`Imagen ${index + 1}: ${directo}`);
});


//Array de objetos con los enlaces
const enlacesConvertidos = driveLinks.map((link, index) => {
    const url = genEnlaceDirecto(link);
    return {
        id: index + 1,
        original: link,
        directo: url || 'ENLACE INVÁLIDO'
    };
});


//Guardar en un archivo JSON
fs.writeFileSync('imagenes.json', JSON.stringify(enlacesConvertidos, null, 2));
console.log('Archivo imagenes.json creado con éxito');