// events/emojiUpdate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildEmojiUpdate,

  async execute(oldEmoji, newEmoji) {
    const client = newEmoji.client;

    if (oldEmoji.name === newEmoji.name) return;

    const embed = new EmbedBuilder()
      .setTitle("Emoji Updated")
      .setDescription(`Emoji name changed.`)
      .addFields(
        { name: "Before", value: `\`${oldEmoji.name}\``, inline: true },
        { name: "After", value: `\`${newEmoji.name}\``, inline: true }
      )
      .setColor(0x57F287)
      .setFooter({ text: `Emoji ID: ${newEmoji.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "MESSAGE" });
  },
};
