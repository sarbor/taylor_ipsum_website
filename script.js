import { albumToLyrics, endpointUrl } from "./constants.js";

// Add event listener to set a random album background and placeholder lyrics when the page loads
window.addEventListener('DOMContentLoaded', setRandomAlbumBackgroundAndLyrics);

//Checkbox to decide whether to get lyrics from random songs or the default fixed song list
const shouldRandomizeLyricsCheckbox = document.getElementById('randomize');

//Form with button that user presses to generate the Taylor Swift lorem ipsum
const form = document.getElementById('generator-form');

//Textbox to display final lyrics
const loremIpsumTextbox = document.getElementById('generated-text');

// Add event listener to generate Taylor Swift lorem ipsum text when the generate button is pressed
form.addEventListener('submit', generateLoremIpsum);

/**
 * Sets the background image to a random Taylor Swift album cover and the placeholder text to matching lyrics from the album.
 */
function setRandomAlbumBackgroundAndLyrics() {
    const albumArtFolder = "images";
    const albumNames = Object.keys(albumToLyrics);
    const randomIndex = Math.floor(Math.random() * albumNames.length);
    const randomAlbum = albumNames[randomIndex];
    const imageUrl = `url(${albumArtFolder}/${randomAlbum}.jpg)`;
  
    document.body.style.backgroundImage = imageUrl;
  
    const textarea = document.getElementById("generated-text");
    textarea.placeholder = albumToLyrics[randomAlbum];
}

/**
 * Generates N paragraphs worth of Taylor Swift lyrics by calling the endpoint.
 * @param {Event} e - The event object representing the form submission event.
 */
function generateLoremIpsum(e) {
    e.preventDefault();

    const paragraphsInput = document.getElementById('paragraphs');
    const numParagraphs = paragraphsInput.value;
    
    let route = `${endpointUrl}/lyrics?numberOfParagraphs=${numParagraphs}`;

    // Add the shouldRandomizeLyrics query parameter if the checkbox is checked
    if (shouldRandomizeLyricsCheckbox.checked) {
        route += `&shouldRandomizeLyrics=true`;
    }

    // Fetch the lyrics from the API and update the textarea with the generated text
    fetch(route)
        .then(response => response.json())
        .then(data => {
            const concatenatedText = data.lyrics.join('\n\n');
            loremIpsumTextbox.value = concatenatedText;
        })
        .catch(error => {
            console.log('Error:', error);
            loremIpsumTextbox.value = "Error retrieving lyrics";
        });
}
