let hideyButton = document.getElementById('hideyButton');
let snippetsField = document.getElementById('snippetsField');

hideyButton.addEventListener("click",function(){
  console.log("hideyButton clicked");
    if (snippetsField.style.display === 'none') {
        snippetsField.style.display = 'block';
    } else {
        snippetsField.style.display = 'none';
    }
});
