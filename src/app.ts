import express, { json, Application} from "express";
import{ CheckId, CheckName } from "./middlewares"
import logics from "./logics";

const app: Application = express();

app.use(express.json());

app.post("/products", CheckName,logics.createProduct);
app.get("/products", logics.readProduct);
app.get("/products/:id", CheckId, logics.readProductId);
app.patch("/products/:id", CheckId, CheckName, logics.updateProduct);
app.delete("/products/:id", CheckId, logics.deleteProduct);

const PORT: number = 3000;

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
