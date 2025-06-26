// events/guildBanAdd.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildBanAdd,

  async execute(ban) {
    const { user, guild } = ban;
    const client = guild.client;

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setTitle("Member Banned")
      .setDescription(`**${user.tag}** was banned from the server.`)
      .setColor(0xED4245)
      .setFooter({ text: `User ID: ${user.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "BAN" });
    await sendLog({ client, embed, type: "MOD" });
  },
};
