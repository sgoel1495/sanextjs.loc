module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WEBASSETS: process.env.NEXT_PUBLIC_WEBASSETS,
    API_TOKEN: process.env.API_TOKEN,
    API_SERVER: process.env.API_SERVER,
    CCAVENUE_MERCHANTID: process.env.CCAVENUE_MERCHANTID,
    CCAVENUE_TEST_WORKING_KEY: process.env.CCAVENUE_TEST_WORKING_KEY,
    CCAVENUE_TEST_WORKING_KEY: process.env.CCAVENUE_TEST_WORKING_KEY
},
  images: {
    domains: ['103.90.242.46', 'source.unsplash.com', 'via.placeholder.com', 'saltattire.com', 'scontent.cdninstagram.com'],
  }
}
