const sheetID = "17PLNDjUDEELUijtpYrlZmcZmz_tsPFT4Ue2jgD0BxZk"; 
  
const sheetMap = {
    fun: "fun"
  };


for (const [divID, sheetName] of Object.entries(sheetMap)) {

  const container = document.getElementById(divID);
  if (!container) {
    console.log(`No container found with id: ${divID}`);
    continue;
  }

  const categoryContainers = {};

  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}&tqx=out:json`;

  fetch(url)
    .then(res => res.text())
    .then(data => {

      const json = JSON.parse(data.substring(47).slice(0, -2));
      const rows = json.table.rows;

      rows.forEach(row => {
        const courseClass = row.c[0]?.v || "";
        const video = row.c[1]?.v || "";
        

        if (!courseClass) return;

        if (!categoryContainers[courseClass]) {
          const section = document.createElement("div");
          section.className = "category-block";
          section.dataset.type = courseClass;

          container.appendChild(section);
          categoryContainers[courseClass] = section;
        }

        const block = document.createElement("div");
        block.classList.add("content-block");


        block.innerHTML = `
          <div class="course-card ${courseClass}">
            <br>
            <iframe src="https://www.youtube.com/embed/${video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <br>
            </div>
        `;
        categoryContainers[courseClass].appendChild(block);
        
      });

    })
    .catch(error => {
      console.error(`Error loading data from sheet "${sheetName}":`, error);
    });
}
