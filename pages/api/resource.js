
export default (req, res) => {
  const url = "http://103.90.242.46:84"+req.query.asset;
  console.log("API:Requested URL ",url);
  fetch(url)
    .then(response=>response.blob())
    .then(data => {
      data.arrayBuffer().then((buf) => {
        res.status(200)
          .setHeader(
            'Content-Type', data.type
          )
          .send(Buffer.from(buf))
    });
  })
}
