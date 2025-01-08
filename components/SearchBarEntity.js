import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import GlobalStyles from '../styles/styles';

export default function SearchBarEntity({ entity, EntityName }) { 

    const [searchTerm, setSearchTerm] = useState('');

    const filteredEntity = entity.filter((entity) =>
        entity.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <Searchbar
                placeholder={`Rechercher un ${EntityName}...`}
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={{
                    marginBottom: 10,
                    backgroundColor: GlobalStyles.Colors.backgroundLight,
                }}
            />
        </>
    );
}