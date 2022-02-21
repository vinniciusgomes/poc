import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getImages,
  getImage,
  addImage,
  updateImage,
  deleteImage,
} from "./controllers/images.ts";

const router = new Router();

router
  .get("/api/v1/images", getImages)
  .get("/api/v1/images/:id", getImage)
  .post("/api/v1/images", addImage)
  .put("/api/v1/images/:id", updateImage)
  .delete("/api/v1/image/:id", deleteImage);

export default router;
