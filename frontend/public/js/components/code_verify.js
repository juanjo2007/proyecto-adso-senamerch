document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".code-verify");

    if(form){
      fetch("/frontend/public/views/components/code_verify.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  