
var random_margin = ["-5px", "1px", "5px", "10px", "7px"];
var random_colors = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328"];
var random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
var index = 0;

window.onload = document.querySelector("#user_input").select();

document.querySelector("#sticky_add_note").addEventListener("click", () => {
  document.querySelector("#sticky_modal").style.display = "block";
});

document.querySelector("#hide_sticky").addEventListener("click", () => {
  document.getElementById("user_input").value = "";
  document.querySelector("#sticky_modal").style.display = "none";
});

document.querySelector("#user_input").addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    var text = document.querySelector("#user_input");
    createStickyNote(text.value);
    setTimeout(()=>{
      document.getElementById("user_input").value = "";
      document.querySelector("#sticky_modal").style.display = "none";
    },250);
    
  }
});

createStickyNote = (text) => {
  let mainNote = document.createElement("div");
  let note = document.createElement("div");
  let details = document.createElement("div");
  let noteText = document.createElement("span");
  let closeButton = document.createElement("i");
  
  closeButton.className = "closeButton far fa-times-circle";
 
  note.className = "draggable";
  details.className = "details";
  noteText.textContent = text;
  closeButton.setAttribute("style", 'font-size: 1.4rem;color: gray;cursor: pointer;  transition: 1s ease-in-out; position:absolute; top: 10px; right: 10px');
  details.appendChild(noteText);
  note.appendChild(details);
  note.appendChild(closeButton);
  if(index > random_colors.length - 1)
    index = 0;
  
  note.setAttribute("style", `margin: 5px; background-color:${random_colors[index++]}; position: relative;`);
  
  document.querySelector("#sticky_all_notes").appendChild(note);
  let buttons = document.getElementsByClassName("closeButton");
  setTimeout(()=>{

  },100);
  for (element of buttons){

      element.addEventListener("click", update);
  }
  
}






function update(){

      let confirmation = confirm("Are you sure you want to remove this note. No content will be saved")
      if(confirmation){
        this.parentNode.remove();
      }
   
  }
