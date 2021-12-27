const express = require("express")
const app = express()
const port = 3004
const { tablehewan } = require("./models/index")
const Sequelize = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sequelize = new Sequelize(
    "db_hewan",
    "root",
    "newrootpassword",
    {
      host: "localhost",
      dialect: "mysql",
    }
);
  
function checkConnection() {
    sequelize
      .authenticate()
      .then(() => {
        console.log(
          "Connection has been established successfully"
        );
      })
      .then(() => {
        tablehewan.sync().then(() => {
          console.log("Table Hewan created");
        });
      })
      .catch((err) => {
        console.error("Unable to connect to database: ", err);
      });
  }
  
  checkConnection();

app.post("/",(req,res)=>{
    res.json({message:"hello world"})
})

app.post("/hewan",async(req,res)=>{
    const payload = {
        nama:req.body.nama,
        namaSpesies:req.body.namaSpesies,
        umur: req.body.umur
        }
    const datahewan = await tablehewan.create({
        nama: payload.nama,
        namaSpesies: payload.namaSpesies,
        umur: payload.umur
    })
    if(datahewan){
        res.json({
            message:"Data Hewan Berhasil Ditambahkan"
        })
    }else{
        res.json({
            message:"Data Hewan Gagal Ditambahkan"
        })
    }
    res.json({message:"hello world"})
})

app.get("/get/:id",async(req,res)=>{
    const getID = await tablehewan.findAll({
        where: {
            id: req.params.id
        }
    })
    if(getID){
        res.json({
            message:"Data Hewan Ditemukan",
            getID
        })
    } else{
        res.json({
            message:"Data Hewan Tidak Ditemukan",
            getID
        })
    }
})

app.put("/update/:id",async(req,res)=>{
    const payload = {
        nama:req.body.nama,
        namaSpesies:req.body.namaSpesies,
        umur: req.body.umur
    }
    const updateData = await tablehewan.update({
        nama: payload.nama,
        namaSpesies: payload.namaSpesies,
        umur: payload.umur
        },{
            where: {
                id: req.params.id
            }
        })
        if(updateData){
            res.json({
                message:"Data berhasil diupdate",
                payload
            })
        } else{
            res.json({
                message:"Data gagal diupdate",
                payload
            })
        }
})

app.delete("/delete/:id",async(req,res)=>{
    const deletedata= await tablehewan.destroy({
        where: {
            id: req.params.id
        }
    })
    if(deletedata){
        res.json({
            message:"Data Hewan Berhasil Dihapus"
        })
    } else{
        res.json({
            message:"Data Hewan Gagal Dihapus"
        })
    }
})

app.get("/all",async(req,res)=>{
    const ambil = await tablehewan.findAll()
    if(ambil){
        res.json({
            message:"Data Hewan Berhasil Ditemukan",
            ambil
        })
    } else{
        res.json({
            message:"Data Hewan Gagal Ditemukan",
            ambil
        })
    }
    res.json({message:"hello world"})
})

app.listen(port, () => {
    console.log("server is listening on port", port)
})