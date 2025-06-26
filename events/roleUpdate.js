// events/roleUpdate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildRoleUpdate,

  async execute(oldRole, newRole) {
    const client = newRole.guild.client;

    if (oldRole.name === newRole.name && oldRole.permissions.bitfield === newRole.permissions.bitfield) return;

    const embed = new EmbedBuilder()
      .setTitle("Role Updated")
      .setDescription(`Role **${oldRole.name}** has been updated.`)
      .addFields(
        oldRole.name !== newRole.name ? { name: "Name", value: `**Before:** ${oldRole.name}\n**After:** ${newRole.name}`, inline: false } : null,
        oldRole.permissions.bitfield !== newRole.permissions.bitfield ? { name: "Permissions Changed", value: "Permission bits have changed.", inline: false } : null
      ).setColor(0x57F287)
      .setFooter({ text: `Role ID: ${newRole.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "ROLE_UPDATE" });
  },
};