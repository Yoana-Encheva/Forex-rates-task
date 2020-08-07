/* globals Sammy */
import home from "./controllers/home.js";

window.addEventListener("load", () => {
  const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");

    this.userData = {
      currencies: [],
    };

    this.get("/", home);
    this.get("index.html", home);
    this.get("#/home", home);
  });

  app.run();
});
