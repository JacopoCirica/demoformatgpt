import bot from './assets/bot.svg'
import user from './assets/user.svg'

const textarea = document.getElementById('textarea');
const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')
// Ottenere l'elemento modal e gli altri elementi necessari
let modal = document.getElementById("finestraModale");
let btn = document.getElementById("shadow_prompt");
let span = document.getElementsByClassName("chiudi")[0];
var coll = document.getElementsByClassName("collapsible");
var counter= document.getElementsByClassName("counter")[0];
var counter_html=0;

var i;

// Quando l'utente clicca sul bottone, apre la modal
btn.onclick = function() {
    modal.style.display = "block";
}

// Quando l'utente clicca sul simbolo (x), chiude la modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando l'utente clicca fuori dalla modal, chiude la modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Recupera l'input e l'elemento dove mostrare il testo
let input = document.getElementById("inputTesto");
//let testoSalvatoEl = document.getElementById("testoSalvato");
let inputText=""


// Quando l'utente preme un tasto nell'input
input.addEventListener('keyup', function(event) {
    if(event.keyCode === 13) {  // Se il tasto è "Enter"
        // Salva il testo in localStorage
        //localStorage.setItem('testo', input.value);

        // Mostra il testo nella pagina
        //testoSalvatoEl.innerText = input.value;
        inputText=input.value

        // Chiudi la modal
        modal.style.display = "none";
    }
});

let previous_message=[{
  "role": "system",
  "content": "You are a helpful assistant who translates my instructions into code. You always provide me the code of an index.html file (with the css code in the style tag). Never write the javascript component."
}]


let htmlContent;
let precedente;
let model='gpt-3.5-turbo-16k'
let position=0


document.addEventListener("DOMContentLoaded", function() {
    const button1 = document.querySelector('.button1');
    const button2 = document.querySelector('.button2');
    const rightarrow = document.querySelector('.rightarrow');
    const leftarrow = document.querySelector('.leftarrow');

    function toggleButtons() {
        // Toggle 'clicked' class for both buttons
        button1.classList.toggle('clicked');
        button2.classList.toggle('clicked');
    }

    // Add the toggle behavior to both button click events
    button1.addEventListener('click', function() {
        console.log("GPT-3.5");
        model='gpt-3.5-turbo-16k'
        toggleButtons();
    });
    button2.addEventListener('click', function() {
        console.log("GPT-4");
        model='gpt-4'
        
        toggleButtons();
    });
    rightarrow.addEventListener('click', function(){
        console.log("freccia destra")
        if (parseInt(counter.innerHTML) < counter_html){
            counter.innerHTML=parseInt(counter.innerHTML)+1
        }
        if (position + 2 > 3) {
            position=position + 2
            console.log('ciao')
            console.log(previous_message[position].content)
            precedente=previous_message[position].content
            let match5 = precedente.match(/```html([\s\S]*?)```/i); // Use regex to find html content
            let match6 = precedente.match(/```javascript([\s\S]*?)```/); // Use regex to find html content
        
        

            if (match5 && match6) {  // If there's a match and match2
          
            
                htmlContent = match5[1] + "</html>";  // Add </html> to the extracted text because it was part of the delimiter
                output.contentDocument.body.innerHTML = htmlContent.trim()
                console.log(match6[1])
                output.contentWindow.eval(match6[1])
                console.log(htmlContent.trim()); // Print out the HTML content
        
        
        }else if (match5){
            htmlContent = match5[1];  // Add </html> to the extracted text because it was part of the delimiter
            output.contentDocument.body.innerHTML = htmlContent.trim()
            console.log(htmlContent.trim()); // Print out the HTML content
        }
         else {
        console.log("No HTML content found");
        }
        }
        
    });
    leftarrow.addEventListener('click', function(){
        console.log("freccia sinistra")
        if (position > 3) {
            position=position - 2
            console.log(previous_message[position].content)
            precedente=previous_message[position].content
            let match3 = precedente.match(/```html([\s\S]*?)```/i); // Use regex to find html content
            let match4 = precedente.match(/```javascript([\s\S]*?)```/); // Use regex to find html content
        if (parseInt(counter.innerHTML)>0){
                counter.innerHTML=parseInt(counter.innerHTML)-1
            }
        

            if (match3 && match4) {  // If there's a match and match2
          
            
                htmlContent = match3[1] + "</html>";  // Add </html> to the extracted text because it was part of the delimiter
                output.contentDocument.body.innerHTML = htmlContent.trim()
                console.log(match4[1])
                output.contentWindow.eval(match4[1])
                console.log(htmlContent.trim()); // Print out the HTML content
        
        
        }else if (match3){
            htmlContent = match3[1];  // Add </html> to the extracted text because it was part of the delimiter
            output.contentDocument.body.innerHTML = htmlContent.trim()
            console.log(htmlContent.trim()); // Print out the HTML content
        }
         else {
        console.log("No HTML content found");
        }
        }
    })
});


let loadInterval

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    //let index = 0
    
    //let interval = setInterval(() => {
    //    if (index < text.length) {
    //        element.innerHTML += text.charAt(index)
    //        index++
    //    } else {
    //        clearInterval(interval)
    //    }
    //}, 20)
    element.innerHTML=text
}
function typeText1(element, text,prova,uniqueIdbot,codice) {
    var blabla = document.getElementById(uniqueIdbot);
    blabla.style.display='block'
    var commento=document.getElementById(codice)
    commento.innerText=prova
     element.innerText += text
         
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}
function chatStripeBot(value,uniqueId,uniqueIdbot,codice){
    return (
        `
        <div class="wrapper ai">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${bot} 
                      alt= 'bot'
                     />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
                
                </div>
                <button type="button" id=${uniqueIdbot} class="collapsible">Open Code</button>
                <div class="content">
                <p id=${codice} class="html">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    if (inputText.length > 0){
        previous_message=[{
            "role": "system",
            "content": "You are a helpful assistant who translates my instructions into code. You always provide me the code of an index.html file (with the css code in the style tag). Always write the Javascript component separately as if it were another file, by starting with ```javascript." + inputText
          }]
    }
    e.preventDefault()

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))
    let user=data.get('prompt').trim()
    previous_message.push({
      "role": "user",
      "content":user})
    

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    const uniqueIdbot=generateUniqueId()
    const codice=generateUniqueId()
    chatContainer.innerHTML += chatStripeBot(" ", uniqueId,uniqueIdbot,codice)
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
      }

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    const response = await fetch('https://formatgpt.onrender.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt'),
            previous: previous_message,
            chatmodel: model
            
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if (response.ok) {
        let output = document.getElementById("output");
        const data = await response.json();
        const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
        previous_message.push({
          "role": "assistant",
          "content":parsedData})
        console.log(previous_message)
        position=previous_message.length - 1
        let inputText=data.bot
        let match = inputText.match(/```html([\s\S]*?)```/i); // Use regex to find html content
        let match2 = inputText.match(/```javascript([\s\S]*?)```/); // Use regex to find html content
        
        

        if (match && match2) {  // If there's a match and match2
          
            
            htmlContent = match[1] + "</html>";  // Add </html> to the extracted text because it was part of the delimiter
            output.contentDocument.body.innerHTML = htmlContent.trim()
            console.log(match2[1])
            output.contentWindow.eval(match2[1])
            console.log(htmlContent.trim()); // Print out the HTML content
            typeText(messageDiv, parsedData)
        
        
        }else if (match){
          htmlContent = match[1];  // Add </html> to the extracted text because it was part of the delimiter
            output.contentDocument.body.innerHTML = htmlContent.trim()
            console.log(htmlContent.trim()); // Print out the HTML content
            let provolone=inputText.replace(htmlContent,"")
            
            provolone=provolone.replace("```html",'(Check out the code below)')
            provolone=provolone.replace("```","")
            
            counter_html=counter_html+1
            counter.innerHTML=parseInt(counter.innerHTML)+1
            typeText1(messageDiv, provolone,htmlContent,uniqueIdbot,codice)
        }
         else {
        console.log("No HTML content found");
        typeText(messageDiv, parsedData)
        }
        
        
        

        //typeText(messageDiv, parsedData)
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        var currentRows = textarea.rows;
        if (currentRows < 5) {
            var updatedRows = currentRows + 1;
            textarea.rows = updatedRows;
            console.log('Capitano')
        }
        
    }
    else if (e.keyCode === 13) {
        handleSubmit(e)
        textarea.rows=1
    }

})
