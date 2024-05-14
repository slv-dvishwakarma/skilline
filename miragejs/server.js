// mirage.js
import { createServer, Model } from "miragejs";

export function startMirageServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      sidebarItem: Model,
    },

    seeds(server) {
      server.db.loadData({
        sidebar: [
          {
            id: 0,
            title: "Installation",
            url: "/installation",
          },
          {
            id: 1,
            title: "Add React to an Existing Project",
            url: "/add-react-to-an-existing-project",
          },
        ],
      });
    },

    routes() {
      this.namespace = "api";

      // Custom response handler for GET /side-bar
      this.get("/side-bar", (schema) => {
        return {
          category: "GET STARTED",
          sub_category: schema.db.sidebar,
        };
      });

      // Route handlers for POST, PUT, DELETE remain unchanged
      this.post("/side-bar", (schema, request) => {
        let newItem = JSON.parse(request.requestBody);
        schema.db.sidebar.remove();
        console.log(schema.db.sidebar);

        newItem?.sub_category.forEach((item) => {
          schema.db.sidebar.insert(item);
        });
        return schema.sidebarItems.all();
      });

      this.put("/side-bar/:id", (schema, request) => {
        let id = request.params.id;
        let updatedItem = JSON.parse(request.requestBody);
        schema.sidebarItems.find(id).update(updatedItem);
        return schema.sidebarItems.all();
      });

      this.delete("/side-bar/:id", (schema, request) => {
        let id = request.params.id;
        schema.sidebarItems.find(id).destroy();
        return schema.sidebarItems.all();
      });
    },
  });

  return server;
}
