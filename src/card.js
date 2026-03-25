export default class Card {
    constructor(project, trigger, Delte, onEdit) {
        this.project = project;
        this.trigger = trigger; // trigger rendering
        this.Delte = Delte; // delte button
        this.onEdit = onEdit;
        this.pre = document.createElement("div");
        this.pre.id = "Pre-layout";
        this.content = document.querySelector("#content");

        // Create the Add Button once
        this.addBtn = document.createElement("button");
        this.addBtn.innerText = "+ Add New Project";
        this.addBtn.className = "main-add-btn";
        
        // Fixed: Use this.trigger here
        this.addBtn.onclick = () => this.trigger();
        
        this.pre.appendChild(this.addBtn);
    }

    create(index) {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <div class="card-header">
                <h3>${this.project.title || "Untitled"}</h3>
                <span class="priority-tag">${this.project.priority}</span>
            </div>
            <div class="card-body">
                <p><strong>Start:</strong> ${this.project.StartDate}</p>
                <p><strong>End:</strong> ${this.project.dueDate}</p>
                <p class="desc">${this.project.description}</p>
            </div>
            <div class="card-footer">
                <small>Notes: ${this.project.notes}</small>
            </div>
        `;
         const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        this.Delte(index); // 👈 tells main.js to remove from array and localStorage
    });

    const editbtn = document.createElement("button");
    editbtn.textContent= "Edit";
    editbtn.addEventListener("click", () => {
        this.onEdit(index);
    } );

        // INSERT BEFORE the button so the button stays at the bottom
        card.appendChild(editbtn);
         card.appendChild(deleteBtn);
        this.pre.insertBefore(card, this.addBtn);
    }

    render() {
        // Clear the screen and pop the whole layout in
        this.content.appendChild(this.pre);
    }

    clear() {
    const oldCards = this.pre.querySelectorAll(".project-card");
    oldCards.forEach(card => card.remove());
}
}