import dbConnect from '../../../utils/dbConnect';
import BaseballInfo from '../../../models/dbBaseballinfos';
dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      console.log('get----------index');
      try {
        const baseballinfo = await BaseballInfo.find({});
        res.status(200).json({ success: true, data: baseballinfo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        console.log('post----------index');
        const baseballinfo = await BaseballInfo.create(req.body);

        res.status(201).json({ success: true, data: baseballinfo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
