export default class Card {
    constructor(project, trigger) {
        this.project = project;
        this.trigger = trigger; // Fixed: using the correct name
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

    create() {
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

        // INSERT BEFORE the button so the button stays at the bottom
        this.pre.insertBefore(card, this.addBtn);
    }

    render() {
        // Clear the screen and pop the whole layout in
        this.content.appendChild(this.pre);
    }
}