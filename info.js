const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle: true
})


const agregarPost = async (titulo, img, descripcion) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)";
    const values = [titulo, img, descripcion];
    const result = await pool.query(consulta, values);

};

const obtenerPost = async () =>{
    const {rows} = await pool.query("SELECT * FROM posts");
    console.log(rows)
    return rows
}

module.exports = { agregarPost, obtenerPost };