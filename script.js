document.addEventListener("DOMContentLoaded", () => {

  const keyword = document.getElementById("keyword");
  const searchBtn = document.getElementById("btn");
  const allImgContainer = document.getElementById("allImg");
  
  const ACCESS_TOKEN = ""; 
  
  searchBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      
      let val = keyword.value.trim();
      if (!val) {
          alert("Please enter a keyword to search.");
          return;
      }
  
      console.log("Searching for:", val);
      
     
      allImgContainer.innerHTML = "<p style='color:white; text-align:center;'>Loading...</p>";
  
      await fetchImg(val);
  });
  
  async function fetchImg(query) {
      try {
          let response = await fetch(
              `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_TOKEN}`
          );
          let data = await response.json();
  
          if (data.results.length === 0) {
              allImgContainer.innerHTML = "<p style='color:red; text-align:center;'>No images found.</p>";
              return;
          }
  
          displayImg(data.results);
      } catch (error) {
          console.error("Error fetching images:", error);
          allImgContainer.innerHTML = "<p style='color:red; text-align:center;'>Failed to load images. Try again later.</p>";
      }
  }
  
  function displayImg(images) {
      allImgContainer.innerHTML = ""; 
  
      images.forEach((imgData) => {
          let div = document.createElement("div");
          div.classList.add("singleImg");
  
          div.innerHTML = `
              <div class="firstDiv">
                  <img src="${imgData.user.profile_image.large}" alt="User" class="userImg">
                  <p class="userName">${imgData.user.name}</p>
              </div>
              <div class="secondDiv">
                  <img class="mainImg" src="${imgData.urls.regular}" alt="Image">
                  <p class="imgDes">${imgData.alt_description || "No description available"}</p>
              </div>
          `;
  
          allImgContainer.appendChild(div);
      });
  }
  
});
