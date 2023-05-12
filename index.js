const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client"); 

const prisma= new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
});

app.post("/", async (req, res) => {
    const newUser = await prisma.user.create({ data: req.body });
    res.json(newUser);
});

app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const deletedUser = req.body.age;
    const updatedUser = await prisma.user.delete({ 
        where: { id: parseInt(id) },
    });
    res.json(deletedUser);
});

app.post("/house", async (req, res) => {
    const newHouse = await prisma.house.create({ data: req.body });
    res.json(newHouse);
});

app.get("/house", async (req, res) => {
    const allHouses = await prisma.house.findMany({
        include: {
            owner: true,
            builtBy: true,
        },
    });
    res.json(allHouses);
});

app.get("/house/:id", async (req, res) => {
    const id = req.params.id;
    const allHouses = await prisma.house.findUnique({
        where: {
            id,
        },
        include: {
            owner: true,
            builtBy: true,
        },
    });
    res.json(allHouses);
});

app.get("/house", async (req, res) => {
    const address = req.body.address;
    const allHouses = await prisma.house.findUnique({
        where: {
            address,
        },
        include: {
            owner: true,
            builtBy: true,
        },
    });
    res.json(allHouses);
});

app.post("/house/many", async (req, res) => {
    const newHouses = await prisma.house.createMany({ data: req.body });
    res.json(newHouses);
});

app.listen(3001, () => console.log(`Server running on port ${3001}`));