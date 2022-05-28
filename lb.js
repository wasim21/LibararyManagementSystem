let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");
let headingEl = document.getElementById("heading");
let searchInputVal = searchInputEl.innerHTML;

function createAndAppendSearchResult(result) {
    let {
        author,
        imageLink
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item", "col-6");

    let resultTitleEl = document.createElement("img");
    resultTitleEl.src = imageLink;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);



    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = author;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);


}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");


    for (let result of searchResults) {
        let name = result.title;
        if (name.includes(searchInputVal)) {
            headingEl.innerHTML = "Popular Search";
            createAndAppendSearchResult(result);
        } else {
            headingEl.textContent = "No Result Found";
        }

    }

}

function onClickShowResult(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.add("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                console.log(jsonData);
                displayResults(search_results);
            });
    }
}


searchInputEl.addEventListener("keydown", onClickShowResult);