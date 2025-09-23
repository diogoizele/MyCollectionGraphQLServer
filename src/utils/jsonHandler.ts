import fs from "fs";
import path from "path";

export const readJSON = <T>(filePath: string): T => {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    return [] as unknown as T;
  }

  const content = fs.readFileSync(fullPath, "utf-8");

  return JSON.parse(content) as T;
};

export const writeJSON = <T>(filePath: string, data: T): void => {
  const fullPath = path.join(process.cwd(), filePath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf-8");
};
