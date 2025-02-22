"use strict";

let params = null;
let colsEdit = null;

const colEdicHtml = `
<td>
    <div class="btn-group">
        <button id="bEdit" class="btn btn-edit" onclick="rowEdit(this);"><i class="fas fa-edit"></i></button>
        <button id="bElim" class="btn btn-delete" onclick="rowElim(this);"><i class="fas fa-trash"></i></button>
        <button id="bAcep" class="btn btn-accept" onclick="rowAcep(this);"><i class="fas fa-check"></i></button>
        <button id="bCanc" class="btn btn-cancel" onclick="rowCancel(this);"><i class="fas fa-times"></i></button>
    </div>
</td> `;

const fetchPokemonData = async (pokemonName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/}`);
    return response.ok
      ? await response.json()
      : console.warn("Pokemon not found:", pokemonName);
  } catch (error) {
    console.error("Error finding the pokemon:", error);
    return null;
  }
};

const addRowToTable = async (pokemonName) => {
  const pokemonData = await fetchPokemonData(pokemonName);
  if (!pokemonData) {
    alert("Pokemon not found, verify the name and try again.");
    return;
  }

  const tableBody = document.querySelector("#table-list tbody");
  const { sprites, name, types } = pokemonData;

  tableBody.insertAdjacentHTML(
    "beforeend",
    `
        <tr>
            <td><img src="${sprites.front_default}" alt="${name}"></td>
            <td>${name}</td>
            <td>${types.map((t) => t.type.name).join(",")}</td>
            ${colEdicHtml}
        </tr>
    `
  );
};

const initializeTable = () =>
  ["pikachu", "charmander", "bulbasaur", "squirtle"].forEach(addRowToTable);

