import { useEffect, useRef, useState } from "react";

export default function Main() {
  const [cards, setCards] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [isFetched, setIsFetched] = useState(false);
  const lastElement = useRef(null);

  const fetchData = async () => {
    console.log(pageNum);
    try {
      const data = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${pageNum * 10}`
      );
      const results = await data.json();
      console.log(results.products);
      setCards(results.products);
      setIsFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isFetched) {
      console.log(lastElement.current);
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            console.log("visible!");
            setPageNum((pgNum) => pgNum + 1);
          }
        },
        {
          threshold: 0,
        }
      );
      observer.observe(lastElement.current);
    }
  }, [isFetched]);

  return (
    <>
      {isFetched
        ? cards.map((card) => (
            <div
              className="p-6 border-2 text-2xl m-5"
              key={card.id}
              ref={lastElement}
            >
              {card.title}
            </div>
          ))
        : null}
    </>
  );
}
