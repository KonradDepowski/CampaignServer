import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const router = express.Router();
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

router.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany();
    res.json(campaigns);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});

router.post("/campaign", async (req, res) => {
  try {
    const { name, bidAmount, fund, status, town, radius, productId } = req.body;
    const campaign = await prisma.campaign.create({
      data: { name, bidAmount, fund, status, town, radius, productId },
    });
    res.status(201).json(campaign);
  } catch (err: any) {
    console.error(err);
    res

      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});

router.put("/campaign/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bidAmount, fund, status, town, radius, productId } = req.body;
    const campaign = await prisma.campaign.update({
      where: { id: id },
      data: { name, bidAmount, fund, status, town, radius, productId },
    });
    res.json(campaign);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});

router.delete("/campaign/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.campaign.delete({ where: { id: id } });
    res.status(204).send();
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});

router.post("/product", async (req, res) => {
  try {
    const { name, price, stock, imageUrl } = req.body;
    const product = await prisma.product.create({
      data: { name, price, stock, imageUrl },
    });
    res.status(201).json(product);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});

router.get("/towns", async (req, res) => {
  try {
    const towns = await prisma.town.findMany();
    res.json(towns);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});

router.get("/keywords", async (req, res) => {
  try {
    const keywords = await prisma.keyword.findMany();
    res.json(keywords);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});

router.get("/wallet", async (req, res) => {
  try {
    const wallet = await prisma.wallet.findFirst();
    res.json(wallet);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});

router.put("/wallet", async (req, res) => {
  try {
    const id = "default-wallet";
    const { balance } = req.body;
    const wallet = await prisma.wallet.update({
      where: { id: id },
      data: { balance },
    });
    res.json(wallet);
  } catch (err: any) {
    console.error(err);
    res

      .status(500)
      .json({ error: err?.message, code: err?.code, meta: err?.meta });
  }
});
export default router;
