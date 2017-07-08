export const ImageResponse = {
  photos: {
    page: 1,
    pages: 10,
    perpage: 10,
    total: '418201',
    photo: [
      {
        id: '35391581690',
        owner: '112270148@N06',
        secret: '9d82eb260f',
        server: '4129',
        farm: 5,
        title: 'Photo',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
        url_q: 'https://dummy.com/123/123_q.jpg',
        height_q: '150',
        width_q: '150',
        url_o: 'https://dummy.com/123/123_o.jpg',
        height_o: '720',
        width_o: '413',
      },
      {
        id: '35391581690',
        owner: '112270148@N06',
        secret: '9d82eb260f',
        server: '4129',
        farm: 5,
        title: 'Photo',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
        url_q: 'https://dummy.com/456/456_q.jpg',
        height_q: '150',
        width_q: '150',
        url_o: 'https://dummy.com/456/456_o.jpg',
        height_o: '720',
        width_o: '413',
      },
    ],
  },
};

export const Images = [
  {
    src: ImageResponse.photos.photo[0].url_o,
    thumbnail: ImageResponse.photos.photo[0].url_q,
  },
  {
    src: ImageResponse.photos.photo[1].url_o,
    thumbnail: ImageResponse.photos.photo[1].url_q,
  },
];
