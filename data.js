// Anime Data
const animeData = [
  {
    title: "Attack On Titan",
    slug: "attack-on-titan",
    genre: ["Action", "Drama", "Fantasy"],
    type: "series",
    cover: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/debf027d032c6d40b91fab16b2ff9bd4.jpg",
    episodes: [
      {
        id: 3301,
        name: "Episode 1",
        sub: "https://drive.google.com/file/d/1MeFHZNXR5NSJkfEmcKlLjZe218nf_XBS/preview",
        dub: "https://drive.google.com/file/d/1k6DDWHYW7hLNZNCQW6bHtV2lftg_EUBC/preview"
      }
    ]
  },
  {
    title: "Death Note",
    slug: "death-note",
    genre: ["Thriller", "Mystery", "Psychological"],
    type: "series",
    cover: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/5e61f3e7c0045e46b670d31a5bb39c68.jpg",
    episodes: [
      {
        id: 1001,
        name: "Episode 1 - Rebirth",
        sub: "https://www.youtube.com/embed/NlJZ-YgAt-c",
        dub: "https://www.youtube.com/embed/NlJZ-YgAt-c"
      },
      {
        id: 1002,
        name: "Episode 2 - Confrontation",
        sub: "https://www.youtube.com/embed/6GMGcwFyK6E",
        dub: "https://www.youtube.com/embed/6GMGcwFyK6E"
      },
      {
        id: 1003,
        name: "Episode 3 - Dealings",
        sub: "https://www.youtube.com/embed/3LwHjM_H7eU",
        dub: "https://www.youtube.com/embed/3LwHjM_H7eU"
      }
    ]
  },
  {
    title: "Your Name",
    slug: "your-name",
    genre: ["Romance", "Drama"],
    type: "movie",
    cover: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/16eec56baf8f3fcc6430607f58ce3d12.jpg",
    episodes: [
      {
        id: 4001,
        name: "Full Movie",
        sub: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        dub: ""
      }
    ]
  }
];

// Featured anime slugs
const featuredAnime = ["attack-on-titan", "death-note", "your-name"];

// Protected pages
const protectedPages = ["watch", "movies", "series", "history"];