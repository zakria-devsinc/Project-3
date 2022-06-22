const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

let UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 40,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
      validate: [isEmail, "Invalid Email"],
    },
    password: {
      type: String,
      required: true,
      min: 8,
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

UserSchema.method.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
};

const Users = mongoose.model("users", UserSchema);

module.exports = Users;
