const MALE_CHARACTERS = [
  "naruto", "goku", "luffy", "ichigo", "levi",
  "zoro", "sasuke", "itachi", "gojo", "killua",
  "edward elric", "spike spiegel", "light yagami", "eren yeager", "todoroki"
];

const FEMALE_CHARACTERS = [
  "mikasa", "hinata", "nami", "robin", "nezuko",
  "rem", "zero two", "asuna", "erza scarlet", "rukia",
  "tohru honda", "violet evergarden", "maki zenin", "yoruichi", "power"
];

export const getAnimeAvatar = async (gender) => {
  const list = gender === "female" ? FEMALE_CHARACTERS : MALE_CHARACTERS;
  const randomName = list[Math.floor(Math.random() * list.length)];

  try {
    const resp = await fetch(
      `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(randomName)}&limit=1`
    );
    const data = await resp.json();
    const image = data?.data?.[0]?.images?.jpg?.image_url;
    return image || null;
  } catch (err) {
    console.error("Error fetching anime avatar:", err);
    return null;
  }
};

// Guarda el avatar en localStorage asociado al id del contacto
export const saveAvatarLocally = (contactId, avatarUrl) => {
  const avatars = JSON.parse(localStorage.getItem("contact_avatars") || "{}");
  avatars[contactId] = avatarUrl;
  localStorage.setItem("contact_avatars", JSON.stringify(avatars));
};

// Recupera el avatar del localStorage
export const getLocalAvatar = (contactId) => {
  const avatars = JSON.parse(localStorage.getItem("contact_avatars") || "{}");
  return avatars[contactId] || null;
};