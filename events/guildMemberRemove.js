// events/guildMemberRemove.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildMemberRemove,

  async execute(member) {
    if (member.user?.bot) return;
    const client = member.client;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${member.user?.tag}`, iconURL: member.user?.displayAvatarURL() })
      .setTitle("Member Left")
      .setDescription(`**${member.user?.tag}** left the server.`)
      .setColor(0xED4245)
      .setFooter({ text: `User ID: ${member.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "LEAVE" });
  },
};