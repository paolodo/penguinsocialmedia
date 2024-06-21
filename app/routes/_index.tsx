import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import  AppLogo  from "~/components/app-logo";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { getSupabaseWithSessionAndHeaders } from "~/lib/supabase.server";

export let loader = async ({ request }: LoaderFunctionArgs) => {
  const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  if (serverSession) {
    return redirect("/posts", { headers });
  }

  return json({ success: true }, { headers });
};

export default function Index() {
  return (
    <section className="w-full bg-white min-h-screen flex flex-col">
      <nav className="flex items-center space-x-2 p-4">
        <AppLogo className="h-8 w-8 md:h-10 md:w-10" />
        <h1 className="text-xl font-semibold text-zinc-900">Penguin Land</h1>
      </nav>
      <div className="container md:flex justify-center items-center px-4 md:px-6 flex-1">
        <div className="flex flex-col items-center space-y-4 text-center p-4 md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            A{" "}
            <span className="font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-transparent bg-clip-text bg-300% animate-gradient">
             Penguin-themed
            </span>{" "}
            Minimalistic Social Media
          </h1>

          <p className="text-gray-500 mt-2">
            Powered by{" "}
            <span className="text-blue-700 font-bold mt-2">Remix</span> and{" "}
            <span className="text-green-700 font-bold mt-2">Supabase</span>
          </p>

          <Button asChild>
            <Link to="/login">Join our Community</Link>
          </Button>
        </div>
      
      </div>
    </section>
  );
}
