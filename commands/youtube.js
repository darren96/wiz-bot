let { searchVideo } = require('./../modules/youtube.js');

module.exports = {
  name: 'youtube',
  description: 'Request the bot to search a video in Youtube.',
  async execute(message, args) {

    var queryString = args.join(' ');

    searchVideo(queryString, message, "display");
  }
}
