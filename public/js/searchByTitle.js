const searchForm = document.querySelector('#search-form');
const searchTitle = document.querySelector('#search-title');

const searchByTitle = async(e) => {
    e.preventDefault();
    const searchTitleValue = searchTitle.value;
    const endpoint = `http://localhost:3000/stories/search/${searchTitleValue}`;
    try {
        const res = await fetch(endpoint);
        if (res.ok) {
            window.location.href = endpoint;
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.error(error);
    }
}

if (searchForm) {
    searchForm.addEventListener('submit', searchByTitle);
}
