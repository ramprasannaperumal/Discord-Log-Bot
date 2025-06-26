// events/channelUpdate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.ChannelUpdate,

  async execute(oldChannel, newChannel) {
    const client = newChannel.client;

    if (oldChannel.name === newChannel.name && oldChannel.topic === newChannel.topic) return;

    const changes = [];
    if (oldChannel.name !== newChannel.name) {
      changes.push(`**Name**\nBefore: \`${oldChannel.name}\`\nAfter: \`${newChannel.name}\``);
    }
    if (oldChannel.topic !== newChannel.topic) {
      changes.push(`**Topic**\nBefore: \`${oldChannel.topic || "None"}\`\nAfter: \`${newChannel.topic || "None"}\``);
    }

    const embed = new EmbedBuilder()
      .setTitle("Channel Updated")
      .setDescription(changes.join("\n\n"))
      .setColor(0x57F287)
      .setFooter({ text: `Channel ID: ${newChannel.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "CHANNEL_UPDATE" });
  },
};