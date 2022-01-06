
export default (req, res) => {
  const url = "http://103.90.242.46:84"+req.query.asset;

  fetch(url)
    .then(response=>response.blob())
    .then(data => {
      // Then create a local URL for that image and print it
      //const imageObjectURL = URL.createObjectURL(imageBlob);
      /*
      res.writeHead(200, {
        'Content-Type': "image/png",
        'Content-Length': imageBlob.length
      });
      res.blob(imageBlob);
       */

      data.arrayBuffer().then((buf) => {
        res.status(200)
          .setHeader(
            'Content-Type', data.type
          )
          .send(Buffer.from(buf))
    });
  })
}
