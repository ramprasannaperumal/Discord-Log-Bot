// events/emojiDelete.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildEmojiDelete,

  async execute(emoji) {
    const client = emoji.client;

    const embed = new EmbedBuilder()
      .setTitle("Emoji Deleted")
      .setDescription(`Emoji \`${emoji.name}\` was deleted.`)
      .setColor(0xED4245)
      .setFooter({ text: `Emoji ID: ${emoji.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "MESSAGE" });
  },
};
