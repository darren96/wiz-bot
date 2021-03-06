const Music = require('../../modules/music.js');

let { searchYoutube } = require('../../modules/youtube.js');

let dispatcher, videoUrl, youtube;

module.exports = {
  name: 'playtop',
  description: 'Request the bot to play a song as the next song in the voice channel.',
  usage: '<song name or youtube video link>\n'
  + '**Examples**:\n'
  + 'IZ*ONE Violeta\n'
  + 'https://www.youtube.com/watch?v=6eEZ7DJMzuk\n',
  async execute(message, args) {

    if (!message.member.voiceChannel) {
      return message.reply('You need to join a voice channel first!');
    }

    if (!args) {
      return message.reply('You need to provide the youtube link or music name that you want to play!');
    }

    const permissions = message.member.voiceChannel.permissionsFor(message.client.user);

		if (!permissions.has('CONNECT')) {
			return message.reply('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.reply('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

    connection = message.guild.voiceConnection;
    let guild_id = message.guild.id;
    let guild = global.guilds.get(guild_id)

    var queryString = args.join(' ');

    if (!connection) {
      connection = await message.member.voiceChannel.join();
      message.reply('I have successfully connected to the channel!');
    }

    dispatcher = message.guild.voiceConnection.dispatcher;

    if (!guild.playlist) {
      guild.playlist = new Array();
    }

    videoUrl = queryString;
    youtube = Music.youtube;

    if (!queryString.match(/^https?:\/\/(www.youtube.com|youtube.com)/)) {
      return searchYoutube(queryString, message, "play");
    }

    if (!dispatcher) {
      return Music.play(videoUrl, message);
    }

    if (dispatcher.paused) {
      dispatcher.resume();
      return message.reply('Music Resumed!');
    }

    Music.queueTop(videoUrl, message);
  }
}
