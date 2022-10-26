const { default: ListBody } = require("antd/lib/transfer/ListBody");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/',(req,res)=>{
//     console.log(req.query.name)
//     res.send('Hola Alumnos ánimo con express')
// })
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })
// app.get('/about',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','about.html'))
// })

// app.get("/myName/:name", (req, res) => {
//     res.send("My name is " + req.params.name);
//   });

//   app.get("/myName", (req, res) => {
//     res.send("My name is " + req.query.name);
//   });

// app.post("/",(req,res)=>{
//     console.log(req.body)
//     res.send("Mi nombre es "+ req.body.name)
// })

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@gmail.com",
    status: "inactive",
  },
  {
    id: 3,
    name: "Shannon Jackson",
    email: "shannon@gmail.com",
    status: "active",
  },
];

app.get("/", (req, res) => {
  res.send({msg:"Aqui tienes los personajes",results:members});
});

app.get("/id/:id", (req, res) => {
    const found = members.some(member => member.id == req.params.id)//para saber si existe lo que busco
    if(found){
        res.send(members.filter(member => member.id == req.params.id))
        //filtramos y devolvemos el miembro que buscamos
    }else{
        //si el miembro que buscamos no existe devovlemos un notfound
        res.status(404).send({msg:`Member with id ${req.params.id} not found`})
    }
});

app.post("/",(req,res)=>{
    const newMember ={
        id: members.length + 1,
        name: req.body.name,
        email: req.body.email,
        status: "active",
    }
    if(!req.body.name || !req.body.email){
        res.status(400).send({msg:"Please fill all inputs"})
    }else{
        members.push(newMember)
        res.status(201).send({members})
    }
})

app.put("/id/:id",(req,res)=>{
    const found = members.some(member => member.id == req.params.id)//para saber si existe lo que busco
    if(found){
        members.forEach(member=>{
            if(member.id == req.params.id){
                member.name = req.body.name ? req.body.name : member.name,
                member.email = req.body.email ? req.body.email : member.email
                res.send(member)
            }
        })
    }else{
        //si el miembro que buscamos no existe devovlemos un notfound
        res.status(404).send({msg:`Member with id ${req.params.id} not found`})
    }
})

app.delete("/id/:id",(req,res)=>{
    const found = members.some(member => member.id == req.params.id)//para saber si existe lo que busco
    if(found){
     //eliminar un member
     res.send(members.filter(member => member.id != req.params.id))
    }else{
        //si el miembro que buscamos no existe devovlemos un notfound
        res.status(404).send({msg:`Member with id ${req.params.id} not found`})
    }
})

app.listen(3000, () => console.log("Servidor levantado en el puerto 3000"));
