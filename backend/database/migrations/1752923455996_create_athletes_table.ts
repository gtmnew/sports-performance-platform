import { BaseSchema } from '@adonisjs/lucid/schema'
import { RiskLevelEnum } from '../../app/enums/risk_level_enum.js'

export default class extends BaseSchema {
  protected tableName = 'athletes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table.string('name').notNullable()
      table.string('position').notNullable()
      table.integer('age').notNullable()
      table.integer('height').notNullable()
      table.integer('weight').notNullable()
      table.string('team').notNullable()
      table.boolean('is_active').notNullable()
      table.enum('risk_level', Object.values(RiskLevelEnum)).notNullable()
      table.string('biomechanics_profile').notNullable()
      table.string('current_injuries').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
