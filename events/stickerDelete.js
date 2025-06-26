// events/stickerDelete.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildStickerDelete,

  async execute(sticker) {
    const client = sticker.client;

    const embed = new EmbedBuilder()
      .setTitle("Sticker Deleted")
      .setDescription(`Sticker **${sticker.name}** was deleted.`)
      .setColor(0xED4245)
      .setFooter({ text: `Sticker ID: ${sticker.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "MESSAGE" });
  },
};
