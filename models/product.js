import { DataTypes } from 'sequelize'
import { sequelize } from './sequelize.js'

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT
  }
}, {
  timestamps: false
})
