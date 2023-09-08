import { FlatList,View, } from "react-native"
import React, { useEffect, useState } from 'react'
import PortadaItem from "./PortadaItem";

const Portada = () => {
    const [noticies, setNoticies] = useState(null);
    useEffect(() => {
        fetch('https://cargol.outlius.com/noticies')
            .then(response => response.json())
            .then(data => setNoticies(data));
    }, []);


return (
  <View>
    <FlatList
      style={{ paddingLeft: 15, paddingRight: 15, backgroundColor: '#fff' }}
      data={noticies}
      renderItem={({ item }) => <PortadaItem noticia={item} />}
      keyExtractor={item => item.id}
    />
    {noticies && noticies.map((noticia) => {
      return (
        <PortadaItem noticia={noticia} key={noticia.id} />
      )
    })}
  </View>
);
};
export default Portada;