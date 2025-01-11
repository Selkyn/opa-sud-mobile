import React from "react";
import { View } from "react-native";
import GlobalStyles from "../styles/styles";
import SearchBarEntity from "../components/SearchBarEntity";
import FilterModalEntity from "../components/FilterModalEntity";
import { Badge } from "react-native-paper";

export default function HeaderEntityList({
  value,
  onChangeText,
  entity,
  entityName,
  title,
  options,
  onSelectionChange,
  filteredEntities,
}) {
    return (
        <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 16,
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <SearchBarEntity
          value={value}
          onChangeText={onChangeText}
          entityName={entityName}
        />
        <View>
          <FilterModalEntity
            title={title}
            options={options}
            onSelectionChange={onSelectionChange}
          />
          <Badge style={{ marginRight: 12, backgroundColor: "#276A99" }}>
            {filteredEntities.length} / {entity.length}
          </Badge>
        </View>
      </View>
    )
}
