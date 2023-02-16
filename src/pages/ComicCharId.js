//page qui fait une requete à "comics/${charId}?apiKey=${apiKey}""`
import axios from "axios";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const ComicCharId = ({ apiKey }) => {
  const [comCharId, setComCharId] = useState();
  const [isLoading, setIsloading] = useState(true);

  const { charId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/comics/${charId}?apiKey=${apiKey}`
        );
        setComCharId(response.data);
        console.log(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [apiKey, charId]);

  return (
    <div className="charPage">
      <div>vous etes sur la page ComicCharId</div>
      {isLoading ? (
        <p>En cours de chargement...</p>
      ) : (
        <div>
          <p>{comCharId.name}</p>
          <p>{comCharId.title}</p>
        </div>
      )}
    </div>
  );
};

export default ComicCharId;
