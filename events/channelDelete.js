// events/channelDelete.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.ChannelDelete,

  async execute(channel) {
    const client = channel.client;

    const embed = new EmbedBuilder()
      .setTitle("Channel Deleted")
      .setDescription(`Channel **#${channel.name}** (${channel.type}) was deleted.`)
      .setColor(0xED4245)
      .setFooter({ text: `Channel ID: ${channel.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "CHANNEL_DELETE" });
  },
};