import dbConnect from "../../../utils/dbConnect";
import ShootingPerformance from "../../../models/dbShooting";
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
        const shooting = await ShootingPerformance.findOne({ member }).exec();
        console.log(shooting);
        if (!shooting) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: shooting });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        console.log("----put");
        const shooting = await ShootingPerformance.findByIdAndUpdate(
          req.body._id,
          req.body,
          {
            new: true,
            runValmemberators: true,
          }
        );

        if (!shooting) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: shooting });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedShootingPerformance = await ShootingPerformance.deleteOne({
          member: member,
        });
        if (!deletedShootingPerformance) {
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
