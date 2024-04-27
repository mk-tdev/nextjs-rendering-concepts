export const getServerSideProps = async (context: any) => {
  const { params, req, res } = context;

  console.log(req);
  console.log(res);

  return {
    props: {
      username: "mk",
    },
  };
};

function UserProfile(props: any) {
  return (
    <div>
      <h2>Profile</h2>

      <p>Username: {props.username}</p>
    </div>
  );
}

export default UserProfile;
