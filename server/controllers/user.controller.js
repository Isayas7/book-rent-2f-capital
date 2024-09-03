import { createAbility } from "../casl/createAbility.js";
import { findBy } from "../casl/findUser.js";
import prisma from "../utils/connect.js";
import { z } from "zod";

export const getOwners = async (req, res) => {
    const currentUser = req.user;


    try {
        const user = await findBy({ id: currentUser.id });

        const ability = createAbility(user.permissions);

        const isAllowed = ability.can("View", 'User')


        if (!isAllowed) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to get Owners list." });
        }

        const role = await prisma.role.findUnique({
            where: {
                name: "owner"
            }
        })

        const ownersList = await prisma.user.findMany({
            where: {
                roleId: role.id
            },
            include: {
                _count: {
                    select: { books: true }
                }
            }
        });


        const ownersWithBookCount = ownersList.map(owner => ({
            ...owner,
            upload: owner._count.books
        }));

        res.status(200).json({ data: ownersWithBookCount });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const ownerStatus = async (req, res) => {
    const currentUser = req.user

    const id = parseInt(req.params.id)
    const { status } = req.body

    try {
        const foundUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = await findBy({ id: currentUser.id });

        const ability = createAbility(user.permissions);

        const isAllowed = ability.can("Edit", 'User')


        if (!isAllowed) {
            return res.status(403).json({ message: "You do not have permission to change owners status." });
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

export const deleteOwner = async (req, res) => {
    const id = parseInt(req.params.id);
    const currentUser = req.user;

    const user = await findBy({ id: currentUser.id });

    const ability = createAbility(user.permissions);

    const isAllowed = ability.can("Delete", 'User')


    if (!isAllowed) {
        return res.status(403).json({ message: "You have not permission to Delete this user." });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ message: "Owner not found" });
        }

        // frist delete related books
        await prisma.book.deleteMany({
            where: { ownerId: id },
        });

        await prisma.user.delete({
            where: { id },
        });

        res.status(200).json({ message: "Owner deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete owner" });
    }
};
