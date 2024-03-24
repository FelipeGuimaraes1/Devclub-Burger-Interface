import React from "react";

import Categories from "../../assets/categories.png";

import { Container, CategoriesImg } from "./styles";

function CategoryCarousel() {
  return (
    <Container>
      <CategoriesImg src={Categories} alt="Logo das Categorias" />
    </Container>
  );
}

export default CategoryCarousel;
