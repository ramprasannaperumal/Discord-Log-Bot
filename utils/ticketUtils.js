// utils/ticketUtils.js
const { EmbedBuilder } = require("discord.js");

function buildLogEmbed({
  user,
  ticketType,
  answers
}) {
  return new EmbedBuilder()
    .setTitle(`New Ticket - ${ticketType}`)
    .setColor("Blurple")
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Username", value: user.tag, inline: true },
      { name: "User ID", value: user.id, inline: true },
      { name: "Reported", value: answers.q1 || "-", inline: false },
      { name: "Reason", value: answers.q2 || "-", inline: false },
      { name: "Proof/Evidence", value: answers.q3 || "-", inline: false }
    )
    .setFooter({ text: `Submitted on` })
    .setTimestamp();
}

function buildTicketMessage({ userId, roleMention, answers }) {
  return (
    `<@${userId}> has opened a ticket.\n` +
    `${roleMention}\n\n` +
    `## 1. __Who are you reporting?__\n> ${answers.q1 || "-"}\n\n` +
    `## 2. __Reason for Reporting.__\n> ${answers.q2 || "-"}\n\n` +
    `## 3. __Do you have any Proof/Evidence for this case?__\n> ${answers.q3 || "-"}\n\n` +
    `══════════════ \u22C6★\u22C6 ═══════════════`
  );
}

module.exports = {
  buildLogEmbed,
  buildTicketMessage,
};
