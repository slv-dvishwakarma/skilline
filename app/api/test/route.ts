import { NextResponse } from "next/server";

export const GET = () => {
    return NextResponse.json({
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
      })
}