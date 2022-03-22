// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function (req, res){
  console.log(req.path);
  res?.status(200)?.json({ name: 'TeaCii', req:req })
}