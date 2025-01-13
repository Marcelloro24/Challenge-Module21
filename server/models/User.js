const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Schema for the Book subdocument
const bookSchema = new Schema({
  authors: [String],
  description: String,
  bookId: {
    type: String,
    required: true,
  },
  image: String,
  link: String,
  title: {
    type: String,
    required: true,
  },
});

// Schema for the User document
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    savedBooks: [bookSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Custom method to compare and validate password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Virtual property for bookCount
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model('User', userSchema);

module.exports = User; 