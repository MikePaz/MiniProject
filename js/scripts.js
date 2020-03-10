const searchTerm = document.getElementById("searchTerm");
const showData = document.getElementById("show-data");

const searchData = async searchText => {
  const res = await fetch("https://northwind.now.sh/api/categories");
  const categories = await res.json();

  let matches = categories.filter(data => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return data.description.match(regex) || data.name.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    showData.innerHTML = "";
  }

  outputHtml(matches);
};

const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match =>
          ` <h4 class="display-name-description">  ${match.name} <p class="description">${match.description} </p> </h4>`
      )
      .join("");

    showData.innerHTML = html;
  }
};

searchTerm.addEventListener("input", () => searchData(searchTerm.value));
