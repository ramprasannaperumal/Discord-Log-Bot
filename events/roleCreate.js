// events/roleCreate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildRoleCreate,

  async execute(role) {
    const client = role.guild.client;

    const embed = new EmbedBuilder()
      .setTitle("Role Created")
      .setDescription(`Role **${role.name}** was created.`)
      .setColor(0x57F287)
      .setFooter({ text: `Role ID: ${role.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "ROLE_CREATE" });
  },
};
