export default class projects {
    constructor(title = '',dueDate = '',StartDate = '',description = '',priority = '', notes = '', checkList = ''){
        this.title = title;
        this.dueDate = dueDate;
        this.StartDate = StartDate;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
        this.content = document.querySelector("#content");
        this.formElement = this.formconstruct();
    }

    formconstruct() {
        const form = document.createElement("form");
        form.className = "project-form-container";

        // Create all 7 inputs with their names and classes
        const titleInput = document.createElement("input");
        titleInput.name = "title";
        titleInput.className = "input-title";

        const dueInput = document.createElement("input");
        dueInput.type = "date";
        dueInput.name = "dueDate";
        dueInput.className = "input-date-field";

        const startInput = document.createElement("input");
        startInput.type = "date";
        startInput.name = "StartDate";
        startInput.className = "input-date-field";

        const descInput = document.createElement("textarea");
        descInput.name = "description";
        descInput.className = "input-desc";

      const prioritySelect = document.createElement("select");
    prioritySelect.name = "priority";
    // Adding actual options so the user can choose
    ["Low", "Medium", "High"].forEach(p => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        prioritySelect.appendChild(opt);
    });

        const notesArea = document.createElement("textarea");
        notesArea.name = "notes";
        notesArea.className = "input-notes-area";

        const checkInput = document.createElement("input");
        checkInput.name = "checkList";
        checkInput.className = "input-checklist";

        const submitBtn = document.createElement("button");
    submitBtn.type = "submit"; // Crucial: triggers the "submit" event
    submitBtn.className = "form-submit-btn";
    submitBtn.innerText = "Save Project";

        // Append all 7 to the form
        form.append(titleInput, dueInput, startInput, descInput, prioritySelect, notesArea, checkInput, submitBtn);
        
        return form;
    }

    Render(){
     
        // 1. Reset the data so old values don't "ghost"
    this.formElement.reset();

    // 2. Sync with this project's constructor data

    // 3. ONLY append if it's not already there
    // This prevents the form from "stacking" multiple times
        this.content.appendChild(this.formElement);
    
        
    }

}