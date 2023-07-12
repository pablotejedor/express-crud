import prisma from '../db';

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { belongsToId: req.user.id },
    include: {
      updates: true,
    },
  });

  // This works better if you need some information of the object update's owner
  // const updates = products.filter((product) => product.updates.length !== 0);

  const updates = products.reduce((prev, curr) => {
    return [...prev, ...curr.updates];
  }, []);

  res.json({ data: updates });
};
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res
      .status(400)
      .json({ message: `The product you're trying to update doesn't exist` });
  }

  const update = await prisma.update.create({
    data: {
      updatedAt: new Date(),
      title: req.body.title,
      body: req.body.body,
      version: req.body.version,
      asset: req.body.asset,
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { belongsToId: req.user.id },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((prev, curr) => {
    return [...prev, ...curr.updates];
  }, []);

  const updateToModify = updates.find((update) => update.id === req.params.id);

  if (!updateToModify)
    res
      .status(400)
      .json({ message: "The update you're trying to delete doesn't exist" });

  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updated });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { belongsToId: req.user.id },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((prev, curr) => {
    return [...prev, ...curr.updates];
  }, []);

  const updateToDelete = updates.find((update) => update.id === req.params.id);

  if (!updateToDelete)
    res
      .status(400)
      .json({ message: "The update you're trying to delete doesn't exist" });

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
