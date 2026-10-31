import { DataTypes } from 'sequelize'
import { sequelize } from './sequelize.js'

export const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: false
})
