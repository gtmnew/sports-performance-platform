import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vitalsigns'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('athlete_id')
        .unsigned()
        .references('id')
        .inTable('athletes')
        .onDelete('CASCADE')
      table.integer('heart_rate').notNullable()
      table.decimal('vo2_max', 5, 2).notNullable()
      table.decimal('lactate_level', 4, 2).notNullable()
      table.decimal('hydration_level', 5, 2).notNullable()
      table.integer('fatigue_score').notNullable()
      table.integer('training_load').notNullable()
      table.integer('sleep_quality').notNullable()
      table.integer('perceived_exertion').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
