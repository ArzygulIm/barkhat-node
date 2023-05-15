import express from 'express';
import mongoose from 'mongoose';
import * as LineController from './controllers/lines.js'
import * as ReportController from './controllers/reports.js'

mongoose.connect('mongodb+srv://admin:barkhat123@cluster0.dc9nwne.mongodb.net/barkhat?retryWrites=true&w=majority')
    .then(() => { console.log('DB ok') })
    .catch((err) => { console.log('DB error', err) });
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
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