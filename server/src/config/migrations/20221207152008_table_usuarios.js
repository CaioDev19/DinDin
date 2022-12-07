/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("usuarios", (table) => {
    table.increments("id")
    table.text("nome").notNullable()
    table.text("email").unique().notNullable()
    table.text("senha").notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("usuarios")
}
