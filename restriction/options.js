const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

//added conditions for form validation: 1. empty inputs
save.addEventListener("click", () => {
  
  if (textarea.value == ''){
    document.getElementById('msg').innerHTML = 'List of sites cannot be empty to continue'
  }


  //added conditions for form validation: 2. if a non-website is entered
  else{
    var blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
    console.log(blocked)

    for (i in blocked){

      if (blocked[i].substring(0, 4) != 'www.'){
        console.log(blocked[i])
        blocked.splice(i, 1);
      }

      else{
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        console.log(blocked[i])
        td.innerHTML = blocked[i]
        // td.className="text-white py-3"
        tr.appendChild(td)
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