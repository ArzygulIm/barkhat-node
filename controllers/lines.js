import LineModel from '../models/line.js'

export const newLine = async (req, res) => {
    try {
        const doc = new LineModel({
            model: req.body.model,
            quantity: req.body.quantity,
            workers: req.body.workers,
            startDate: req.body.startDate,
            deadline: req.body.deadline,
        });

        const line = await doc.save();

        res.json(line)
    } catch (err) {
        res.status(500).json({
            message: "Не удалось создать линию"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const lines = await LineModel.find()
        res.json(lines)
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: "Не удалось получить линию"
        })
    }
}

export const getLine = async (req, res) => {
    try {
        const lineId = req.params.id;
        let days
        LineModel.findOne({ _id: lineId }).then(line => {
            if (!line) {
                res.status(404).json({
                    message: "Линия не найдена"
                })
            } else {
                let sum = 0
                line.reportPerHour.map(el => {
                    sum = sum + el.quantity
                })
                days = (Number(line.deadline.split(".")[2]) - Number(line.startDate.split(".")[2])) * 313 + (Number(line.deadline.split(".")[1]) - Number(line.startDate.split(".")[1])) * 26 + Number(line.deadline.split(".")[0]) - Number(line.startDate.split(".")[0]) + 1
                res.json({ ...line._doc, days, sum })
            }
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: "Не удалось получить линию"
        })
    }
}

export const removeLine = async (req, res) => {
    try {
        const lineId = req.params.id;

        await LineModel.findOneAndRemove({
            _id: lineId
        })
        res.send({
            success: true,
            message: "Линия удалена"
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: "Не удалось удалить линию"
        })
    }
}

export const updateLine = async (req, res) => {
    try {
        const lineId = req.params.id;

        LineModel.findOne({ _id: lineId }).then(line => {
            if (!line) {
                res.status(404).json({
                    message: "Линия не найдена"
                })
            }
            let reportPerHour = line.reportPerHour || []
            if (req.body.reportPerHour) {
                reportPerHour.push(req.body.reportPerHour)
            }

            LineModel.updateOne({
                _id: lineId
            }, {
                model: req.body.model || line.model,
                quantity: req.body.quantity || line.quantity,
                workers: req.body.workers || line.workers,
                startDate: req.body.startDate || line.startDate,
                deadline: req.body.deadline || line.deadline,
                reportPerHour,
            }).then(() => {
                res.send({
                    success: true,
                    message: "Линия изменена",
                    rph: req.body.reportPerHour
                })
            })
        })

    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: "Не удалось изменить линию"
        })
    }
}