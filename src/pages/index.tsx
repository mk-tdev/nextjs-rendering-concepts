import fs from "fs/promises";
import Link from "next/link";
import path from "path";

export const getStaticProps = async (context: any) => {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  if (!data.products) {
    return {
      notFound: true,
    };
  }

  return { props: { products: data.products }, revalidate: 60 };
};

function Home(props: any) {
  const { products } = props;

  return (
    <main>
      <h2>Main content</h2>
      <h3>Test</h3>

      <ul>
        {products.map((product: any) => {
          return (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Home;
