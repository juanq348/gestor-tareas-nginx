import dotenv from 'dotenv'
import app from './app.js'
import sequelize from './config/db.js'
dotenv.config()

const PORT = process.env.PORT || 4000

async function main(){
    try {
        await sequelize.authenticate()
        console.log('Base de datos autenticada')
        await sequelize.sync({alter:true})
        console.log('Base de datos sincronizada')
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()