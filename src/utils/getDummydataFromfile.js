import fs from "fs/promises";
import path from "path";

const getDummyFileData = async () => {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
};

export default getDummyFileData;
