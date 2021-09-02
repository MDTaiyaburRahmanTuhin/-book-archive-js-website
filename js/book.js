const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const bookDetails = document.getElementById('book-details');
const error = document.getElementById('error');


const toggleSpinner = displayStyle => {
    document.getElementById('displyStyle').style.display = displayStyle;
}
searchBtn.addEventListener('click', function () {
    toggleSpinner('block');
    const search = searchInput.value;

    searchInput.value = ''
    if (search === '') {
        error.innerText = 'Search field cannot be empty';
        return;
    }
    bookDetails.textContent = ""
    const url = `https://openlibrary.org/search.json?q=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data))


});

function showData(data) {
    if (data.status == 404) {
        error.innerText = 'NO Result Found'
    }


    else {
        error.innerText = '';
    }
    const totalBookLoad = document.getElementById('bookTotalLode');
    const p = document.createElement('p');
    p.innerText = `Total Book: ${data.numFound}`
    totalBookLoad.innerHTML = '';
    totalBookLoad.appendChild(p);
    const book10Show = data.docs.slice(0, 20);
    //console.log(book10Show);

    book10Show?.forEach(item => {
        console.log(item.title);
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        const imageUrl = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
        console.log(imageUrl);
        div.innerHTML = `
       <div class="rounded overflow-hidden border p-2">
            <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
                <img class="img-fluid" src=${imageUrl ? imageUrl : 'not found'}>
                <h1>${item.title}</h1>
                <h3>Publish Date: ${item.publish_date[0]}</h3>
                <h5>Uthor Name: ${item.uthor_name ? item.uthor_name : 'not found'}</h3>
                <button class="btn btn-dark">Learn More</button>
            </div>
        </div>`
        bookDetails.appendChild(div)
        toggleSpinner('none');
    })


}