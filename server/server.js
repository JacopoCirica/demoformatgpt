import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from 'openai'

dotenv.config()

//const configuration = new Configuration({
//  apiKey: process.env.OPENAI_API_KEY,
//});

//const openai = new OpenAIApi(configuration);

const openai= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from FormatGPT!'
  })
})

app.post('/', async (req, res) => {
  try {
    let previous_message='{"role": "system","content": "You are a helpful assistant who translates my instructions into code. You always provide me the code of an index.html file (with the css code in the style tag). Never write the javascript component. "}'
    const prompt = req.body.prompt;
    let previous_messages = req.body.previous
    let previous_messages1=previous_messages.slice(-2)
    //previous_messages1.unshift(previous_message)
  
    //previous_message.push(previous_messages1)
    
      //previous_messages.splice(1, previous_messages - 2);  // Remove elements starting from the second and leaving the last
      let risultato = [previous_messages[0], previous_messages.slice(-4)];
      let flatArray = [risultato[0], ...risultato[1]];
      console.log('PROVA:')
      console.log(flatArray)
      let obj = Object.fromEntries(risultato)
  
    
    const chatmodel= req.body.chatmodel
    console.log(prompt)
    console.log(previous_messages)
    console.log('Provolone:')
    console.log(previous_messages1)
    console.log('Prova: ')
    console.log(previous_message)


    const response = await openai.chat.completions.create({
        model: chatmodel,
        messages: flatArray,
        temperature: 1,
        max_tokens: 5000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    console.log(prompt)
    console.log(chatmodel)
    //console.log(response.choices[0].message.content)
    let inputText=response.choices[0].message.content

    //let htmlContent = text.match(/```html([\s\S]*?)```/)[1];

    //console.log(htmlContent.trim());   // This will print the HTML content

    let match = inputText.match(/```html([\s\S]*?)```/); // Use regex to find html content
    let htmlContent;

    if (match) {  // If there's a match
        htmlContent = match[1] + "</html>";  // Add </html> to the extracted text because it was part of the delimiter
        console.log(htmlContent.trim()); // Print out the HTML content
    } else {
    console.log("No HTML content found");
    }

    res.status(200).send({
      bot: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5500, () => console.log('AI server started on http://localhost5500'))
