import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/connect.js";
import { loginSchema, registerSchema } from "../utils/validationSchema.js";
import { z } from "zod";


export const register = async (req, res) => {
  try {
    // HASH THE PASSWORD
    const validatedData = registerSchema.parse(req.body);

    const { email, password, location, phoneNumber, roleId } = validatedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log(user)



    if (user) return res.status(400).json({ message: "user already exist!" });

    const hashedPassword = await bcrypt.hash(password, 10);


    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        email,
        roleId,
        location,
        phoneNumber: phoneNumber,
        password: hashedPassword
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid requested data" });
    }
    res.status(500).json({ message: err });
  }
};

export const login = async (req, res) => {
  console.log("login")


  try {

    const validatedData = loginSchema.parse(req.body);

    const { email, password } = validatedData;

    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(400).json({ message: "user does not exist!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "password incrorrect!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const role = await prisma.role.findUnique({ where: { id: user.roleId }, select: { name: true } })

    const { password: userPassword, wallet, roleId, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        maxAge: age,
      })
      .status(200)
      .json({ role: role.name, ...userInfo });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid requested data" });
    }
    res.status(500).json({ message: err });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
