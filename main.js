// Cattura del wrapper
let contacts_wrapper = document.querySelector("#contacts_wrapper");

// Cattura dei bottoni
let showContactsBtn = document.querySelector('#showContactsBtn');
let addContactBtn = document.querySelector('#addContactBtn');
let removeContactBtn = document.querySelector('#removeContactBtn');

// Cattura delle input
let inputName = document.querySelector('#inputName');
let inputPhone = document.querySelector('#inputPhone');

// Variabile d'appoggio
let check = false;


// Creazione oggetto rubrica

const rubrica = {
    contact_list: [
        { contact_name: 'Tanjiro', contact_phone: 123456789 },
        { contact_name: 'Inosuke', contact_phone: 987654321 },
        { contact_name: 'Zenitsu', contact_phone: 321654987 },
    ],

    // Funziona mostra contatto
    showContacts : function(){
        contacts_wrapper.innerHTML = '';
        this.contact_list.forEach( (contatto)=>{
            let div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <p class="lead">${contatto.contact_name}</p>
                <p>${contatto.contact_phone}</p>
                <i class="fa-solid fa-pen-to-square iconPencil" style="color: #000000;"></i>
                <i class="fa-solid fa-trash-can iconTrash" style="color: #000000;"></i>
            `;
            contacts_wrapper.appendChild(div);
        });

        // Cattura delle icone
        // Icona cestino che elimina il contatto
        let iconsTrash = document.querySelectorAll('.iconTrash');
        iconsTrash.forEach((icon, i) => {
            icon.addEventListener('click', () => {
                this.contact_list.splice(i, 1);
                this.showContacts();
            });
        });

        // Icona matita che permette di modificare il contatto
        let iconsPencil = document.querySelectorAll(`.iconPencil`);
        iconsPencil.forEach((icon, i)=>{
            icon.addEventListener('click', ()=>{
                let editedname = prompt(`Inserisci il nuovo nome`);
                let editednumber = Number(prompt(`Inserisci il numero`));
                    if (editedname && editednumber) {
                        this.contact_list[i].contact_name = editedname;
                        this.contact_list[i].contact_phone = editednumber;
                        this.showContacts();
                }else if(editedname != String){
                    alert(`Devi inserire un nome valido`);
                }else if(editednumber != Number){
                    alert(`Devi inserire un numero valido`);

                }
            })
        })
    },

    // Funzione aggiungi contatto
    addContact : function(newName, newPhone){
        if(newName && newPhone){
            this.contact_list.push({ contact_name: newName, contact_phone: newPhone });
            this.showContacts();
            if (check == false) {
                showContactsBtn.innerHTML = 'Nascondi contatti'
                check = true;
            }
        }else{
            alert(` Devi inserire il nome e il numero di telefono`);
        }
    },

    // Funzione che rimuove il contatto dal button
    removeContact : function(removedName){
        let names = this.contact_list.map((contatto)=> contatto.contact_name);
        let index = names.indexOf(removedName);
        if(index >= 0){
            this.contact_list.splice(index, 1);
            this.showContacts();
            inputName.value = '';
            inputPhone.value = '';
            if (check == false) {
                showContactsBtn.innerHTML = 'Nascondi contatti';
                check = true;
            }
        }else{
            alert(`Non puoi rimuovere un contatto non presente in rubrica`);
        }
    }

}

// Evento al click showcontacts
showContactsBtn.addEventListener('click', ()=>{
    if(check == false){
        rubrica.showContacts();
        showContactsBtn.innerHTML = 'Nascondi contatti'
        check = true;
    }else{
        contacts_wrapper.innerHTML = '';
        showContactsBtn.innerHTML = 'Mostra contatti'
        check = false;
    }
})

// Evento al click bottone aggiungi contatto
addContactBtn.addEventListener('click', () => {
    rubrica.addContact(inputName.value, inputPhone.value);
    inputName.value = '';
    inputPhone.value = '';
})

// Evento al click bottone rimuovi contatto
removeContactBtn.addEventListener('click', ()=>{
    rubrica.removeContact(inputName.value);
})
