const db = require('../config/config');
const bcript = require('bcryptjs');

const User = {};

User.getAll = async () => {
    const sql = `SELECT * FROM users`;

    return await db.manyOrNone(sql);
}

User.create =  async (user) => {

    const hash = await bcript.hash(user.password, 10);
    const sql = `INSERT INTO users(email, name, lastname, phone, image, password, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
                
    return db.oneOrNone(sql, [
        user.email, 
        user.name,
        user.lastname,
        user.phone,
        user.image,
        hash,
        new Date(),
        new Date()
    ]);
}

module.exports = User;