import fs from "fs/promises";
import path from "path";

export const getStaticProps = async (context: any) => {
  const { params } = context;
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(jsonData);
  const product = data.products.find((pr: any) => pr.id === params.pid);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product, revalidate: 15 },
  };
};

export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(jsonData);

  return {
    paths: data.products.map((product: any) => {
      return {
        params: { pid: product.id },
      };
    }),
    fallback: true,
  };
};

const ProductDetail = (props: any) => {
  const { product } = props;

  if (!product) {
    return <p>Loading!</p>;
  }

  return (
    <>
      <h1>{product.title}</h1>

      <p>{product.description}</p>
    </>
  );
};

export default ProductDetail;
