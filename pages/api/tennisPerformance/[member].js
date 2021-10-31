import dbConnect from "../../../utils/dbConnect";
import TennisPerformance from "../../../models/dbTennis";
dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    query: { member },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const tennisPerformance = await TennisPerformance.findOne({ member }).exec();
        console.log(tennisPerformance);
        if (!tennisPerformance) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: tennisPerformance });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const tennisPerformance = await TennisPerformance.findByIdAndUpdate(
          req.body._id,
          req.body,
          {
            new: true,
            runValmemberators: true,
          }
        );

        if (!tennisPerformance) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: tennisPerformance });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedSubjects = await TennisPerformance.deleteOne({ member: member });
        if (!deletedSubjects) {
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
