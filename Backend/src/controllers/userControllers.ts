import { prisma } from "../config/prismaClient";
import { Request, Response } from "express";

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

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};