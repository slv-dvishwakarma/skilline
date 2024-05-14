// mirage.js
import { createServer, Model } from "miragejs";

const componentGallery = {
  id: 29,
  header: "Installation",
  data: [
    {
      id: 11,
      type: "videoComponent",
      url: "https://www.youtube.com/embed/QFaFIcGhPoM?si=gga8au7zyx5lfrsN",
      description:
        "React has been designed from the start for gradual adoption. You can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to an HTML page, or start a complex React-powered app, this section will help you get started.",
    },
    {
      id: 12,
      type: "bulletBox",
      heading: "In this chapter",
      points: [
        { title: "Installation", url: "/installation" },
        { title: "Installation", url: "/installation" },
        {
          title: "Add React to an Existing Project",
          url: "/add-react-to-an-existing-project",
        },
      ],
    },
    {
      type: "codeBox",
      heading: null,
      code: "npm install react react-dom",
    },
    {
      type: "noteView",
      heading: "Note",
      icon: "notes",
      code: "You need to install Node.js for local development. Although you can try React online or with a simple HTML page, realistically most JavaScript tooling you’ll want to use for development requires Node.js.",
    },
    { type: "noteEditor" },
  ],
};

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
      this.get("/component-gallery/", (schema, request) => {
        return componentGallery;
      });
    },
  });

  return server;
}
