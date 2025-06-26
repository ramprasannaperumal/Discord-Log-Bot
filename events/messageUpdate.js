// events/messageUpdate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.MessageUpdate,

  async execute(oldMessage, newMessage) {
    if (!newMessage.guild || oldMessage.partial || newMessage.partial || newMessage.author?.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const embed = new EmbedBuilder()
      .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL() })
      .setTitle("Message Edited")
      .addFields(
        { name: "User", value: `<@${newMessage.author.id}> (${newMessage.author.id})`, inline: true },
        { name: "Channel", value: `<#${newMessage.channel.id}>`, inline: true },
        { name: "Before", value: oldMessage.content || "[none]" },
        { name: "After", value: newMessage.content || "[none]" }
      )
      .setColor(0x57F287)
      .setTimestamp();

    await sendLog({ client: newMessage.client, embed, type: "MESSAGE" });
  },
};
