import projects from "./project";
import cards from "./card";

const pro = document.querySelector(".Pro");
const content = document.querySelector("#content");

const projectList = [];
let myProject = new projects(); 
// 2. Define 'form' so the listener knows what you're talking about
const form = myProject.formElement;
const rendering = ()=>{
    myProject.Render();
};
let mycards = new cards(myProject,rendering);
myProject.formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Now 'form' works because you defined it above!
    const data = Object.fromEntries(new FormData(form));

    // Update the instance
    Object.assign(myProject, data);
    projectList.push({ ...data })
    form.remove(); 
    mycards.create();
    console.log("Updated Instance:", myProject);
});

pro.addEventListener("click", ()=> { 
    mycards.render();
})


const footer = document.createElement("footer");
footer.textContent="The Shadow Project";
document.body.appendChild(footer);