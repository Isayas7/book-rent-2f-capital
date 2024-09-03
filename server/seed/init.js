import prisma from "../utils/connect.js";

async function main() {
    // Clear existing data
    await prisma.roleOnPermission.deleteMany();
    await prisma.permission.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    // Define permissions
    const permissions = [
        { action: 'Create', subject: 'User' },
        { action: 'Edit', subject: 'User' },
        { action: 'Delete', subject: 'User' },
        { action: 'View', subject: 'User' },
        { action: 'Create', subject: 'Book' },
        { action: 'Edit', subject: 'Book' },
        { action: 'Delete', subject: 'Book' },
        { action: 'View', subject: 'Book' },
        { action: 'Rent', subject: 'Book' },
        { action: 'Edit', subject: 'Book', conditions: { ownerId: '${user.id}' } },
        { action: 'Delete', subject: 'Book', conditions: { ownerId: '${user.id}' } },
    ];

    // Create permissions
    await prisma.permission.createMany({
        data: permissions,
        skipDuplicates: true,
    });

    // Create roles
    const userAdminRole = await prisma.role.create({ data: { name: 'userAdmin' } });
    const bookAdminRole = await prisma.role.create({ data: { name: 'bookAdmin' } });
    const ownerRole = await prisma.role.create({ data: { name: 'owner' } });
    const customerRole = await prisma.role.create({ data: { name: 'customer' } });


    // Fetch created permissions
    const createdPermissions = await prisma.permission.findMany();

    // Helper function to find permission ID by action and subject
    const findPermissionId = (action, subject, conditions = null) => {
        return createdPermissions.find(p =>
            p.action === action &&
            p.subject === subject &&
            JSON.stringify(p.conditions) === JSON.stringify(conditions)
        )?.id;
    };

    // Link permissions to roles
    await prisma.roleOnPermission.createMany({
        data: [
            // userAdmin role
            { roleId: userAdminRole.id, permissionId: findPermissionId('Create', 'User') },
            { roleId: userAdminRole.id, permissionId: findPermissionId('Edit', 'User') },
            { roleId: userAdminRole.id, permissionId: findPermissionId('Delete', 'User') },
            { roleId: userAdminRole.id, permissionId: findPermissionId('View', 'User') },

            // bookAdmin role
            { roleId: bookAdminRole.id, permissionId: findPermissionId('Create', 'Book') },
            { roleId: bookAdminRole.id, permissionId: findPermissionId('Edit', 'Book') },
            { roleId: bookAdminRole.id, permissionId: findPermissionId('Delete', 'Book') },
            { roleId: bookAdminRole.id, permissionId: findPermissionId('View', 'Book') },

            // owner role
            { roleId: ownerRole.id, permissionId: findPermissionId('Create', 'Book') },
            { roleId: ownerRole.id, permissionId: findPermissionId('View', 'Book') },
            { roleId: ownerRole.id, permissionId: findPermissionId('Edit', 'Book', { ownerId: '${user.id}' }) },
            { roleId: ownerRole.id, permissionId: findPermissionId('Delete', 'Book', { ownerId: '${user.id}' }) },

            // customer role
            { roleId: customerRole.id, permissionId: findPermissionId('View', 'Book') },
            { roleId: customerRole.id, permissionId: findPermissionId('Rent', 'Book',) },
        ],
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
