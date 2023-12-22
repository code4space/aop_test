/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('jobs', function (table) {
        table.uuid('id').primary();
        table.string('title');
        table.string('description');
        table.enum('type', ['full-time', 'part-time', 'contract']);
        table.string('how_to_apply');
        table.string('company_url');
        table.string('company_logo');
        table.string('location');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('jobs');
};
