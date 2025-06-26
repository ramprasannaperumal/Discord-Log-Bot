// events/guildMemberUpdate.js
const { Events, EmbedBuilder, PermissionsBitField } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.GuildMemberUpdate,

  async execute(oldMember, newMember) {
    const client = newMember.client;
    const embeds = [];
    const green = 0x57F287;
    const red = 0xED4245;

    // Nickname change
    if (oldMember.nickname !== newMember.nickname) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
        .setTitle("Nickname Changed")
        .setDescription(`**Old:** ${oldMember.nickname || "None"}\n**New:** ${newMember.nickname || "None"}`)
        .setColor(green)
        .setFooter({ text: `User ID: ${newMember.id}` })
        .setTimestamp();
      embeds.push({ embed, type: "USER_UPDATE" });
    }

    // Timeout added
    if (!oldMember.communicationDisabledUntil && newMember.communicationDisabledUntil) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
        .setTitle("Timeout Applied")
        .setDescription(`User has been timed out until <t:${Math.floor(newMember.communicationDisabledUntil.getTime() / 1000)}:F>`) 
        .setColor(red)
        .setFooter({ text: `User ID: ${newMember.id}` })
        .setTimestamp();
      embeds.push({ embed, type: "TIMEOUT" });
      embeds.push({ embed, type: "MOD" });
    }

    // Timeout removed
    if (oldMember.communicationDisabledUntil && !newMember.communicationDisabledUntil) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
        .setTitle("Timeout Removed")
        .setDescription(`Timeout has been lifted.`)
        .setColor(green)
        .setFooter({ text: `User ID: ${newMember.id}` })
        .setTimestamp();
      embeds.push({ embed, type: "UNTIMEOUT" });
      embeds.push({ embed, type: "MOD" });
    }

    // Role change
    const oldRoles = new Set(oldMember.roles.cache.keys());
    const newRoles = new Set(newMember.roles.cache.keys());
    const addedRoles = [...newRoles].filter(x => !oldRoles.has(x));
    const removedRoles = [...oldRoles].filter(x => !newRoles.has(x));

    if (addedRoles.length || removedRoles.length) {
      const roleMentions = (ids) => ids.map(rid => `<@&${rid}>`).join("\n");
      const embed = new EmbedBuilder()
        .setAuthor({ name: newMember.user.tag, iconURL: newMember.user.displayAvatarURL() })
        .setTitle("Roles Updated")
        .setDescription(`**Added:**\n${roleMentions(addedRoles) || "None"}\n\n**Removed:**\n${roleMentions(removedRoles) || "None"}`)
        .setColor(green)
        .setFooter({ text: `User ID: ${newMember.id}` })
        .setTimestamp();
      embeds.push({ embed, type: "USER_UPDATE" });
    }

    for (const log of embeds) {
      await sendLog({ client, embed: log.embed, type: log.type });
    }
  },
};