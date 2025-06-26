// events/channelCreate.js
const { Events, EmbedBuilder, ChannelType } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.ChannelCreate,

  async execute(channel) {
    const client = channel.client;

    const embed = new EmbedBuilder()
      .setTitle("Channel Created")
      .setDescription(`Channel **#${channel.name}** (${channel.type}) was created.`)
      .setColor(0x57F287)
      .setFooter({ text: `Channel ID: ${channel.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "CHANNEL_CREATE" });
  },
};
