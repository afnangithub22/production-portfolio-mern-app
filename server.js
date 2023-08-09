const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const EmailSender = require('./sendEmail.js')
const path = require('path');

//dotenv configuartion
dotenv.config();

//rest object
const app = express();

//midlewares

app.use(express.json());
app.use(cors({origin: `${process.env.CLIENT_URL}`}));


// static file access
app.use(express.static(path.join(__dirname, './client/build')))
// ****** SEND API
app.post("/send", async (req, res) => {
  try {
    const { fullName,email,message} = req.body
    EmailSender({fullName,email,message})
    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
});

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})
//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server Runnning On PORT ${PORT} `);
});
