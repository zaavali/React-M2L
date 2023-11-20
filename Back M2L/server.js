const bcrypt = require('bcrypt');

const express = require ('express')
const app = express()

const users = [];
const mariadb = require('mariadb');
let cors = require('cors')

require('dotenv').config()

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
    connectionLimit: 10, // Adjust the connection limit as needed
    acquireTimeout: 30000, // Increase the timeout value
  });


  app.use(express.json())
app.use(cors())


app.get('/user', async(req, res) =>{
    let conn;
    try {
        
        conn = await pool.getConnection();
       
        const rows= await conn.query('SELECT * FROM user');
       
        res.status(200).json(rows)
    }
   catch(err){
    console.log(err)
   }
})
app.post('/user', async (req,res) => {
    let conn;
     
    bcrypt.hash(req.body.mdp, 10)
        .then(async (hash) => {
            console.log("connexion launch")
            conn = await pool.getConnection();
            console.log('insert request launching')
            console.log(req.body);
            let request = 'INSERT INTO user (nom, email, mdp , admin, id) VALUES (?,?,?,?,?);'
            let rows = await conn.query(request, [req.body.nom, req.body.email, hash , req.body.admin , req.body.id]);
            console.log(rows);
            res.status(200).json(rows.affectedRows)
        }
        ).catch((error) => res.status(500).json(error))

})

app.put('/user/:id', async (req, res) => {
    const { id, nom, email, mdp, admin } = req.body;
    console.log(id, nom, email, mdp, admin);
    const adminValue = isNaN(parseInt(admin)) ? 0 : parseInt(admin);
    let conn;
    try {
        conn = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(mdp, 10);

        const rows = await conn.query("UPDATE user SET nom=?, email=?, mdp=?, admin=? WHERE id=?", [nom, email, hashedPassword, adminValue, Number(id)]);

        res.status(200).json(rows.affectedRows);
    } catch (err) {
        console.log(err);
    } finally {
       
        if (conn) conn.release();
    }
});
 
app.delete('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let conn;
    try {
        conn = await pool.getConnection();

        const result = await conn.query('DELETE FROM user WHERE id=?', [id]);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    } finally {
        if (conn) conn.release();
    }
});

app.get('/produit', async(req, res) =>{
    let conn;
    try {
        
        conn = await pool.getConnection();
       
        const rows= await conn.query('SELECT * FROM produit');
       
        res.status(200).json(rows)
    }
   catch(err){
    console.log(err)
   }
})

app.post('/produit', async (req,res) => {
    let conn;
     
    
            conn = await pool.getConnection();
            console.log('insert request launching')
            console.log(req.body);
            let request = 'INSERT INTO produit (nom, description, prix , quantité, id) VALUES (?,?,?,?,?);'
            let rows = await conn.query(request, [req.body.nom, req.body.description, req.body.prix , req.body.quantité , req.body.id]);
            console.log(rows);
            res.status(200).json(rows.affectedRows)
        })
        



        app.put('/produit/:id', async (req, res) => {
            const { id, nom, description, prix, quantité } = req.body;
            console.log(id, nom, description, prix, quantité);
        
            // Vérifier si le prix est une valeur numérique valide
            const prixAsNumber = parseFloat(prix);
            if (isNaN(prixAsNumber)) {
                return res.status(400).json({ error: 'Le prix doit être un nombre valide.' });
            }
        
            let conn;
            try {
                conn = await pool.getConnection();
        
                const rows = await conn.query("UPDATE produit SET nom=?, description=?, prix=?, quantité=? WHERE id=?", [nom, description, prixAsNumber, quantité, Number(id)]);
        
                res.status(200).json(rows.affectedRows);
            } catch (err) {
                console.log(err);
                res.status(500).json({ error: 'error while updating product.' });
            } finally {
                if (conn) conn.release();
            }
        });
        

app.delete('/produit/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let conn;
    try {
        conn = await pool.getConnection();

        const result = await conn.query('DELETE FROM produit WHERE id=?', [id]);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    } finally {
        if (conn) conn.release();
    }
});


app.listen(4000, () => {
    console.log("server runs ")
})
