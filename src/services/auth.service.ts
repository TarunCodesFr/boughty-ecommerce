import prisma from '../client/prisma';
import bcrypt from 'bcrypt';

export async function createUserInDB(
    email: string,
    username: string,
    password: string
) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            email,
            username,
            passwordHash
        }
    });
}

export async function getUserFromDB(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
        throw new Error('Invalid password');
    }

    return user;
}
