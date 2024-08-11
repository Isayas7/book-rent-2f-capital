import prisma from "../utils/connect.js";
import { z } from "zod";
import defineAbilityFor from "../utils/abilities.js";
import { subject } from "@casl/ability";
import { UserRole } from "@prisma/client";

export const getOwners = async (req, res) => {
    const currentUser = req.user;

    try {

        const ability = defineAbilityFor(currentUser);
        const isAllowed = ability.can('get', "Owners");

        if (!isAllowed) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to get Owners list." });
        }

        const ownersList = await prisma.user.findMany({
            where: {
                role: UserRole.OWNER
            },
        });
        res.status(200).json(ownersList);
    } catch (err) {
        res.status(500).json({ message: "Failed to get users" });
    }
};

export const ownerStatus = async (req, res) => {
    const currentUser = req.user

    const id = parseInt(req.params.id)
    const { status } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const ability = defineAbilityFor(currentUser);
        const isAllowed = ability.can("change", "OwnerStatus")

        if (!isAllowed) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to change owners status." });
        }

        const ownerStatus = await prisma.user.update({
            where: { id },
            data: { status },
        });

        res.status(201).json({ message: `{User is ${status} successfully}` });

    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: "Invalid request data", errors: err.errors });
        }
        res.status(500).json({ message: "Failed to update users" });
    }

}


export const updateUser = async (req, res) => {
    const { isDisabled, ...others } = req.body

    const currentUser = req.user;

    const ability = defineAbilityFor(currentUser);
    const isAllowed = ability.can("approve", "Owners")

    if (!isAllowed) {
        return res.status(403).json({ message: "Forbidden: You do not have permission to approve owners." });
    }

    try {

        const newUser = await prisma.user.update({
            data: {
                isDisabled,
                ...others,
            },
        });

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (err) {
        // Handle validation errors
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: "Invalid request data", errors: err.errors });
        }
        res.status(500).json({ message: "Failed to create user" });
    }
};



export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id)
    const currentUser = req.user;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        const ability = defineAbilityFor(currentUser);
        const isAllowed = ability.can('delete', subject('User', user));

        if (!isAllowed) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to delete this user." });
        }


        await prisma.user.delete({
            where: { id },
        });

        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete user" });
    }
};



export const getUser = async (req, res) => {
    const id = req.params.id;
    const currentUser = req.user;

    try {
        const ability = defineAbilityFor(currentUser);
        const isAllowed = ability.can('get', "OwnUser");

        if (!isAllowed) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to get this user." });
        }

        const user = await prisma.user.findUnique({
            where: { id },
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to get user" });
    }
};

