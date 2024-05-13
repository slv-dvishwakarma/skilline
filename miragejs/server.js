// mirage.js
import { createServer, Model } from "miragejs";

export function startMirageServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      sidebarItem: Model,
    },

    seeds(server) {
      server.create("sidebarItem", {
        id: 0,
        title: "Installation",
        url: "/installation",
      });
      server.create("sidebarItem", {
        id: 1,
        title: "Add React to an Existing Project",
        url: "/add-react-to-an-existing-project",
      });
      server.create("sidebarItem", {
        id: 2,
        title: "Editor Setup",
        url: "/editor-setup",
      });
      server.create("sidebarItem", {
        id: 3,
        title: "Using TypeScript",
        url: "/using-typeScript",
      });
      server.create("sidebarItem", {
        id: 4,
        title: "React Developer Tools",
        url: "/react-developer-tools",
      });
    },

    routes() {
      this.namespace = "api";

      // Custom response handler for GET /side-bar
      this.get("/side-bar", (schema) => {
        return {
          category: "GET STARTED",
          sub_category: schema.sidebarItems.all().models.map((item) => ({
            title: item.title,
            url: item.url,
          })),
        };
      });

      // Route handlers for POST, PUT, DELETE remain unchanged
      this.post("/side-bar", (schema, request) => {
        let newItem = JSON.parse(request.requestBody);
        schema.sidebarItems.create(newItem);
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
