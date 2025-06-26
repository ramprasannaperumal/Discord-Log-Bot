const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Make the bot send an embed")
    .addStringOption(option =>
      option.setName("title")
        .setDescription("Title of the embed (optional)")
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName("description")
        .setDescription("Main content of the embed")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("color")
        .setDescription("Hex color (e.g. #00ff00)")
        .setRequired(false)
    )
    .addAttachmentOption(option =>
      option.setName("attachment")
        .setDescription("Image to attach (optional)")
        .setRequired(false)
    ),

  async execute(interaction) {
    const title = interaction.options.getString("title") || null;
    const description = interaction.options.getString("description");
    const color = interaction.options.getString("color") || "#2b2d31"; // Discord dark default
    const attachment = interaction.options.getAttachment("attachment");

    const embed = new EmbedBuilder()
      .setDescription(description)
      .setColor(color.startsWith("#") ? parseInt(color.slice(1), 16) : 0x2b2d31)
      .setTimestamp();

    if (title) embed.setTitle(title);
    if (attachment?.url) embed.setImage(attachment.url);

    await interaction.reply({ content: "✅ Embed sent!", ephemeral: true });
    await interaction.channel.send({ embeds: [embed] });
  },
};
