import { Request } from "express";

export const tryParsePaginationQuery = (req: Request) => {
  const { page, per_page } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(per_page as string, 10);

  return {
    page: isNaN(parsedPage) ? 1 : parsedPage,
    limit: isNaN(parsedLimit) ? 10 : parsedLimit,
  };
};
