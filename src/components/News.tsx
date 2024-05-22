import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getNewsInfo } from "@/api";
import { newsType } from "@/types";

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const news = await getNewsInfo();
        setNewsData(news.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[350px] bg-[rgb(40,46,58)] rounded-md px-2 md:px-6 py-2">
      <h1 className="text-xl text-teal-400 font-bold mb-4">News - Top Headlines</h1>
      <div>
        {newsData.map((news) => (
          <Link key={news.title} href={news.url} passHref>
            <a target="_blank">
              <div className="relative w-full h-[150px] mb-4 group">
                <Image
                  src={news?.urlToImage != null ? news?.urlToImage : '/img/news-football.webp'}
                  alt={news.title}
                  width={350}
                  height={150}
                  className="object-cover rounded-md"
                />
                <div className="absolute bottom-0 left-0 w-full p-2 z-10 bg-gradient-to-t from-zinc-900 to-transparent">
                  <p className="font-semibold text-lg group-hover:text-teal-400">{news.title}</p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;
