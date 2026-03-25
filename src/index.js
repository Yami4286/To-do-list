import projects from "./project";
import cards from "./card";
import "./style.css";

const pro = document.querySelector(".Pro");
const content = document.querySelector("#content");
const home = document.querySelector(".home");

const projectList = [];
let myProject = new projects(); 
const form = myProject.formElement;
const rendering = ()=>{
    myProject.Render();
};


// delete project button function
const deleteProject = (index) => {
    projectList.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projectList));
    renderAll();      // 👈 rebuilds all cards with correct indices
    mycards.render();
};
//delte function pass into cards

// edit the form function pass in cards
const editProject = (index) => {
    myProject.formElement.dataset.editIndex = index; // 👈 store on the form
    Object.assign(myProject, projectList[index]);
    myProject.Render();
};
/// edit

const renderAll = () => {
    mycards.clear(); // 👈 clear old cards from this.pre first
    projectList.forEach((projectData, index) => {
        Object.assign(myProject, projectData);
        mycards.create(index);
    });
    mycards.render();
};

let mycards = new cards(myProject,rendering, deleteProject, editProject);

const saved = JSON.parse(localStorage.getItem("projects") || "[]");

if (saved.length > 0) {
    // push saved data back into your array
    projectList.push(...saved);

    // loop through and render each one
    projectList.forEach((projectData,index) => {
        Object.assign(myProject, projectData); // fill instance with saved data
        mycards.create(index); // 👈 builds the card on screen
    });
}

// 2. Define 'form' so the listener knows what you're talking about

myProject.formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    Object.assign(myProject, data);

    if (myProject.formElement.dataset.editIndex !== undefined && 
    myProject.formElement.dataset.editIndex !== "") {
        // 👈 editing
        const index = myProject.formElement.dataset.editIndex;
        projectList[index] = { ...data };
        delete myProject.formElement.dataset.editIndex; // reset
        renderAll();
        mycards.render(); 
    } else {
        // 👈 adding new
        projectList.push({ ...data });
        const index = projectList.length - 1;
        mycards.create(index);
    }

    localStorage.setItem("projects", JSON.stringify(projectList));
    form.remove();
});


// event listener for the projects button
pro.addEventListener("click", ()=> { 
    renderAll();
    mycards.render();
     mycards.addButton();
   
})

home.addEventListener("click", ()=>{ 
    content.innerHTML = "";
      mycards.clear();
    const highPriority = projectList.filter(project => project.priority === "High");

highPriority.forEach((projectData) => {
    Object.assign(myProject, projectData);
    mycards.create(); // no index needed - no delete or edit here
});
mycards.render();
})

const footer = document.createElement("footer");
footer.textContent="The Shadow Project";
document.body.appendChild(footer);