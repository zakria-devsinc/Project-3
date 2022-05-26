const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require('validator')

let UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
      validate: [isEmail, "Invalid Email"]
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

// UserSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, this.password);

//   return compare;
// };

UserSchema.method.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
};

const Users = mongoose.model("users", UserSchema);

module.exports = Users;
