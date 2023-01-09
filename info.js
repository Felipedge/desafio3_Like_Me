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

const obtenerPost = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log(rows)
    return rows
}

const updateLikes = async (likes, id) => {
    const consulta = "UPDATE posts SET likes = $1 WHERE id = $2"
    const values = [likes, id]
    const { rowCount } = await pool.query(consulta, values)
    if (rowCount === 0) {
        throw { code: 404, message: "No se pudo realizar la acccion" }
    }
}

const incrementLikes = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1"
    const values = [id]
    const { rowCount } = await pool.query(consulta, values)
    if (rowCount === 0) {
        throw { code: 404, message: "No se pudo realizar la accion" }
    }
}


const deletePost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
}


module.exports = { agregarPost, obtenerPost };