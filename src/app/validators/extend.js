const { extend } = require('indicative/validator')
const { getValue, skippable } = require('indicative-utils')


const User = require('../models/User')


extend('emailUnique', {
  async: true,

  compile(args) {
    return args
  },

  async validate(data, field, args, config) {
    const email = getValue(data, field)
    const userExists = await User.findOne({ email });

    if (userExists)
      return false;
    return true;
  }
})
