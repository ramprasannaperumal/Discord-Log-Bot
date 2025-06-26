// commands/ticket.js
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Create a support ticket panel"),

  async execute(interaction) {
    const messageText = `**Contact the Staff team**\n\n` +
      `__Staff Tickets__\n` +
      `By opening a ticket, you hereby consent and affirm that you comply with all the **[rules and guidelines](https://discord.com)** set forth.\n` +
      `For serious concerns about user safety, staff misconduct, DM any Administrator and we will respond ASAP.`;

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .addFields(
        {
          name: ":mailbox_with_mail: User Reports",
          value:
            "Report user(s) violating the rules, trolling, spamming, BFA etc. See the server rules here first",
          inline: true,
        },
        {
          name: ":technologist: Developers",
          value:
            "Report a bug or any other technical problem(s) regarding the server!",
          inline: true,
        },
        {
          name: ":grey_question: General & Help",
          value:
            "For questions about the server, economy issues, or anything else. Use this to claim special roles too!",
          inline: true,
        },
        {
          name: ":bell: Partnerships & Others",
          value: "For any partnership deal/inquiry or hosting Giveaways!",
          inline: true,
        },
        {
          name: ":interrobang: Trivia Suggestions",
          value: "Got a good Riddle/Trivia? Suggest to the team!",
          inline: true,
        }
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/1138725784209608715/1249668498671411250/image.png"
      )
      .setFooter({ text: "Make a selection below" });

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("ticket_select")
      .setPlaceholder("Make a selection")
      .addOptions(
        {
          label: "User Reports",
          description: "Reporting a user in the server",
          value: "user_reports",
          emoji: "📬",
        },
        {
          label: "Developers/Technical",
          description: "For reporting bugs and other issues",
          value: "developers",
          emoji: "👨‍💻",
        },
        {
          label: "General Info & Help",
          description: "General Questions or help",
          value: "general_help",
          emoji: "❓",
        },
        {
          label: "Partnerships & Others",
          description: "For Partnerships inquiry or Hosting a Giveaway",
          value: "partnerships",
          emoji: "🔔",
        },
        {
          label: "Trivia/Riddle Suggestions",
          description: "Suggest your Riddle/Trivia",
          value: "trivia",
          emoji: "❗",
        }
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      content: messageText,
      embeds: [embed],
      components: [row],
    });
  },
};
