"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Button from "@/components/Button";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={user?.email} disabled />
      </div>
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" type="text" value={fullname || ""} onChange={(e) => setFullname(e.target.value)} />
      </div>
      <div>
      <Label htmlFor="username">Username</Label>
      <Input id="username" type="text" value={username || ""} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
      <Label htmlFor="website">Website</Label>
      <Input id="website" type="url" value={website || ""} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />

      <div>
        <Button type="button" onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}>
            {loading ? "Loading ..." : "Update"}
          </Button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
            <Button variant="light" type="submit">Sign Out</Button>
        </form>
      </div>
    </div>
  );
}
