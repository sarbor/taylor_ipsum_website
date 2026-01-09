# Taylor Ipsum Generator

The Taylor Ipsum Generator is a Lorem Ipsum generator that uses Taylor Swift lyrics to create placeholder text for your projects. This project is built using React and Vite.

The project gets the Taylor Swift lyrics using the [Taylor Swift API](https://github.com/sarbor/taylor_swift_api).

Fun Fact: Almost all of this code (including this README file) was generated with ChatGPT.

Every time you open the website you are greeted with a random Taylor album cover and corresponding lyrics from that album.

## View Live
This website is currently hosted using Cloudflare Pages here: https://taylor-ipsum-website.pages.dev

## Screenshots

![Screenshot 1](https://raw.githubusercontent.com/sarbor/taylor_ipsum_website/main/website_screenshots/1989-website.png)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open `http://localhost:5173` in your browser.

## Project Structure

The project consists of the following files:

- `index.html`: The Vite HTML entry point.
- `src/App.jsx`: The main React component for the generator UI.
- `src/main.jsx`: The React entry point.
- `src/style.css`: The styling for the web page.
- `src/constants.js`: Album-to-lyrics mapping and the API endpoint URL.
- `public/images`: Taylor album cover images.
- `public/fonts`: Aileron font files.

## Environment Variables

- `VITE_API_URL`: Optional override for the lyrics API. Defaults to the production API URL.

## Cloudflare Pages

Build settings for Cloudflare Pages:

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`

## How to Use

To generate Taylor Swift lorem ipsum text, follow these steps:

1. Enter the number of paragraphs you want to generate in the "Number of Paragraphs" input field.
2. Click the "Generate" button to generate the lorem ipsum text.
3. The generated text will appear in the textarea below the form.

