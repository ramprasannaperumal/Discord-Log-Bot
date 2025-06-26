// events/stickerUpdate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildStickerUpdate,

  async execute(oldSticker, newSticker) {
    const client = newSticker.client;

    if (oldSticker.name === newSticker.name && oldSticker.description === newSticker.description) return;

    const fields = [];
    if (oldSticker.name !== newSticker.name) {
      fields.push({ name: "Name", value: `**Before:** ${oldSticker.name}\n**After:** ${newSticker.name}` });
    }
    if (oldSticker.description !== newSticker.description) {
      fields.push({ name: "Description", value: `**Before:** ${oldSticker.description || "None"}\n**After:** ${newSticker.description || "None"}` });
    }

    const embed = new EmbedBuilder()
      .setTitle("Sticker Updated")
      .addFields(fields)
      .setColor(0x57F287)
      .setFooter({ text: `Sticker ID: ${newSticker.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "MESSAGE" });
  },
};