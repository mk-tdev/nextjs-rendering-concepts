import { DATA_URL } from "@/configs/appConfig";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getStaticProps = async (context: any) => {
  return fetch(`${DATA_URL}sales.json`)
    .then((res) => res.json())
    .then((data: any) => {
      // convert data objects into array
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          ...data[key],
        });
      }

      return { props: { sales: transformedData }, revalidate: 10 };
    })
    .catch(() => {});
};

const LastSales = ({ sales }: any) => {
  const [salesData, setSalesData] = useState<any>(sales);

  const { data, error, isLoading } = useSWR(`${DATA_URL}sales.json`, fetcher);

  useEffect(() => {
    if (data) {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          ...data[key],
        });
      }
      setSalesData(transformedData);
    }
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(
  //     `${DATA_URL}sales.json`
  //   )
  //     .then((res) => res.json())
  //     .then((data: any) => {
  //       // convert data objects into array
  //       const transformedData = [];
  //       for (const key in data) {
  //         transformedData.push({
  //           id: key,
  //           ...data[key],
  //         });
  //       }

  //       setSalesData(transformedData);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // }, []);
  return (
    <div>
      <h2>LastSales</h2>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error fetching data.</p>}

      {!isLoading && salesData ? (
        <ul>
          {salesData.map((sale: any) => (
            <li key={sale.id}>
              {sale.name} - {sale.volume}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>No data yet!</p>
        </>
      )}
    </div>
  );
};

export default LastSales;
