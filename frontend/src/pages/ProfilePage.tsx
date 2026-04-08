import * as React from "react";
import { supabase } from "../lib/supabase";

type UserProfile = {
  username: string;
  displayName: string;
  bio: string;
  favoriteFoods: string[];
  favoriteLocations: string[];
};

const DEFAULT_PROFILE: UserProfile = {
  username: "",
  displayName: "",
  bio: "",
  favoriteFoods: [],
  favoriteLocations: [],
};

export default function ProfilePage() {
  const [profile, setProfile] = React.useState<UserProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const [foodInput, setFoodInput] = React.useState("");
  const [locationInput, setLocationInput] = React.useState("");

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("No authenticated user found.");

        const { data: existingProfile, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!existingProfile) {
          const newProfileRow = {
            id: user.id,
            username: user.email ?? "",
            display_name: "",
            bio: "",
            favorite_foods: [],
            favorite_locations: [],
          };

          const { data: insertedProfile, error: insertError } = await supabase
            .from("profiles")
            .insert(newProfileRow)
            .select()
            .single();

          if (insertError) throw insertError;

          setProfile({
            username: insertedProfile.username ?? "",
            displayName: insertedProfile.display_name ?? "",
            bio: insertedProfile.bio ?? "",
            favoriteFoods: insertedProfile.favorite_foods ?? [],
            favoriteLocations: insertedProfile.favorite_locations ?? [],
          });
        } else {
          setProfile({
            username: existingProfile.username ?? "",
            displayName: existingProfile.display_name ?? "",
            bio: existingProfile.bio ?? "",
            favoriteFoods: existingProfile.favorite_foods ?? [],
            favoriteLocations: existingProfile.favorite_locations ?? [],
          });
        }
      } catch (err) {
        console.error(err);
        setMessage(
          err instanceof Error ? err.message : "Could not load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateField = <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K]
  ) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addFavoriteFood = () => {
    const value = foodInput.trim();
    if (!value) return;

    const exists = profile.favoriteFoods.some(
      (food) => food.toLowerCase() === value.toLowerCase()
    );
    if (exists) {
      setFoodInput("");
      return;
    }

    updateField("favoriteFoods", [...profile.favoriteFoods, value]);
    setFoodInput("");
  };

  const removeFavoriteFood = (foodToRemove: string) => {
    updateField(
      "favoriteFoods",
      profile.favoriteFoods.filter((food) => food !== foodToRemove)
    );
  };

  const addFavoriteLocation = () => {
    const value = locationInput.trim();
    if (!value) return;

    const exists = profile.favoriteLocations.some(
      (location) => location.toLowerCase() === value.toLowerCase()
    );
    if (exists) {
      setLocationInput("");
      return;
    }

    updateField("favoriteLocations", [...profile.favoriteLocations, value]);
    setLocationInput("");
  };

  const removeFavoriteLocation = (locationToRemove: string) => {
    updateField(
      "favoriteLocations",
      profile.favoriteLocations.filter(
        (location) => location !== locationToRemove
      )
    );
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("No authenticated user found.");

      const payload = {
        id: user.id,
        username: user.email ?? "",
        display_name: profile.displayName,
        bio: profile.bio,
        favorite_foods: profile.favoriteFoods,
        favorite_locations: profile.favoriteLocations,
      };

      const { data, error } = await supabase
        .from("profiles")
        .upsert(payload)
        .select()
        .single();

      if (error) throw error;

      setProfile({
        username: data.username ?? "",
        displayName: data.display_name ?? "",
        bio: data.bio ?? "",
        favoriteFoods: data.favorite_foods ?? [],
        favoriteLocations: data.favorite_locations ?? [],
      });

      setMessage("Profile saved.");
    } catch (err) {
      console.error(err);
      setMessage(
        err instanceof Error ? err.message : "Failed to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-6 py-20">
        <div className="text-muted-foreground">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Your Profile</h2>
        <p className="text-muted-foreground">
          Save your preferences now. Later this page can support reviews,
          restaurant history, and friends.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        <div className="rounded-xl border p-6 bg-background shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold">
              {profile.displayName?.trim()
                ? profile.displayName.trim()[0].toUpperCase()
                : "U"}
            </div>

            <div className="mt-4 text-xl font-semibold">
              {profile.displayName || "Your Name"}
            </div>

            <div className="text-sm text-muted-foreground">
              {profile.username || "email@example.com"}
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              {profile.bio || "Add a short bio about your food preferences."}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="text-sm font-medium">Favorite Foods</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.favoriteFoods.length > 0 ? (
                  profile.favoriteFoods.map((food) => (
                    <span
                      key={food}
                      className="rounded-full border px-3 py-1 text-sm bg-muted/30"
                    >
                      {food}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    None yet
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium">Favorite Locations</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.favoriteLocations.length > 0 ? (
                  profile.favoriteLocations.map((location) => (
                    <span
                      key={location}
                      className="rounded-full border px-3 py-1 text-sm bg-muted/30"
                    >
                      {location}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    None yet
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-6 bg-background shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                value={profile.username}
                readOnly
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-muted text-muted-foreground"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Display Name</label>
              <input
                value={profile.displayName}
                onChange={(e) => updateField("displayName", e.target.value)}
                placeholder="Lemeng Wang"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-background"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                placeholder="I love noodles, sushi, and trying new campus food spots."
                rows={4}
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-background"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">Favorite Foods</div>
            <div className="flex gap-2">
              <input
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
                placeholder="Add a favorite food"
                className="flex-1 rounded-md border px-3 py-2 text-sm bg-background"
              />
              <button
                type="button"
                onClick={addFavoriteFood}
                className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted/50"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.favoriteFoods.map((food) => (
                <span
                  key={food}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-muted/30"
                >
                  {food}
                  <button
                    type="button"
                    onClick={() => removeFavoriteFood(food)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">Favorite Locations</div>
            <div className="flex gap-2">
              <input
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Add a favorite dining location"
                className="flex-1 rounded-md border px-3 py-2 text-sm bg-background"
              />
              <button
                type="button"
                onClick={addFavoriteLocation}
                className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted/50"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.favoriteLocations.map((location) => (
                <span
                  key={location}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-muted/30"
                >
                  {location}
                  <button
                    type="button"
                    onClick={() => removeFavoriteLocation(location)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={saveProfile}
              disabled={saving}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted/50 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

            {message ? (
              <div className="text-sm text-muted-foreground">{message}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}