module.exports = {
  name: 'next',
  description: 'Request the bot to play the next song in the playlist.',
  async execute(message, args) {

    if (!message.member.voiceChannel) {
      return message.reply('You need to join a voice channel first!');
    }

    connection = message.guild.voiceConnection;
    let guild_id = message.guild.id;
    let guild = global.guilds.get(guild_id);

    if (!connection) {
      return message.reply('I am not connected to the channel!');
    }

    if (guild.playlist.length) {
      connection.dispatcher.end();
      message.reply('Next song will be played!');
    } else {
      message.reply('There isn\'t any music to play!');
    }
  }
}
