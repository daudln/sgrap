import db from "./db";

const test = async () => {
  const roles = await db.query.role.findMany({
    with: {
      rolesToPermissions: true,
    },
  });
  console.log(roles);
};

test().then(() => {
  console.log("done");
});
