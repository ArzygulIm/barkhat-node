import LineModel from '../models/line.js'
import ReportModel from '../models/reports.js'

export const newReport = async (req, res) => {
    try {
        const lines = await LineModel.find()
        lines && lines.forEach(async (line) => {
            let report = {}
            let sum = 0
            line.reportPerHour.map(el => {
                sum = sum + el.quantity
            })
            if (sum >= line.quantity) {
                let reasons = []
                if (line.reportPerHour.length > 0) {
                    if (line.deadline !== line.reportPerHour[line.reportPerHour.length - 1].date) {
                        if (Number(line.reportPerHour[line.reportPerHour.length - 1].date.split(".")[2]) > Number(line.deadline.split(".")[2])) {
                            console.log('if year > ')
                            line.reportPerHour.map(el => {
                                if (el.workers / line.workers < 0.7) {
                                    reasons.push(`${el.date} го числа в ${el.hours} часы ${100 - el.workers / line.workers * 100}% работников не было на месте`)
                                }
                                if (el.description) {
                                    reasons.push(`${el.date} го числа в ${el.hours} часы ${el.adminName} оставил комментарий "${el.description}"`)
                                }
                            })
                        } else if (Number(line.reportPerHour[line.reportPerHour.length - 1].date.split(".")[2]) == Number(line.deadline.split(".")[2])) {
                            console.log('if year = ')
                            if (Number(line.reportPerHour[line.reportPerHour.length - 1].date.split(".")[1]) > Number(line.deadline.split(".")[1])) {
                                console.log('if month > ')
                                line.reportPerHour.map(el => {
                                    if (el.workers / line.workers < 0.7) {
                                        reasons.push(`${el.date} го числа в ${el.hours} часы ${100 - el.workers / line.workers * 100}% работников не было на месте`)
                                    }
                                    if (el.description) {
                                        reasons.push(`${el.date} го числа в ${el.hours} часы ${el.adminName} оставил комментарий "${el.description}"`)
                                    }
                                })
                            } else if (Number(line.reportPerHour[line.reportPerHour.length - 1].date.split(".")[1]) == Number(line.deadline.split(".")[1])) {
                                console.log('if month = ')
                                if (Number(line.reportPerHour[line.reportPerHour.length - 1].date.split(".")[0]) > Number(line.deadline.split(".")[0])) {
                                    console.log('if day > ')
                                    line.reportPerHour.map(el => {
                                        if (el.workers / line.workers < 0.7) {
                                            reasons.push(`${el.date} го числа в ${el.hours} часы ${100 - el.workers / line.workers * 100}% работников не было на месте`)
                                        }
                                        if (el.description) {
                                            reasons.push(`${el.date} го числа в ${el.hours} часы ${el.adminName} оставил комментарий "${el.description}"`)
                                        }
                                    })
                                }
                            }
                        }
                    }
                }


                report = {
                    model: line.model,
                    quantity: line.quantity,
                    startDate: line.startDate,
                    deadline: {
                        byPlan: line.deadline,
                        byFact: line.reportPerHour[line.reportPerHour.length - 1].date
                    },
                    reasons,
                }

                const doc = new ReportModel(report);
                const savedReport = await doc.save();
                res.json(savedReport)
                await LineModel.findOneAndRemove({
                    _id: line._id
                })
            }
        })

    } catch (err) {
        res.status(500).send(err)
    }
}

export const getAll = async (req, res) => {
    try {
        const reports = await ReportModel.find()
        res.json(reports)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getReport = async (req, res) => {
    try {
        const reportId = req.params.id;

        LineModel.findOne({ _id: reportId }).then(report => {
            if (!report) {
                res.status(404).json({
                    message: "Отчет не найден"
                })
            } else {
                res.json(report)
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
}
export const removeReport = async (req, res) => {
    try {
        const reportId = req.params.id;

        await LineModel.findOneAndRemove({
            _id: reportId
        })
        res.send({
            success: true,
            message: "Отчет удален"
        })

    } catch (err) {
        res.status(500).send(err)
    }
}