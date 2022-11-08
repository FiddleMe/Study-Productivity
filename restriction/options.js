// function remove(i)
// {
//   document.getElementById(i).style.display= 'none'
// }


// const textarea = document.getElementById("textarea");

// const save = document.getElementById("save");
// const checkbox = document.getElementById("checkbox");
// const closeoption = document.getElementById("closeoption")
// // const enable = document.getElementById("enable")
// // const disable = document.getElementById("disable")
// //added conditions for form validation: 1. empty inputs
// // enable.addEventListener("click", ()=>{
// //   checkbox.checked= true
// //   enable.style.display = "none"
// //   disable.style.display = "block"
  
// // })
// // disable.addEventListener("click", ()=>{
// //   checkbox.checked=false;
// //   disable.style.display = "none"
// //   enable.style.display ="block"
  
// // })
// closeoption.addEventListener("click", () => {
//   window.close()
// })
// save.addEventListener("click", () => {
      
//       const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
//       console.log(blocked)
//       chrome.storage.local.set({ blocked });
  
// })
// //     document.getElementById('warn').style.display = 'none'
// //     document.getElementById('mySites').innerHTML = 'List of sites to block'
// //     var blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
// //     console.log(blocked)

// //     for (i in blocked){

  

    
// //         let tr = document.createElement("tr")
// //         let td1 = document.createElement("td")
// //         let p = document.createElement("p")
// //         p.setAttribute("class", "text-white p-1 mr-3")

// //         console.log(blocked[i])
// //         text = [blocked[i]]
// //         textNode = document.createTextNode(text);
// //         p.appendChild(textNode)
// //         td1.appendChild(p)
     
// //         // td1.innerHTML = `<p class="text-white p-1 mr-3">${blocked[i]}</p>`

      
// //         // console.log(tr.id)
// //         // td.className="text-white py-3"
// //         tr.appendChild(td1)
        
// //         document.getElementById('tables').appendChild(tr)
// //       }
    
// //     console.log(blocked)
// //     chrome.storage.local.set({ blocked });
// //   }
  
// // });

// // checkbox.addEventListener("change", (event) => {
// //   const enabled = event.target.checked;
// //   chrome.storage.local.set({ enabled });
// // });

// window.addEventListener("DOMContentLoaded", () => {
//   chrome.storage.local.get(["blocked", "enabled"], function (local) {
//     const { blocked, enabled } = local;
//     if (Array.isArray(blocked)) {
//       textarea.value = blocked.join("\n");
//       checkbox.checked = enabled;
      
//     }
//   });
// });
const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

save.addEventListener("click", () => {
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blocked });
});

checkbox.addEventListener("change", (event) => {
  if(checkbox.checked != true){
    is_executed = confirm("Are you sure you want to enable? Do click save after enabling!")
    if(is_executed){
      const enabled = event.target.checked;
      chrome.storage.local.set({ enabled });
    }
    else{
      checkbox.checked= false;
    }
  }
  else{
    disable = confirm("Are you sure you want to disable? Do click save after disabling!")
    if(disable){
      const enabled = event.target.checked;
      chrome.storage.local.set({ enabled });
    }
    else{
      checkbox.checked = true;
    }
  }
  
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