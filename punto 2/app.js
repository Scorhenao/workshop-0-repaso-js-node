class Notes {
    constructor(id, description, important = false) {
        this.id = id;
        this.description = description;
        this.important = important;
    }

    toggleImportant() {
        this.important = !this.important;   
    }
}

class NotesManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.loadNotes();
    }

    addNote(description) {
        const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
        const note = new Notes(id, description);
        this.notes.push(note);
        this.saveNotes();
        this.renderNotes();
    }

    editNote(id) {
        const note = this.notes.find(note => note.id === id);
        const description = prompt('Ingresa una nueva nota', note.description);
        try {
            if (description) {
                note.description = description;
                this.saveNotes();
                this.renderNotes();
            }
        } catch (error) {
            console.error('Se produjo un error', error);
        }
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    toggleNoteImportant(id) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            note.toggleImportant();
            this.saveNotes();
            this.renderNotes();
        }
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        this.renderNotes();
    }
    
    renderNotes() {
        const noteList = document.getElementById('note-list');
        noteList.innerHTML = '';
        this.notes.forEach(note => {
            const item = document.createElement('li');
            item.textContent = note.description;
            item.className = note.important ? 'important' : '';

            const importantButton = document.createElement('button');
            importantButton.textContent = 'Importante';
            importantButton.classList.add('btn', 'btn-success');
            importantButton.addEventListener('click', (e) =>{
                e.stopPropagation();
                this.toggleNoteImportant(note.id);
                item.className = note.important ? 'important' : '';
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('btn', 'btn-primary');
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editNote(note.id);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteNote(note.id);
            });

            item.appendChild(importantButton);
            item.appendChild(editButton);
            item.appendChild(deleteButton);
            noteList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const noteManager = new NotesManager();

    document.getElementById('add-note').addEventListener('click', () =>{
        const newNote = document.getElementById('new-note').value;
        if (newNote) {
            noteManager.addNote(newNote);
            document.getElementById('new-note').value = '';
        }
    });
});
