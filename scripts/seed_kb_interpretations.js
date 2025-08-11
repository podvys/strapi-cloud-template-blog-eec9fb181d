module.exports = async ({ strapi }) => {
  const blocks = [
    "purpose",
    "activation",
    "strengths",
    "weaknesses",
    "deficits",
    "timeline",
    "base_energies",
    "blockers",
    "travel",
    "name_energy"
  ];

  for (const block of blocks) {
    const existing = await strapi.db.query("api::interpretation.interpretation").findOne({ where: { block } });
    if (existing) {
      console.log(`ℹ️ Уже есть: ${block}`);
      continue;
    }

    await strapi.db.query("api::interpretation.interpretation").create({
      data: {
        block,
        title: block.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        content: "-",       // заглушка для required поля
        prompt: "",         // впишешь в админке
        publishedAt: new Date()
      }
    });
    console.log(`✅ Создан блок: ${block}`);
  }
};
