// events/roleDelete.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildRoleDelete,

  async execute(role) {
    const client = role.guild.client;

    const embed = new EmbedBuilder()
      .setTitle("Role Deleted")
      .setDescription(`Role **${role.name}** was deleted.`)
      .setColor(0xED4245)
      .setFooter({ text: `Role ID: ${role.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "ROLE_DELETE" });
  },
};
