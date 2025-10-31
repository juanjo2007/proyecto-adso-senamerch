document.addEventListener("DOMContentLoaded", function (){
  const form = document.querySelector(".edit-post-two");

  if(form){
    fetch("/frontend/public/views/components/edit_post2.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;
      })
      .catch(error => console.log("Error", error));
  } 
});
