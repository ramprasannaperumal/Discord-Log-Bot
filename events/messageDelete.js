// events/messageDelete.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.MessageDelete,

  async execute(message) {
    if (!message.guild || message.partial || message.author?.bot) return;
    const client = message.client;
    const fetchedLogs = await message.guild.fetchAuditLogs({
      type: "MESSAGE_DELETE",
      limit: 6,
    }).catch(() => null);

    let deletedBy = "Unknown";
    if (fetchedLogs) {
      const auditEntry = fetchedLogs.entries.find(
        (entry) => entry.target?.id === message.author?.id && entry.extra?.channel?.id === message.channel.id
      );
      if (auditEntry) {
        deletedBy = `${auditEntry.executor.tag} (ID: ${auditEntry.executor.id})`;
      }
    }

    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setTitle("Message Deleted")
      .addFields(
        { name: "User", value: `<@${message.author.id}> (${message.author.id})`, inline: true },
        { name: "Channel", value: `<#${message.channel.id}>`, inline: true },
        { name: "Deleted By", value: deletedBy, inline: false },
        { name: "Content", value: message.content || "[Embed/File/Unknown]" }
      )
      .setColor(0xED4245)
      .setTimestamp();

    await sendLog({ client, embed, type: "MESSAGE" });
  },
};