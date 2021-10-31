import dbConnect from "../../../utils/dbConnect";
import TennisPerformance from "../../../models/dbTennis";
dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const tennisPerformance = await TennisPerformance.find({});
                res.status(200).json({ success: true, data: tennisPerformance });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            console.log(req.body)
            req.body._id = null;
            try {
                const tennisPerformance = await TennisPerformance.create(req.body);
                res.status(201).json({ success: true, data: tennisPerformance });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};