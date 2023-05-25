import { albumToLyrics, endpointUrl } from "./constants.js"

window.addEventListener('DOMContentLoaded', () => {
    const albumArtFolder = 'images'
   
    var albumNames = Object.keys(albumToLyrics);
    var randomIndex = Math.floor(Math.random() * albumNames.length);
    
    var randomAlbum = albumNames[randomIndex];
    const imageUrl = `url(${albumArtFolder}/${randomAlbum}.jpg)`;
    document.body.style.backgroundImage = imageUrl;

    const textarea = document.getElementById('generated-text');
    textarea.placeholder = albumToLyrics[randomAlbum];
});

const form = document.getElementById('generator-form');
form.addEventListener('submit', generateLoremIpsum);
const generatedText = document.getElementById('generated-text');

function generateLoremIpsum(e) {
    e.preventDefault();

    const paragraphsInput = document.getElementById('paragraphs');
    const numParagraphs = paragraphsInput.value;

    fetch(`${endpointUrl}/lyrics?numberOfParagraphs=${numParagraphs}`)
        .then(response => response.json())
        .then(data => {
            const concatenatedText = data.lyrics.join('\n\n');
            generatedText.value = concatenatedText;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}