import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  html: z.string().min(1),
});

export const generatePdf = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<string> => {
    const { default: puppeteer } = await import("puppeteer");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    try {
      const page = await browser.newPage();
      await page.setContent(data.html, { waitUntil: "domcontentloaded" });
      await page.evaluateHandle("document.fonts.ready");
      const pdf = await page.pdf({
        format: "a4",
        printBackground: true,
        margin: { top: "0", bottom: "0", left: "0", right: "0" },
      });
      return Buffer.from(pdf).toString("base64");
    } finally {
      await browser.close();
    }
  });
