const { Events, EmbedBuilder, ChannelType } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.VoiceStateUpdate,

  async execute(oldState, newState) {
    const client = newState.client;
    const member = newState.member;
    if (!member || member.user.bot) return;

    const logs = [];
    const colorRed = 0xed4245;
    const colorGreen = 0x57f287;
    const colorOrange = 0xfee75c;

    const baseEmbed = new EmbedBuilder()
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setFooter({ text: `User ID: ${member.id}` })
      .setTimestamp();

    // VC Join
    if (!oldState.channel && newState.channel) {
      logs.push({
        embed: baseEmbed
          .setTitle("📥 Voice Channel Joined")
          .setDescription(
            `<@${member.id}> joined voice channel <#${newState.channel.id}>.\n\n` +
            `**IDs**\n<@${member.id}> (${member.id})\n<#${newState.channel.id}> (${newState.channel.id})`
          )
          .setColor(colorGreen),
        type: "VOICE_JOIN",
      });
    }

    // VC Leave
    if (oldState.channel && !newState.channel) {
      logs.push({
        embed: baseEmbed
          .setTitle("📤 Voice Channel Left")
          .setDescription(
            `<@${member.id}> left voice channel <#${oldState.channel.id}>.\n\n` +
            `**IDs**\n<@${member.id}> (${member.id})\n<#${oldState.channel.id}> (${oldState.channel.id})`
          )
          .setColor(colorRed),
        type: "VOICE_LEAVE",
      });
    }

    // VC Switch
    if (
      oldState.channel &&
      newState.channel &&
      oldState.channel.id !== newState.channel.id
    ) {
      logs.push({
        embed: baseEmbed
          .setTitle("🔁 Voice Channel Moved")
          .setDescription(
            `<@${member.id}> moved from <#${oldState.channel.id}> to <#${newState.channel.id}>.\n\n` +
            `**IDs**\n<@${member.id}> (${member.id})\n<#${oldState.channel.id}> ➜ <#${newState.channel.id}>`
          )
          .setColor(colorGreen),
        type: "VOICE_MOVE",
      });

      // AFK auto-move
      if (
        newState.channelId === newState.guild.afkChannelId &&
        oldState.channelId !== newState.guild.afkChannelId
      ) {
        logs.push({
          embed: baseEmbed
            .setTitle("💤 Moved to AFK Channel")
            .setDescription(`<@${member.id}> was auto-moved to AFK channel.`)
            .setColor(colorOrange),
          type: "VOICE_ACTION",
          overrideChannel: process.env.VOICE_AFK_MOVE_LOG_CHANNEL,
        });
      }
    }

    // Self Mute / Unmute
    if (!oldState.selfMute && newState.selfMute) {
      logs.push({
        embed: baseEmbed.setTitle("🎙️ Self Muted").setDescription(`<@${member.id}> muted themselves.`).setColor(colorGreen),
        type: "VOICE_ACTION",
      });
    }
    if (oldState.selfMute && !newState.selfMute) {
      logs.push({
        embed: baseEmbed.setTitle("🎙️ Self Unmuted").setDescription(`<@${member.id}> unmuted themselves.`).setColor(colorGreen),
        type: "VOICE_ACTION",
      });
    }

    // Self Deafen / Undeafen
    if (!oldState.selfDeaf && newState.selfDeaf) {
      logs.push({
        embed: baseEmbed.setTitle("🎧 Self Deafened").setDescription(`<@${member.id}> deafened themselves.`).setColor(colorGreen),
        type: "VOICE_ACTION",
      });
    }
    if (oldState.selfDeaf && !newState.selfDeaf) {
      logs.push({
        embed: baseEmbed.setTitle("🎧 Self Undeafened").setDescription(`<@${member.id}> undeafened themselves.`).setColor(colorGreen),
        type: "VOICE_ACTION",
      });
    }

    // Server Mute / Unmute
    if (!oldState.serverMute && newState.serverMute) {
      logs.push({
        embed: baseEmbed.setTitle("🔇 Server Muted").setDescription(`<@${member.id}> was server muted.`).setColor(colorRed),
        type: "VOICE_ACTION",
      });
    }
    if (oldState.serverMute && !newState.serverMute) {
      logs.push({
        embed: baseEmbed.setTitle("🔊 Server Unmuted").setDescription(`<@${member.id}> was unmuted.`).setColor(colorGreen),
        type: "VOICE_ACTION",
      });
    }

    // Server Deafen / Undeafen
    if (!oldState.serverDeaf && newState.serverDeaf) {
      logs.push({
        embed: baseEmbed.setTitle("🔕 Server Deafened").setDescription(`<@${member.id}> was server deafened.`).setColor(colorRed),
        type: "VOICE_ACTION",
      });
    }
    if (oldState.serverDeaf && !newState.serverDeaf) {
      logs.push({
        embed: baseEmbed.setTitle("🔔 Server Undeafened").setDescription(`<@${member.id}> was undeafened.`).setColor(colorGreen),
        type: "VOICE_ACTION",
      });
    }

    // 🎥 Camera Toggle
    if (!oldState.selfVideo && newState.selfVideo) {
      logs.push({
        embed: baseEmbed.setTitle("📷 Camera Turned On").setDescription(`<@${member.id}> turned on their camera.`).setColor(colorGreen),
        type: "VOICE_ACTION",
        overrideChannel: process.env.VOICE_CAMERA_LOG_CHANNEL,
      });
    }
    if (oldState.selfVideo && !newState.selfVideo) {
      logs.push({
        embed: baseEmbed.setTitle("📷 Camera Turned Off").setDescription(`<@${member.id}> turned off their camera.`).setColor(colorRed),
        type: "VOICE_ACTION",
        overrideChannel: process.env.VOICE_CAMERA_LOG_CHANNEL,
      });
    }

    // 📺 Stream Toggle
    if (!oldState.streaming && newState.streaming) {
      logs.push({
        embed: baseEmbed.setTitle("📺 Started Streaming").setDescription(`<@${member.id}> started streaming.`).setColor(colorGreen),
        type: "VOICE_ACTION",
        overrideChannel: process.env.VOICE_STREAM_LOG_CHANNEL,
      });
    }
    if (oldState.streaming && !newState.streaming) {
      logs.push({
        embed: baseEmbed.setTitle("📺 Stopped Streaming").setDescription(`<@${member.id}> stopped streaming.`).setColor(colorRed),
        type: "VOICE_ACTION",
        overrideChannel: process.env.VOICE_STREAM_LOG_CHANNEL,
      });
    }

    // 🔒 Stage Request to Speak
    if (
      oldState.channel?.type === ChannelType.GuildStageVoice &&
      newState.channel?.type === ChannelType.GuildStageVoice &&
      !oldState.requestToSpeakTimestamp &&
      newState.requestToSpeakTimestamp
    ) {
      logs.push({
        embed: baseEmbed.setTitle("🙋 Requested to Speak").setDescription(`<@${member.id}> requested to speak.`).setColor(colorOrange),
        type: "VOICE_ACTION",
        overrideChannel: process.env.VOICE_STAGE_LOG_CHANNEL,
      });
    }

    // Send logs
    for (const log of logs) {
      await sendLog({
        client,
        embed: log.embed,
        type: log.type,
        channelIdOverride: log.overrideChannel || null,
      });
    }
  },
};
