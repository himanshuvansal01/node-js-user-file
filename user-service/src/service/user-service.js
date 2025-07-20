const { UserModel } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../middleware/redis");

exports.register = async (email, password) => {
  try {
    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email is already registered!");
    }

    // Hash the password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPassword });

    return user;
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.login = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials!");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY, // 1d
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRY, // 2d
    });
    return { token, refreshToken };
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.refreshToken = async (refreshToken) => {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = jwt.sign(
      { userId: payload.id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
    return accessToken;
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.getProfile = async (userId) => {
  try {
    const redisKey = `user-profile-${userId}`;
    
    const cached = await redis.get(redisKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const user = await UserModel.findById(userId).lean();
    if (!user) {
      throw new Error("User not found!");
    }

    await redis.set(redisKey, JSON.stringify(user), 'EX', 3600); // cache for 1 hour

    return user;
  } catch (err) {
    return Promise.reject(err);
  }
};
