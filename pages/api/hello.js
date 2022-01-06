// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log(req.path);
  res.status(200).json({ name: 'TeaCii', req:req })
}
