import { Request, Response, Router } from "express";
import { geocodeDebug } from "../utils/geocode";

const router = Router();

router.get("/geocode/:postalCode", async (req: Request, res: Response) => {
  const postalCode = req.params.postalCode;

  try {
    const coords = await geocodeDebug(postalCode);
    res.json({ postalCode, coords });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message, postalCode });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
});

export default router;
