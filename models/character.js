const mongoose = require('mongoose')

const Character = mongoose.Schema({
  char_info: {
    name: String,
    description: String
  },
  level: Number,
  xp: Number,
  insanity: Number,
  attributes: {
    physical: {
      strength: Number,
      dexterity: Number,
      constitution: Number,
      aura: Number
    },
    mental: {
      intelligence: Number,
      wisdom: Number,
      rationality: Number,
      perception: Number
    },
    social: {
      appearance: Number,
      charisma: Number,
      presence: Number
    }
  },
  abilities: [
    {
      name: String,
      value: Number,
      attribute: Number
    }
  ],
  forces: [
    {
      name: String,
      value: Number,
      specialization: Number,
      arcane_class: Number
    }
  ],
  languages: [
    {
      name: String,
      value: Number
    }
  ],
  special_abilities: [
    {
      name: String,
      value: Number,
      description: String,
      type: {
        type: String
      },
      force: Number,
      remaining: Number
    }
  ],
  grimoire: [
    {
      name: String,
      value: Number,
      description: String,
      force: String,
      arcane_class: Number,
      mp_cost: Number,
      level: Number,
      xp_base_cost: Number
    }
  ],
  inventory: [
    {
      description: Number,
      quantity: Number,
      type: {
        type: String
      },
      weight: Number,
      price: Number,
      img: String,
      localization: String,
      equipped: {
        type: Boolean,
        enum: [true, false]
      }
    }
  ],
  notes: String,
  money: [
    {
      name_id: Number,
      value: Number
    }
  ],
  date_created: {
    type: Date,
    required: true,
    default: Date.now
  },
  date_updated: {
    type: Date,
    required: true,
    default: Date.now
  },
  alive: {
    type: Boolean,
    enum: [true, false],
    default: true
  }
})

module.exports = mongoose.model('Character', Character)
