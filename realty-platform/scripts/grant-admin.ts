import { clerkClient } from "@clerk/nextjs/server";

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npm run admin:grant -- <email>");
    process.exit(1);
  }

  const client = await clerkClient();
  const { data } = await client.users.getUserList({ emailAddress: [email] });

  if (data.length === 0) {
    console.error(`No user found with email: ${email}`);
    process.exit(1);
  }

  const user = data[0];
  await client.users.updateUserMetadata(user.id, { publicMetadata: { role: "ADMIN" } });
  console.log(`Granted ADMIN role to ${email} (userId: ${user.id})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
