export const novelsList = [{
  id: 1,
  title: 'Dracula',
  authorId: 1,
  author: {
    id: 1,
    nameFirst: 'Bram',
    nameLast: 'Stoker',
  },
  genres: [
    {
      id: 6,
      name: 'Fantasy',
      novelsGenres: {
        genreId: 6,
        novelId: 1,
      },
    }],
}]

export const singleNovel = {
  id: 4,
  title: 'War and Peace',
  authorId: 4,
  author: {
    id: 4,
    nameFirst: 'Leo',
    nameLast: 'Tolstoy',
  },
  genres: [
    {
      id: 7,
      name: 'Fiction',
      novelsGenres: {
        genreId: 7,
        novelId: 4,
      },
    },
  ],
}
