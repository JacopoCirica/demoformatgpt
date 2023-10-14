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
    apiKey: "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",
});


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const previous_message = req.body.previous
    const chatmodel= req.body.chatmodel
    console.log(prompt)
    console.log(previous_message)


    const response = await openai.chat.completions.create({
        model: chatmodel,
        messages: previous_message,
        temperature: 1,
        max_tokens: 3000,
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

app.listen(5500, () => console.log('AI server started on http://localhost:5500'))
