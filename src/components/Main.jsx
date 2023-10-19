import { useEffect, useRef, useState } from "react";

export default function Main() {
  const [cards, setCards] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const lastElement = useRef();
  const TOTAL_PAGES = 5;

  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${pageNum * 10}`
      );
      const results = await data.json();
      console.log(results.products);
      setCards([...cards, ...results.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNum]);

  function loadMore() {
    setPageNum((prevNum) => prevNum + 1);
  }

  useEffect(() => {
    let num = 0;
    const currentElement = lastElement.current;

    if (loading) return;

    if (!loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            console.log("visible!");
            loadMore();
            num++;
            if (num >= TOTAL_PAGES) {
              observer.unobserve(currentElement);
              console.log("hey");
              return;
            }
          }
        },
        {
          threshold: 0,
        }
      );
      observer.observe(currentElement);
    }
  }, [loading]);

  return (
    <>
      {!loading ? (
        <>
          {cards.map((card) => (
            <div
              className="p-6 border-2 text-2xl m-5 max-w-5xl mx-auto"
              key={card.id}
            >
              {card.title}
            </div>
          ))}
          <div ref={lastElement}></div>
        </>
      ) : null}
    </>
  );
}
