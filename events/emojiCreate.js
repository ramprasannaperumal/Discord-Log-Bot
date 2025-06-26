// events/emojiCreate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildEmojiCreate,

  async execute(emoji) {
    const client = emoji.client;

    const embed = new EmbedBuilder()
      .setTitle("Emoji Created")
      .setDescription(`Emoji ${emoji.toString()} created with name \`${emoji.name}\`.`)
      .setColor(0x57F287)
      .setFooter({ text: `Emoji ID: ${emoji.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "MESSAGE" });
  },
};
