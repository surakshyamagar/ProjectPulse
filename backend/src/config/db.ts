// PrismaClient: allows your Node.js backend to communicate with your database
// findmany() etc
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;