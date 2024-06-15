import { Request, Response, Router } from "express";
import { geocodeDebug } from "../utils/geocode";

const router = Router();

router.get("/geocode/:postalCode", async (req: Request, res: Response) => {
  const postalCode = req.params.postalCode;

  try {
    const response = await geocodeDebug(postalCode);
    console.log(response);
    res.json({ postalCode, response: response.data });
  } catch (error) {
    if (error instanceof Error) {
      const { cause, name, message } = error;
      res.status(500).json({
        error: {
          cause,
          name,
          message,
        },
        postalCode,
      });
    } else {
      res.status(500).json({ error: "An unknown error occured" });
    }
  }
});

export default router;
