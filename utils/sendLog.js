// utils/sendLog.js
const { EmbedBuilder } = require("discord.js");

const LOG_TYPES = {
  STATUS: "status",
};

module.exports = async function sendLog({ client, embed, type, channelIdOverride = null }) {
  // 1. Send to specific log channel
  const channelId =
    channelIdOverride ||
    process.env[`${type.toUpperCase()}_LOG_CHANNEL`] ||
    null;

  if (channelId) {
    const channel = await client.channels.fetch(channelId).catch(() => null);
    if (channel && channel.isTextBased()) {
      channel.send({ embeds: [embed] }).catch(console.error);
    }
  }

  // 2. Send to backup channel (all logs)
  const backupChannelId = process.env.BACKUP_LOG_CHANNEL;
  if (backupChannelId && backupChannelId !== channelId) {
    const backupChannel = await client.channels.fetch(backupChannelId).catch(() => null);
    if (backupChannel && backupChannel.isTextBased()) {
      backupChannel.send({ embeds: [embed] }).catch(console.error);
    }
  }

  // 3. DM logic
  const userEnvKey = type === LOG_TYPES.STATUS ? "STATUS_DM_USER_IDS" : "LOG_DM_USER_IDS";
  const dmTargets = process.env[userEnvKey]?.split(",").map(id => id.trim()).filter(Boolean) || [];

  for (const userId of dmTargets) {
    try {
      const user = await client.users.fetch(userId);
      await user.send({ embeds: [embed] });
    } catch (err) {
      console.warn(`Couldn't DM user ${userId}:`, err.message);
    }
  }
};
