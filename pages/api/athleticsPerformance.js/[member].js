import dbConnect from "../../../utils/dbConnect";
import AthleticsPerformance from "../../../models/dbAthletics";
dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {
        query: { member },
        method,
    } = req;

    console.log('althetics------')
    switch (method) {
        case "GET":
            try {
                const athleticsPerformance = await AthleticsPerformance.findOne({
                    member,
                }).exec();
                console.log(athleticsPerformance);
                if (!athleticsPerformance) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: athleticsPerformance });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "PUT":
            try {
                const athleticsPerformance = await AthleticsPerformance.findByIdAndUpdate(
                    req.body._id,
                    req.body,
                    {
                        new: true,
                        runValmemberators: true,
                    }
                );

                if (!athleticsPerformance) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: athleticsPerformance });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "DELETE":
            try {
                const deletedAthleticsPerformance = await AthleticsPerformance.deleteOne({
                    member: member,
                });
                if (!deletedAltheticsPerformance) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
