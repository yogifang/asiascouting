import dbConnect from "../../../utils/dbConnect";
import Connects from "../../../models/dbMembers";
dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    query: { email },
    method,
  } = req;

  var params = email.split("&");
  let userEmail = params[0];
  let password = params[1];

  // console.log(userEmail);
  switch (method) {
    case "GET":
      try {
        const member = await Connects.findOne({ email: userEmail }).exec();
        //   console.log(member);
        if (!member) {
          return res.status(400).json({ success: false });
        }

        if (password === 'Google' && member.password === 'Google$Auth') {
          res.status(200).json({ success: true, data: member });
          return;
        }


        if (password === member.password) {
          res.status(200).json({ success: true, data: member });
        } else {

          res.status(404).json({ success: false });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const members = await Connects.findByIdAndUpdate(
          req.body._id,
          req.body,
          {
            new: true,
            runValmemberators: true,
          }
        );

        if (!baseballinfo) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: baseballinfo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedConnects = await Connects.deleteOne({ email: email });
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
