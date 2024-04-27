import getDummyFileData from "../utils/getDummydataFromfile";

export const getServerSideProps = async (context: any) => {
  const data = await getDummyFileData();

  const { params, req, res } = context;
  console.log(params);
  return {
    props: {
      userid:
        "user ID: " + params.uid + ` current product ${data.products.length}`,
    },
  };
};

function UserID(props: any) {
  return (
    <div>
      <h2>ID</h2>

      <p> {props.userid}</p>
    </div>
  );
}

export default UserID;
