window.addEventListener('DOMContentLoaded', () => {
    const folderName = 'images'
    const images = ['ts.jpg', 'fearless.jpg', 'speak_now.jpg', 'red.jpg',
        '1989.jpg', 'reputation.jpg', 'lover.jpg', 'folklore.jpg',
        'evermore.jpg', 'midnights.jpg'];

    const randomIndex = Math.floor(Math.random() * images.length);
    const imageUrl = `url(${folderName}/${images[randomIndex]})`;

    document.body.style.backgroundImage = imageUrl;
});

const form = document.getElementById('generator-form');
form.addEventListener('submit', generateLoremIpsum);
const generatedText = document.getElementById('generated-text');

function generateLoremIpsum(e) {
    e.preventDefault();

    const paragraphsInput = document.getElementById('paragraphs');
    const numParagraphs = paragraphsInput.value;

    fetch(`http://127.0.0.1:8787/lyrics?numberOfParagraphs=${numParagraphs}`)
        .then(response => response.json())
        .then(data => {
            const concatenatedText = data.lyrics.join('\n\n');
            generatedText.value = concatenatedText;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}