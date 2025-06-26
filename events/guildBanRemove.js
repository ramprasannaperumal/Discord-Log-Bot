// events/guildBanRemove.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildBanRemove,

  async execute(ban) {
    const { user, guild } = ban;
    const client = guild.client;

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setTitle("Member Unbanned")
      .setDescription(`**${user.tag}** was unbanned from the server.`)
      .setColor(0x57F287)
      .setFooter({ text: `User ID: ${user.id}` })
      .setTimestamp();

    await sendLog({ client, embed, type: "UNBAN" });
    await sendLog({ client, embed, type: "MOD" });
  },
};
