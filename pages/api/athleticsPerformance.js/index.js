import dbConnect from "../../../utils/dbConnect";
import AthleticsPerformance from "../../../models/dbAthletics";
dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { method } = req;
    console.log('althetics')
    switch (method) {
        case "GET":
            try {
                const athleticsPerformance = await AthleticsPerformance.find({});
                res.status(200).json({ success: true, data: athleticsPerformance });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            req.body._id = null;
            try {
                const athleticsPerformance = await AthleticsPerformance.create(req.body);

                res.status(201).json({ success: true, data: athleticsPerformance });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
