import React, { useEffect, useState } from "react";
import { apiGet } from "../../../services/services";
import { GET_MY_FAVORITE } from "../../../constant/url";
import Loading from "../../../loading/Loading";

import usePosts from "../../../hooks/usePosts";
import CardPost from "../posts/CardPost";
const Favorite = () => {
  const { toggleFavorite, refresh } = usePosts();
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorite = async () => {
    const { data } = await apiGet(GET_MY_FAVORITE);
    setFavorite(data);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchFavorite();
  }, [refresh]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex justify-center items-center mt-10 text-[3em] text-whit font-serif italic underline">
            <p>The blogs I liked</p>
          </div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {favorite.map((item) => (
              <CardPost
                toggleFavorite={toggleFavorite}
                post={item}
                key={item._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;
