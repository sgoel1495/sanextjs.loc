module.exports = {
  swcMinify: false,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WEBASSETS: process.env.NEXT_PUBLIC_WEBASSETS,
    API_TOKEN: process.env.API_TOKEN,
    API_SERVER: process.env.API_SERVER
},
  images: {
    domains: ['103.90.242.46', 'source.unsplash.com', 'via.placeholder.com', 'saltattire.com', 'scontent.cdninstagram.com'],
  }
}
