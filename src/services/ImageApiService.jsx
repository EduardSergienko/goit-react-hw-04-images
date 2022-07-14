import axios from 'axios';

export async function fechImg(searchQwery, page) {
  const BASIC_URL = 'https://pixabay.com/api/';
  const KEY = '27491202-6941cbc6cc49fba95622056d0';
  return await axios.get(
    `${BASIC_URL}?key=${KEY}&q=${searchQwery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
