import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ButtonLink from "@/components/ButtonLink";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Nav />

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          <div className="flex w-full items-center gap-3 my-6">
            <ButtonLink variant="light" href="/stock/in">
              Stok Masuk
            </ButtonLink>
            <ButtonLink variant="light" href="/stock/out">
              Stok Keluar
            </ButtonLink>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
