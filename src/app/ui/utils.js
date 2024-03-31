import defaultEventImg from '@/static/default_event.jpeg';

export const getImageSrc = (event) => {
  return defaultEventImg;
};

export const getFormattedDate = (convertDate) => {
  let date = new Date(convertDate);
  if (date.toString() === 'Invalid Date') return 'N/A';

  let dateString = date.toLocaleDateString('en-FB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return dateString;
};
