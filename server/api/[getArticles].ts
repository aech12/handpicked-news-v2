const baseUrl = "https://newsapi.org/v2/top-headlines";
const searchUrl = "https://newsapi.org/v2/everything?sortBy=popularity";

export default defineEventHandler(async (event) => {
  //   throw new Error();
  //   return "test error";

  const config = useRuntimeConfig();
  const { page, search, country, category } = useQuery(event);

  let url = baseUrl;

  // search by str/country/category/all
  if (search && search !== "") {
    url = searchUrl;
    url += `?q=${search}`;
  } else if (country && country !== "") {
    url += `?country=${country}`;
  } else if (category && category !== "") {
    url += `?category=${category}`;
  } else {
    url += "?country=us";
  }

  // add api token
  url += `&page=${page}&apiKey=${config.NEWSAPI_KEY}`;
  console.log("URL", url);

  const res = await $fetch(url)
    .then((resp) => {
      return resp.articles;
    })
    .catch((error) => error);

  //   console.log("url", res);

  return res;
});
