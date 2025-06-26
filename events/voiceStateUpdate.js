// events/voiceStateUpdate.js
const { Events, EmbedBuilder } = require("discord.js");
const sendLog = require("../utils/sendLog");

module.exports = {
  name: Events.VoiceStateUpdate,

  async execute(oldState, newState) {
    const client = newState.client;
    const member = newState.member;
    if (!member || member.user.bot) return;

    const logs = [];
    const colorRed = 0xED4245;
    const colorGreen = 0x57F287;

    const baseEmbed = new EmbedBuilder()
      .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
      .setFooter({ text: `User ID: ${member.id}` })
      .setTimestamp();

    // Join VC
    if (!oldState.channel && newState.channel) {
      logs.push({
        embed: baseEmbed
          .setTitle("Voice Channel Joined")
          .setDescription(`Joined: **${newState.channel.name}**`)
          .setColor(colorGreen),
        type: "VOICE_JOIN",
      });
    }

    // Leave VC
    if (oldState.channel && !newState.channel) {
      logs.push({
        embed: baseEmbed
          .setTitle("Voice Channel Left")
          .setDescription(`Left: **${oldState.channel.name}**`)
          .setColor(colorRed),
        type: "VOICE_LEAVE",
      });
    }

    // Moved VC
    if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
      logs.push({
        embed: baseEmbed
          .setTitle("Voice Channel Switched")
          .setDescription(`From: **${oldState.channel.name}**\nTo: **${newState.channel.name}**`)
          .setColor(colorGreen),
        type: "VOICE_MOVE",
      });
    }

    // Disconnect (force kicked from vc)
    if (
      oldState.channel &&
      !newState.channel &&
      oldState.channelId &&
      !newState.channelId &&
      oldState.disconnect &&
      !member.voice.channel
    ) {
      logs.push({
        embed: baseEmbed
          .setTitle("Voice Disconnected")
          .setDescription(`Disconnected from: **${oldState.channel.name}**`)
          .setColor(colorRed),
        type: "VOICE_DISCONNECT",
      });
    }

    // Server Mute
    if (!oldState.serverMute && newState.serverMute) {
      logs.push({
        embed: baseEmbed
          .setTitle("Server Muted")
          .setColor(colorRed),
        type: "VOICE_ACTION",
      });
    }

    // Server Deafen
    if (!oldState.serverDeaf && newState.serverDeaf) {
      logs.push({
        embed: baseEmbed
          .setTitle("Server Deafened")
          .setColor(colorRed),
        type: "VOICE_ACTION",
      });
    }

    // Self Mute
    if (!oldState.selfMute && newState.selfMute) {
      logs.push({
        embed: baseEmbed
          .setTitle("User Self Muted")
          .setColor(colorGreen),
        type: "VOICE_ACTION",
      });
    }

    // Self Deafen
    if (!oldState.selfDeaf && newState.selfDeaf) {
      logs.push({
        embed: baseEmbed
          .setTitle("User Self Deafened")
          .setColor(colorGreen),
        type: "VOICE_ACTION",
      });
    }

    for (const log of logs) {
      await sendLog({ client, embed: log.embed, type: log.type });
    }
  },
};