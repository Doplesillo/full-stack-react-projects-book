import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

const app = express()
// Body-parser deprecated since express 4.16
// bodyParser.json & bodyParser.urlencoded() 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/', userRoutes)
app.use('/', authRoutes)


app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error" : err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error" : err.name + ": " + err.message })
        console.log(err)
    }
})
export default app
