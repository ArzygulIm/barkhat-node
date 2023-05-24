import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import * as LineController from './controllers/lines.js'
import * as ReportController from './controllers/reports.js'

mongoose.connect('mongodb+srv://admin:barkhat123@cluster0.dc9nwne.mongodb.net/barkhat?retryWrites=true&w=majority')
    .then(() => { console.log('DB ok') })
    .catch((err) => { console.log('DB error', err) });
const app = express();

app.use(cors({
    origin: ["https://barkhat.surge.sh", "https://barkhat-react-app.onrender.com", "http://localhost:3000", "https://barkhat-client.onrender.com"],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/', (req, res) => {
    
    res.json("Server work")
});

app.get('/lines', LineController.getAll)
app.get('/lines/:id', LineController.getLine)
app.post('/lines', LineController.newLine)
app.delete('/lines/:id', LineController.removeLine)
app.patch('/lines/:id', LineController.updateLine)

app.get('/reports', ReportController.getAll)
app.get('/reports/:id', ReportController.getReport)
app.post('/reports', ReportController.newReport)
app.delete('/reports/:id', ReportController.removeReport)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server OK')
})