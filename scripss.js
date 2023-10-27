const accesskey="CMSY3Aq_30cByfx4FuROl0kW-19qp3-f9pSoBTztb6A";

const formEle=document.querySelector("form");
const InputEle=document.getElementById("Search-input");
const searchResults=document.querySelector(".search-results");
const ShowMore=document.getElementById("Show-more-button");
let inputData="";
let page= 1;

async function searchImages()
{
    inputData=InputEle.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response= await fetch(url);
    const data = await response.json();

    const  results = data.results;

    if(page===1){
        searchResults.innerHTML="";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result1");
        const image = document.createElement('img');
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if(page>1){
        ShowMore.style.display="block";
    }

}
formEle.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();
});
ShowMore.addEventListener("click",()=>{
    searchImages();
});