// Script to dynamically populate HTML based on data.json

// Function to fetch and render data
async function renderData() {
  try {
    // Fetch data from data.json
    const response = await fetch("./data.json");
    const data = await response.json();

    // Group items by categories
    const categorizedData = data.reduce((acc, item) => {
      item.categories.forEach((category) => {
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
      });
      return acc;
    }, {});

    // Select the container where data will be rendered
    const container = document.querySelector(".isotope");

    // Iterate through each category and render items
    Object.entries(categorizedData).forEach(([category, items]) => {
      items.forEach((item) => {
        // Create a portfolio item element
        const portfolioItem = document.createElement("div");
        portfolioItem.className = `col-lg-4 col-md-6 portfolio-item isotope-item filter-${category}`;

        portfolioItem.innerHTML = `
                    <div class="portfolio-content h-100">
                        <div class="product-card">
                            <div class="card-head">
                                <h3>${item.name}</h3>
                            </div>
                            <div class="card-body ms-2">
                                <div class="combo-it item">
                                    <div class="img">
                                        <img src="./assets/img/viettel/icons-number.png" alt srcset>
                                    </div>
                                    <span>${item.text1}</span>
                                </div>
                                <div class="combo-it item">
                                    <div class="img">
                                        <img src="./assets/img/viettel/icons-time-roaming.png" alt srcset>
                                    </div>
                                    <span>${item.text2}</span>
                                </div>
                                <div class="combo-it item">
                                    <div class="img">
                                        <img src="./assets/img/viettel/icons-price-roaming.png" alt srcset>
                                    </div>
                                    <span style="font-size: 1.5em; font-weight: bolder;">${
                                      item.price
                                    } đ</span>
                                </div>
                            </div>
                          <div class="card-footer ">
              <a class="button btn-success ms-2" href="sms:290?body=${encodeURIComponent(
                item.name + "_ 0966651627"
              )}">Đăng Ký</a>
            </div>
                        </div>
                    </div>
                `;

        // Append the item to the container
        container.appendChild(portfolioItem);
      });
    });

    // Initialize Isotope and apply default filter
    const iso = new Isotope(".isotope", {
      itemSelector: ".isotope-item",
      layoutMode: "masonry",
      filter: ".filter-app", // Default filter set to .filter-app
    });

    // Handle filter buttons
    document.querySelectorAll(".isotope-filters li").forEach(function (button) {
      button.addEventListener("click", function () {
        const filterValue = this.getAttribute("data-filter");
        iso.arrange({ filter: filterValue });

        // Update active class
        document
          .querySelectorAll(".isotope-filters li")
          .forEach(function (btn) {
            btn.classList.remove("filter-active");
          });
        this.classList.add("filter-active");
      });
    });
  } catch (error) {
    console.error("Error fetching or rendering data:", error);
  }
}

// Initialize renderData function
renderData();
