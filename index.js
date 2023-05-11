const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()


app.use(cors({origin: '*'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const port = process.env.PORT || 3010
const smtp_login = process.env.SMTP_LOGIN
const smtp_password = process.env.SMTP_PASSWORD


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password,
    }
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/sendMessage', async (req, res) => {

    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: 'Portfolio',
        to: 'brelanton@gmail.com',
        subject: 'Message from portfolio',
        html: `<b>Сообщение от Portfolio</b>
               <div>Name: ${name}</div>
               <div>Email: ${email}</div>
               <div>Message: ${message}</div>`
    })
    res.send(res.body)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})