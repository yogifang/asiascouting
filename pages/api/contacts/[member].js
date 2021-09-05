import dbConnect from "../../../utils/dbConnect";
import Connects from "../../../models/dbContacts";
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
        console.log(member);
        const contact = await Connects.findOne({ member }).exec();
        console.log(contact);
        if (!contact) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: contact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const contact = await Connects.findByIdAndUpdate(
          req.body._id,
          req.body,
          {
            new: true,
            runValmemberators: true,
          }
        );

        if (!contact) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: contact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedConnects = await Connects.deleteOne({ member: member });
        if (!deletedConnects) {
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
