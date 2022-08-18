//const express = require("express") commonJS
import express from "express"
import path from "path"
import sgMail from "@sendgrid/mail" 
import dotenv from "dotenv"

dotenv.config() //Automaticamente agrega a las variables de entorno lo que tenemos en el archivo .env
const app = express()
sgMail.setApiKey(process.env.SEGKEY) //se enlaza las variables de entorno

app.use(express.json()) //meddleware para interpretar los json que llegan
app.use(express.static("app")) //Para servir todo lo que se encuentre en una carpeta app

app.get("/", (req, res) => {
    res.sendFile(`${path.resolve()}/index.html`)
    
    /*const msg = {
        to: 'josafat@mailinator.com', // Change to your recipient
        from: process.env.FROM, // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })*/
})

app.post("/send", async (req, res) => {
    const {to, subject, html} = req.body
    const msg = {
        to,
        from: process.env.FROM,
        subject,
        html
    }
    try {
       await sgMail.send(msg)
       res.sendStatus(204)
    } catch (e) {
        const mensaje = e.response.body.errors.map(e => e.message).join(" ")
        //console.log(e.response.body.errors)
        res.status(400).send(mensaje)
        
    }
})
app.listen(3000, () => {
    console.log("iniciando el servicio")
})