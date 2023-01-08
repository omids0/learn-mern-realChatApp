const express = require("express");
const Joi = require("joi");

const app = express();

const products = [
  {
    id: "1",
    name: "Orange",
    price: 20,
  },
  {
    id: "2",
    name: "Apple",
    price: 30,
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello for test...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({
      error: "No Product Found...",
    });
  }

  return res.json(product);
});

app.post("/api/addProduct", (req, res) => {
  const result = validation(req);

  if (result.error) {
    return res.status(400).json({
      Message: result.error.details[0].message,
    });
  } else {
    products.push(requestBody);
    return res.json(requestBody);
  }
});

app.put("/api/editProduct/:id", (req, res) => {
  const result = validation(req);

  if (result.error) {
    return res.status(400).json({
      Message: result.error.details[0].message,
    });
  } else {
    const index = products.findIndex((prod) => prod.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({
        message: "Product is not found with this id",
      });
    } else {
      products[index].name = req.body.name;
      products[index].price = req.body.price;

      return res.json({
        product: products[index],
      });
    }
  }
});

app.patch("/api/products/:id", (req, res) => {
  const index = products.findIndex((prod) => prod.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product is not found with this id",
    });
  }

  let updateProduct = {
    ...products[index],
    ...req.body,
  };

  return res.json(updateProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const product = products.find((prod) => prod.id === req.params.id);

  if (!product === -1) {
    return res.status(404).json({
      message: "Product is not found with this id",
    });
  }

  const index = products.findIndex((prod) => prod.id === req.params.id);
  products.splice(index, 1);
  return res.json(products);
});

app.delete("/api/deleteAllProdcts", (req, res) => {
  products.splice(0);
  return res.json(products);
});

const validation = (req) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    price: Joi.number().required(),
  });

  return schema.validate(req.body);
};

app.listen(4000, () => console.log("Server Is Up! 🚀"));
