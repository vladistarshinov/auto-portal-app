import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin',
        email: 'admin@mail.ru',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: 'Vlad Soders',
        email: 'vlsoders@mail.ru',
        password: bcrypt.hashSync("123456", 10)
    },
    {
        name: 'Irina Pers',
        email: 'irinapers@mail.ru',
        password: bcrypt.hashSync("123456", 10)
    }
]

export default users