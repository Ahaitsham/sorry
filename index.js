import express from "express"
import nodemailer from "nodemailer"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT= 3000;
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/message",async(req,res)=>{
    const message = await req.body.message;
    const name = req.body.name

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ahtshamsaifi345@gmail.com",
        pass: "spwg bqus ytjj fdza",

       
      },
    });

    await transporter.sendMail({
      from: "demo@gmail.com",
      to: "ahtshamsaifi345@gmail.com",
      subject: `Form submitted by user ${name}`,
      text: `Name: ${name}\n Message: ${message}`,
    });
    res.render("success.ejs", {
    });
    console.log(`Name- ${name}\n message-${message}`)
})

app.listen(PORT,()=>{
    console.log(`Your server is running on port ${PORT}`)

})

