// events/guildMemberAdd.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildMemberAdd,

  async execute(member) {
    if (member.user.bot) return;
    const client = member.client;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
      .setTitle("Member Joined")
      .setDescription(`**${member.user.tag}** joined the server.`)
      .setColor(0x57F287)
      .setFooter({ text: `User ID: ${member.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "JOIN" });
  },
};
