// Replace textarea with id='body' with ckeditor

const textArea = document.querySelector('#story-body-editor');

if (textArea) {
    CKEDITOR.replace(textArea, {
        plugins: 'wysiwygarea, toolbar, basicstyles, link'
    });
}