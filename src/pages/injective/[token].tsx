import { useRouter } from "next/router";

export default function Token() {
  const router = useRouter();
  const token = String(router.query.token).toLowerCase();
  console.log(token);
  return <></>;
}
