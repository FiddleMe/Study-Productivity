function remove(i)
{
  document.getElementById(i).style.display= 'none'
}


const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

//added conditions for form validation: 1. empty inputs
save.addEventListener("click", () => {
  
  if (textarea.value == ''){
    document.getElementById('mySites').innerHTML = 'No sites were added as input was empty'
  }


  //added conditions for form validation: 2. if a non-website is entered
  else{
    
    document.getElementById('warn').style.display = 'none'
    document.getElementById('mySites').innerHTML = 'List of sites to block'
    var blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
    console.log(blocked)

    for (i in blocked){

      if (blocked[i].substring(0, 4) != 'www.'){
        console.log(blocked[i])
        blocked.splice(i, 1);
      }

      else{
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        console.log(blocked[i])
        
        td3.innerHTML = ` `
        td1.innerHTML = `<p class="text-white p-1 mr-3">${blocked[i]}</p>`
        td2.innerHTML = `<button class="btn btn-light" onclick="remove(${blocked[i]})"> Delete Site </button>`
      
        console.log(tr.id)
        // td.className="text-white py-3"
        tr.appendChild(td1)
        tr.appendChild(td3)
        tr.appendChild(td2)
        document.getElementById('blocked').appendChild(tr)
      }
    }
    console.log(blocked)
    textarea.value = ''
    chrome.storage.local.set({ blocked });
  }
  
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
      checkbox.checked = enabled;
    }
  });
});