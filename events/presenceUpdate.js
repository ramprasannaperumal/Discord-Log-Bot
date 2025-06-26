// events/presenceUpdate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.PresenceUpdate,

  async execute(oldPresence, newPresence) {
    const client = newPresence.client;
    const member = newPresence.member;
    if (!member || member.user.bot) return;

    const oldStatus = oldPresence?.status || "offline";
    const newStatus = newPresence.status;

    if (oldStatus === newStatus) return;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
      .setTitle("User Status Updated")
      .setDescription(`**${member.user.tag}** changed status from \`${oldStatus}\` to \`${newStatus}\``)
      .setColor(newStatus === "online" || newStatus === "idle" ? 0x57F287 : 0xED4245)
      .setFooter({ text: `User ID: ${member.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "STATUS" });
  },
};
