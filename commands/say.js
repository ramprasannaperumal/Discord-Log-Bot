const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot say something")
    .addStringOption(option =>
      option.setName("text")
        .setDescription("What should the bot say?")
        .setRequired(true)
    )
    .addAttachmentOption(option =>
      option.setName("attachment")
        .setDescription("Optional image or file")
        .setRequired(false)
    ),

  async execute(interaction) {
    const text = interaction.options.getString("text");
    const attachment = interaction.options.getAttachment("attachment");

    // Delete the command message (if bot has permissions)
    await interaction.reply({ content: "✅ Message sent!", ephemeral: true });

    const messagePayload = {
      content: text,
    };

    if (attachment) {
      messagePayload.files = [attachment.url];
    }

    await interaction.channel.send(messagePayload);
  },
};
