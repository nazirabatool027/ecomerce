import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      Price: 120,
      images: [{ url: "/src/assets/women1.webp", altText: "stylish jacket" }],
    },
    {
      _id: "2",
      name: "Stylish Jacket",
      Price: 120,
      images: [{ url: "/src/assets/boy3.webp", altText: "stylish jacket" }],
    },
    {
      _id: "3",
      name: "Stylish Jacket",
      Price: 120,
      images: [{ url: "/src/assets/img2.webp", altText: "stylish jacket" }],
    },
    {
      _id: "4",
      name: "Stylish Jacket",
      Price: 120,
      images: [{ url: "/src/assets/boy5.webp", altText: "stylish jacket" }],
    },
    {
      _id: "5",
      name: "Stylish Jacket ",
      Price: 120,
      images: [{ url: "/src/assets/women3.webp", altText: "stylish jacket" }],
    },
    {
      _id: "6",
      name: "Stylish Jacket",
      Price: 120,
      images: [{ url: "/src/assets/img3.webp", altText: "stylish jacket" }],
    },
    {
      _id: "7",
      name: "Stylish Jacket",
      Price: 120,
      images: [{ url: "/src/assets/women4.webp", altText: "stylish jacket" }],
    },
    {
      _id: "8",
      name: "Stylish Jacket",
      Price: 120,
      images: [{ url: "/src/assets/boy6.webp", altText: "stylish jacket" }],
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollAvailable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollAvailable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe   
        </p>

        {/* scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* scroll content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[400px] object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute w-full bottom-0 left-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.Price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
