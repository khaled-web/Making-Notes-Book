const addBtn = document.getElementById('add');
//to set the shape of notes UI
const notes = JSON.parse(localStorage.getItem('notes'))
if (notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
<!-- tools-->
  <div class="tools">
   <!--button-edit-->
   <button class="edit"><i class="fas fa-edit"></i></button>
   <!--end of button-edit-->
   <!--button-delete-->
   <button class="delete"><i class="fas fa-trash-alt"></i></button>
   <!--end of button-delete-->
  </div>
  <!-- end of tools-->
  <!--hidden-->
  <div class="main ${text ? "" : "hidden"}"></div>
  <!--end of hidden-->
 <textarea class = "${text ? "hidden" : ""}"></textarea>
    `
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked(text)
    //deleteNoteBar
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS()
    })
    //editNoteBar
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden')
    })

    //prepare notes
    textArea.addEventListener('input', (e) => {
        const {
            value
        } = e.target;
        main.innerHTML = marked(value);
        updateLS()
    })


    document.body.appendChild(note)
}

//updateLocalStorage
function updateLS() {
    const notesText = document.querySelectorAll('textArea');

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}