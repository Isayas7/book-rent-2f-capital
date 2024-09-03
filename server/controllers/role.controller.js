import prisma from "../utils/connect.js";



export const createRoleWithPermissions = async (req, res) => {
    const { name, permissionIds } = req.body;

    try {
        // Step 1: Create the Role
        const newRole = await prisma.role.create({
            data: {
                name,
            },
        });

        // Step 2: Connect Role with Permissions
        const roleOnPermissionsData = permissionIds.map((permissionId) => ({
            roleId: newRole.id,
            permissionId,
        }));

        await prisma.roleOnPermission.createMany({
            data: roleOnPermissionsData,
        });
        res.status(200).json({ message: 'role created successfully' });


    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating role' });

    }

}
