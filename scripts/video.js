// 1- Fetch, Load and show categories on html
// create loadCatagories
const loadCatagories = () =>{
    // fetch the data
    fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
// create displayCategories
const displayCategories = (categories) =>{
   const categoryContainer = document.getElementById("categories");
   categories.forEach((item) => {
    console.log(item);
    // create a button
    const button = document.createElement("button");
    button.classList ="btn";
    button.innerText = item.category;
    // add button to category container
    categoryContainer.append(button);
  }) 
}

// video section
const loadVideo = () =>{
  fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
  .then((res) => res.json())
  .then((data) => displayVideo(data.videos))
  .catch((error) => console.log(error))
}
const displayVideo = (videos) =>{
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) =>{
    console.log(video);
    
    const card = document.createElement("div");
    card.classList = "card card-compact"
    card.innerHTML =`
     <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="" />
  </figure>
  <div class="">
     <div class="px-0 py-2 flex gap-2">
     <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}
       </div>
       <div>
     <h2 class="fond-bold">${video.title}</h2>
     <div class="flex items-center gap-2">
     <p class="text-gray-400">${video.authors[0].profile_name}</p>
     ${
      video.authors[0].verified == true?`<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />`:""      
     }
     ${
      video.others.posted_date?.length == 0 ? "":`<span class="absolute right-3 bottom-20 bg-black rounded p-1 text-white text-xs">${video.others.posted_date}</span>`
     }

     
       </div>
    
    </div>
  </div>
    `;
    videoContainer.append(card);
  })
}



loadCatagories()
loadVideo()