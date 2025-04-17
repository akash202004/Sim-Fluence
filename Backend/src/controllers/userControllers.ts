import { prisma } from "../config/prismaClient";
import { Request, Response } from "express";

// create user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, profileImageUrl } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        profileImageUrl,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// get user by id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
       res.status(404).json({ error: "User not found" });
       return;
      }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// get all user
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};
