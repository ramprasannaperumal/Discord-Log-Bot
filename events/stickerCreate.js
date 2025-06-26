// events/stickerCreate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildStickerCreate,

  async execute(sticker) {
    const client = sticker.client;

    const embed = new EmbedBuilder()
      .setTitle("Sticker Created")
      .setDescription(`Sticker **${sticker.name}** was added.`)
      .setColor(0x57F287)
      .setFooter({ text: `Sticker ID: ${sticker.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "MESSAGE" });
  },
};
