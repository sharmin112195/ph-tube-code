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
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick ="lodeCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
    `
    // add button to category container
    categoryContainer.append(buttonContainer);
  }) 
}


// click button function
const lodeCategoryVideos = (id) =>{
fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
.then((res) => res.json())
.then((data) => {
  // every active class remove
  removeActiveClass();
  // id er class active
  const activeBtn = document.getElementById(`btn-${id}`);
  activeBtn.classList.add("active");
  displayVideo(data.category);
  
})
.catch((error) => console.log(error))
}

// add remove button color function
const removeActiveClass = () =>{
const buttons = document.getElementsByClassName("category-btn");
console.log(buttons);
for(let btn of buttons){
  btn.classList.remove("active");
}
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
  videoContainer.innerHTML = "" ;
   if(videos.length == 0){
      videoContainer.classList.remove("grid");
      videoContainer.innerHTML =`
     <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
       <img src="assets/Icon.png"/>
       <h2>Oops!! Sorry, There is no content here</h2>
     </div>
    `;
    return
   }
   else{
    videoContainer.classList.add("grid");
   }
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
      video.others.posted_date?.length == 0 ? "":`<span class="absolute right-3 bottom-20 bg-black rounded p-1 text-white text-xs">${getTimeString(video.others.posted_date)}</span>`
     }

     
       </div>
    
    </div>
  </div>
    `;
    videoContainer.append(card);
  })
}

// time function

function getTimeString(time){
  // get hour and rest section
  const hour = parseInt(time/3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return`${hour} hour ${minute} minute ${remainingSecond} second ago`;
}



loadCatagories()
loadVideo()