import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

const ProfilePage = async () => {

  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?redirectTo=/profile')
    redirect('/');
  }

  return (
    <>
      <Title title="Profile" />

      <pre>
        { JSON.stringify(session.user, null, 2) }
      </pre>
    </>
  );

};

export default ProfilePage;
